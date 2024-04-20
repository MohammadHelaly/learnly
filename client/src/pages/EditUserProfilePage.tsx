import {
	Box,
	Stack,
	Container,
	Tab,
	TextField,
	Typography,
	Avatar,
	IconButton,
	Button,
	Link,
} from "@mui/material";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import api from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import CourseImage from "../components/UI/Courses/Catalog/CourseImage";
import CourseInformationContent from "../components/CourseCatalogPage/CourseInformationContent";
import InstructorCourseEnrollmentPrompt from "../components/CourseInstructorDashboardPage/InstructorCourseEnrollmentPrompt";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import { Route, useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import UpdateCourseContent from "../components/CourseInstructorDashboardPage/UpdateCourseContent";
import UpdateCourseInformation from "../components/CourseInstructorDashboardPage/UpdateCourseInformation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useContext, ChangeEvent } from "react";
import AuthContext from "../store/auth-context";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	name: z
		.string()
		.max(80, { message: "A  name must be 80 characters or less." })
		.min(1, { message: "A  name must be 1 characters or more." }),
	bio: z
		.string()
		.max(30, { message: "Bio must be less than or equal to 30." })
		.min(0, { message: "Bio must be greater than or equal to 0." }),
	photo: z.any(),
});

type UserInformationSchemaType = z.infer<typeof schema>;

interface ImageState {
	preview: File | undefined | string;
	uploaded: string | number | readonly string[] | undefined;
}

const EditUserProfilePage = () => {
	const [value, setValue] = useState("0");
	const authContext = useContext(AuthContext);
	const [image, setImage] = useState<ImageState>({
		preview: authContext.user?.photo?.url,
		uploaded: "",
	});

	const queryClient = useQueryClient();

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
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

	const {
		control,
		handleSubmit,
		watch,
		setValue: setValues,
		reset,
		resetField,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<UserInformationSchemaType>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			name: authContext.user?.name || "",
			bio: authContext.user?.bio || "",
			photo: authContext.user?.photo || undefined,
		},
	});

	const setValueOptions = {
		shouldDirty: true,
		shouldValidate: true,
		shouldTouch: true,
	};

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (data: Partial<UserInformationSchemaType>) => {
			return api.patch(`/users/updateMe`, {
				...data,
			});
		},
		onSuccess: (response) => {
			alert("Course updated successfully.");
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const addName = (value: string) => {
		setValues("name", value, setValueOptions);
	};
	const addBio = (value: string) => {
		setValues("bio", value, setValueOptions);
	};

	const onSubmit = async (data: UserInformationSchemaType) => {
		if (!isDirty) return;

		const body = {
			photo: dirtyFields.photo ? data.photo : undefined,
			name: dirtyFields.name ? data.name : undefined,
			bio: dirtyFields.bio ? data.bio : undefined,
		};

		mutate(body);
	};

	return (
		<NavigationGuard>
			<AnimatedPage>
				<SectionWrapper
					sx={{
						backgroundColor: "#f5f5f5",
						mt: window.innerWidth > 600 ? 8 : 7,
					}}
				>
					<Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
						<SectionHeader
							heading={"Account"}
							headingAlignment="left"
							sx={{
								pb: 1,
								borderBottom: 1,
								borderColor: "divider",
							}}
						/>
						<TabContext value={value}>
							<Box
								sx={{
									borderBottom: 1,
									borderColor: "divider",
								}}
							>
								<TabList
									onChange={handleChange}
									aria-label="Dashboard Tabs"
									centered={window.innerWidth < 600}
								>
									<Tab
										label="Your Profile"
										value="0"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
									<Tab
										label="Account Settings"
										value="1"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
								</TabList>
							</Box>
							<TabPanel value="0" sx={{ p: 0, m: 0 }}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Stack
										alignItems={"center"}
										display={"flex"}
										flexDirection={"column"}
									>
										<Stack
											alignItems={"center"}
											sx={{ paddingTop: "2rem" }}
										>
											<Avatar
												alt={authContext.user?.name}
												/*src={
						typeof image?.preview === "string"
							? image.preview
							: URL.createObjectURL(
									image?.preview
							  )
					}*/
												src={
													authContext.user?.photo?.url
												}
												sx={{
													marginBottom: "0.5rem",
													backgroundColor:
														"primary.main",
													width: 70,
													height: 70,
												}}
											/>
											<Button
												component="label"
												sx={{
													mb: 2,
												}}
											>
												<input
													accept="image/*"
													style={{ display: "none" }}
													multiple={false}
													type="file"
													hidden
													value={image.uploaded}
													onChange={handleImageChange}
												/>
												Edit Picture
											</Button>
										</Stack>
										<Stack
											spacing="1rem"
											display={"flex"}
											flexDirection={"column"}
										>
											<TextField
												defaultValue={
													authContext.user?.name
												}
												color="primary"
											/>
											<TextField
												multiline
												defaultValue={
													authContext.user?.bio
												}
												color="primary"
											/>
											<Button
												type="submit"
												disabled={isPending}
												onClick={() => {}}
											>
												Save Changes
											</Button>
										</Stack>
									</Stack>
								</form>
							</TabPanel>
							<TabPanel value="1" sx={{ p: 0, m: 0 }}>
								<Stack
									alignItems={"center"}
									display={"flex"}
									flexDirection={"column"}
									sx={{ paddingTop: "2rem" }}
								>
									<Typography align="center" variant="h5">
										Change Email
									</Typography>
									<Stack
										spacing="1rem"
										sx={{
											paddingTop: "2rem",
											paddingBottom: "2rem",
										}}
									>
										<TextField
											defaultValue={
												authContext.user?.email
											}
											color="primary"
										/>
										<Button>Confirm</Button>
									</Stack>
									<Typography variant="h5">
										Change Password
									</Typography>
									<Stack
										spacing="1rem"
										sx={{ paddingTop: "2rem" }}
									>
										<TextField
											label="Old Password"
											color="primary"
										/>
										<TextField
											label="New Password"
											color="primary"
										/>
										<Button>Confirm</Button>
									</Stack>
								</Stack>
							</TabPanel>
						</TabContext>
					</Container>
				</SectionWrapper>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default EditUserProfilePage;
