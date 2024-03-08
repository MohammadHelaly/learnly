import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	MenuItem,
	Stack,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	InputLabel,
	Select,
	Checkbox,
	IconButton,
} from "@mui/material";
import { Done, Clear } from "@mui/icons-material";
import { useEffect, useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";
import dummyCoursesData from "../../assets/data/dummyCoursesData";
import CourseCategories from "../UI/Courses/CourseCategories";

import Footer from "../Footer/Footer";
import api from "../../api";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import AddSection from "../InstructorCatalogPage/AddSection";
import InstructorCourseContents from "../InstructorCatalogPage/InstructorCourseContent";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import CourseImage from "../UI/Courses/Catalog/CourseImage";
import CourseInformationContent from "../CourseCatalogPage/CourseInformationContent";
import InstructorCourseEnrollmentPrompt from "../InstructorCatalogPage/InstructorCourseEnrollmentPrompt";
import FormContainer from "../UI/PageLayout/FormContainer";
import resizeImageFile from "../../helpers/resizeImageFile";
import CheckListItem from "../UI/Courses/CheckListItem";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import categories from "../../assets/data/categories";

interface UpdateCourseContentProps {
	courseId: Pick<Course, "id"> | string | number | undefined;
}

const schema = z.object({
	name: z
		.string()
		.max(80, { message: "A course name must be 80 characters or less." })
		.min(3, { message: "A course name must be 3 characters or more." }),
	price: z
		.number()
		.max(1000, { message: "Price must be less than or equal to 1000." })
		.min(0, { message: "Price must be greater than or equal to 0." }),
	paid: z.boolean(),
	skills: z
		.array(
			z.string().max(128, {
				message: "A skill must be 128 characters or less.",
			})
		)
		.min(1, { message: "Select at least 1 skills." })
		.max(12, { message: "Select up to 12 skills." }),
	categories: z
		.array(z.string())
		.min(1, { message: "Select at least one category." })
		.max(12, { message: "Select up to 12 categories." }),
	difficulty: z.string().min(1, { message: "Select a difficulty." }),
	summary: z
		.string()
		.max(128, { message: "A summary must be 128 characters or less." })
		.min(32, { message: "A summary must be 32 characters or more." }),
	description: z
		.string()
		.max(5000, {
			message: "A description must be 5000 characters or less.",
		})
		.min(128, { message: "A description must be 128 characters or more." }),
	prerequisites: z
		.array(
			z.string().max(128, {
				message: "A prerequisite must be 128 characters or less.",
			})
		)
		.max(12, { message: "Select up to 12 prerequisites." }),
	imageCover: z.any(),
});

type CourseFormSchemaType = z.infer<typeof schema>;

interface ImageState {
	preview: File | undefined | null;
	uploaded: string | number | readonly string[] | undefined;
}

const UpdateCourseContent = (props: UpdateCourseContentProps) => {
	const { courseId } = props;

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId as string)
	);

	const {
		data, //: course,
		isLoading, //isError
		isError: isGetError,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});

	const course = data ?? dummyCourse;

	const [prerequisite, setPrerequisite] = useState("");
	const [skill, setSkill] = useState("");
	const [image, setImage] = useState<ImageState>({
		preview: null,
		uploaded: "",
	});

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CourseFormSchemaType>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			name: "",
			price: 0.0,
			paid: false,
			skills: [],
			categories: [],
			difficulty: "Beginner",
			summary: "",
			description: "",
			prerequisites: [],
			imageCover: null,
		},
	});

	const navigate = useNavigate();

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (data: CourseFormSchemaType) => {
			return api.patch(`/courses/${courseId}`, {
				...data,
			});
		},
		onSuccess: (response) => {
			// navigate(`/courses/${response.data.data.data.id}`);
			navigate("/dashboard");
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const renderSelectedCategories = (selected: string[]) => {
		return selected.join(", ");
	};

	const isSelected = (value: string) => {
		return watch().categories?.includes(value);
	};

	const removeCategory = (selectedCategory: string) => {
		const newCategories = watch().categories.filter(
			(category) => category !== selectedCategory
		);
		setValue("categories", newCategories);
	};

	const prerequisiteChangeHandler = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setPrerequisite(event.target.value);
	};

	const addPrequisite = (value: string) => {
		setValue("prerequisites", [...watch().prerequisites, value]);
		setPrerequisite("");
	};

	const removePrerequisite = (selectedPrerequisite: string) => {
		const newPrerequisites = watch().prerequisites.filter(
			(prerequisite) => prerequisite !== selectedPrerequisite
		);
		setValue("prerequisites", newPrerequisites);
	};

	const skillChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setSkill(event.target.value);
	};

	const addSkill = (value: string) => {
		setValue("skills", [...watch().skills, value]);
		setSkill("");
	};

	const removeSkill = (selectedSkill: string) => {
		const newSkills = watch().skills.filter(
			(skill) => skill !== selectedSkill
		);
		setValue("skills", newSkills);
	};

	const paidChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value === "true";
		setValue("paid", value);
		setValue("price", 0);
	};

	const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(watch().price);
		setValue("price", parseFloat(event.target.value));
	};

	const removeImage = () => {
		console.log("removed");
		setImage({
			preview: null,
			uploaded: "",
		});
	};

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event?.target?.files?.[0];
			setImage((previousValue) => ({
				...previousValue,
				preview: file,
			}));
		} catch (err) {
			console.log(err);
		}
	};

	const onSubmit = async (data: CourseFormSchemaType) => {
		let resizedImage;
		if (typeof image.preview !== "string") {
			resizedImage = await resizeImageFile(image.preview as File);
		} else {
			resizedImage = undefined;
		}
		setValue("imageCover", resizedImage);
		const body = {
			name: data.name,
			summary: data.summary,
			description: data.description,
			price: data.price,
			paid: data.paid,
			categories: data.categories,
			skills: data.skills,
			prerequisites: data.prerequisites,
			imageCover: resizedImage,
			difficulty: data.difficulty,
		};

		mutate(body);
	};

	useEffect(() => {
		if (course) {
			setValue("name", course.name);
			setValue("price", course.price);
			setValue("paid", course.paid);
			setValue("skills", course.skills);
			setValue("categories", course.categories);
			setValue("difficulty", course.difficulty);
			setValue("summary", course.summary);
			setValue("description", course.description);
			setValue("prerequisites", course.prerequisites);
			setImage((previousValue) => ({
				...previousValue,
				preview: course.imageCover.url,
			}));
		}
	}, [course, setValue]);

	return (
		<PageWrapper sx={{ mt: 0, pb: 0 }}>
			<SectionWrapper>
				<InstructorCourseContents
					sections={course?.sections}
					isLoading={isLoading}
					isError={isGetError}
				/>
				<AddSection />
			</SectionWrapper>
		</PageWrapper>
	);
};

export default UpdateCourseContent;
