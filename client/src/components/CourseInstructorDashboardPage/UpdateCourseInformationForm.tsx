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
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CourseCategories from "../UI/Courses/CourseCategories";
import api from "../../api";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";
import resizeImageFile from "../../helpers/resizeImageFile";
import CheckListItem from "../UI/Courses/CheckListItem";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import categoriesArray from "../../assets/data/categories";

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
		.min(1, { message: "Select at least one skill." })
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

type CourseInformationSchemaType = z.infer<typeof schema>;

interface UpdateCourseInformationFormProps
	extends Pick<
		Course,
		| "id"
		| "name"
		| "price"
		| "paid"
		| "skills"
		| "categories"
		| "difficulty"
		| "summary"
		| "description"
		| "prerequisites"
		| "imageCover"
	> {}

interface ImageState {
	preview: File | undefined | string;
	uploaded: string | number | readonly string[] | undefined;
}

const UpdateCourseInformationForm = (
	props: UpdateCourseInformationFormProps
) => {
	const { id: courseId, imageCover } = props;

	const queryClient = useQueryClient();

	const [prerequisite, setPrerequisite] = useState("");
	const [skill, setSkill] = useState("");
	const [image, setImage] = useState<ImageState>({
		preview: imageCover?.url,
		uploaded: "",
	});

	// Reference for the file input
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		reset,
		resetField,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<CourseInformationSchemaType>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			...props,
		},
	});

	const setValueOptions = {
		shouldDirty: true,
		shouldValidate: true,
		shouldTouch: true,
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (data: Partial<CourseInformationSchemaType>) => {
			return api.patch(`/courses/${courseId}`, { ...data });
		},
		onSuccess: (response) => {
			alert("Course updated successfully.");
			queryClient.invalidateQueries({
				queryKey: ["courses", { courseId }],
			});
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const renderSelectedCategories = (selected: string[]) =>
		selected.join(", ");

	const isSelected = (value: string) => watch().categories?.includes(value);

	const removeCategory = (selectedCategory: string) => {
		const newCategories = watch().categories.filter(
			(category) => category !== selectedCategory
		);
		setValue("categories", newCategories, setValueOptions);
	};

	const prerequisiteChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
		setPrerequisite(event.target.value);

	const addPrerequisite = (value: string) => {
		setValue(
			"prerequisites",
			[...watch().prerequisites, value],
			setValueOptions
		);
		setPrerequisite("");
	};

	const removePrerequisite = (selectedPrerequisite: string) => {
		const newPrerequisites = watch().prerequisites.filter(
			(prerequisite) => prerequisite !== selectedPrerequisite
		);
		setValue("prerequisites", newPrerequisites, setValueOptions);
	};

	const skillChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
		setSkill(event.target.value);

	const addSkill = (value: string) => {
		setValue("skills", [...watch().skills, value], setValueOptions);
		setSkill("");
	};

	const removeSkill = (selectedSkill: string) => {
		const newSkills = watch().skills.filter(
			(skill) => skill !== selectedSkill
		);
		setValue("skills", newSkills, setValueOptions);
	};

	const paidChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value === "true";
		setValue("paid", value, setValueOptions);
		resetField("price");
	};

	const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setValue("price", parseFloat(event.target.value), setValueOptions);
	};

	const removeImage = () => {
		setImage({ preview: undefined, uploaded: "" });
		if (fileInputRef.current) {
			fileInputRef.current.value = ""; // Reset the file input value to allow for re-selection
		}
	};

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		if (file) {
			setImage({ preview: URL.createObjectURL(file), uploaded: "" });
		}
	};

	useEffect(() => {
		reset({ ...props });
	}, [props]);

	useEffect(() => {
		const resizeImage = async () => {
			if (image.preview && typeof image.preview !== "string") {
				const resizedImage = await resizeImageFile(
					new File([image.preview], "imageCover")
				);
				setValue("imageCover", resizedImage, setValueOptions);
			} else {
				resetField("imageCover");
			}
		};

		resizeImage();
	}, [image.preview]);

	const onSubmit = async (data: CourseInformationSchemaType) => {
		if (!isDirty) return;

		const body = {
			name: dirtyFields.name ? data.name : undefined,
			summary: dirtyFields.summary ? data.summary : undefined,
			description: dirtyFields.description ? data.description : undefined,
			price: dirtyFields.price ? data.price : undefined,
			paid: dirtyFields.paid ? data.paid : undefined,
			categories: dirtyFields.categories ? data.categories : undefined,
			skills: dirtyFields.skills ? data.skills : undefined,
			prerequisites: dirtyFields.prerequisites
				? data.prerequisites
				: undefined,
			imageCover: dirtyFields.imageCover ? data.imageCover : undefined,
			difficulty: dirtyFields.difficulty ? data.difficulty : undefined,
		};

		mutate(body);
	};

	return (
		<PageWrapper sx={{ mt: 0, pb: 0 }}>
			<FormContainer large>
				<form
					style={{
						width: "100%",
					}}
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off"
					noValidate>
					<Stack spacing={12}>
						<SectionWrapper>
							<SectionHeader
								heading="Course Name"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Modify the course name."
								keepHeadingAlignmentOnSmallScreens
								headingAlignment="left"
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.name}>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											type="text"
											name="name"
											label="Course Name"
											helperText={
												errors.name && (
													<Typography
														variant="body2"
														color="error">
														{errors.name.message}
													</Typography>
												)
											}
										/>
									)}
								/>
							</FormControl>
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Course Summary"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Modify the course summary."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.summary}>
								<Controller
									name="summary"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											multiline
											minRows={2}
											name="summary"
											label="Summary"
											helperText={
												errors.summary && (
													<Typography
														variant="body2"
														color="error">
														{errors.summary.message}
													</Typography>
												)
											}
										/>
									)}
								/>
							</FormControl>
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Course Description"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Modify the course description."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.description}>
								<Controller
									name="description"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											multiline
											minRows={4}
											name="description"
											label="Description"
											helperText={
												errors.description && (
													<Typography
														variant="body2"
														color="error">
														{
															errors.description
																.message
														}
													</Typography>
												)
											}
										/>
									)}
								/>
							</FormControl>
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Categories"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Change the course categories."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.categories}>
								<InputLabel id="categories-select-label">
									Categories
								</InputLabel>
								<Controller
									name="categories"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											labelId="categories-select-label"
											id="categories-select"
											multiple
											label="Categories"
											renderValue={
												renderSelectedCategories
											}
											variant="outlined"
											fullWidth>
											{categoriesArray
												.sort()
												.map((category) => (
													<MenuItem
														key={category}
														value={category}>
														<Checkbox
															checked={isSelected(
																category
															)}
														/>
														{category}
													</MenuItem>
												))}
										</Select>
									)}
								/>
							</FormControl>
							{errors.categories && (
								<Typography variant="body2" color="error">
									{errors.categories.message}
								</Typography>
							)}
							{watch().categories?.length > 0 && (
								<CourseCategories
									categories={watch().categories}
									isLoading={false}
									isError={false}
									sx={{
										py: 0,
									}}
									editable
									onEdit={removeCategory}
								/>
							)}
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Difficulty"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Modify the course difficulty."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								component="fieldset"
								error={!!errors.difficulty}>
								<Controller
									name="difficulty"
									control={control}
									render={({ field }) => (
										<RadioGroup
											{...field}
											row={window.innerWidth > 600}
											aria-label="Difficulty"
											name="difficulty"
											defaultValue="Beginner">
											<FormControlLabel
												value="Beginner"
												control={<Radio />}
												label="Beginner"
											/>
											<FormControlLabel
												value="Intermediate"
												control={<Radio />}
												label="Intermediate"
											/>
											<FormControlLabel
												value="Advanced"
												control={<Radio />}
												label="Advanced"
											/>
										</RadioGroup>
									)}
								/>
							</FormControl>
							{errors.difficulty && (
								<Typography variant="body2" color="error">
									{errors.difficulty.message}
								</Typography>
							)}
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Prerequisites"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Alter the course prerequisites."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.prerequisites}>
								<TextField
									name="prerequisite"
									value={prerequisite}
									onChange={prerequisiteChangeHandler}
									// fullWidth
									type="text"
									label="Prerequisites"
								/>
								<Button
									size="large"
									disableElevation
									variant="contained"
									type="button"
									disabled={
										watch().prerequisites?.length >= 12 ||
										prerequisite?.length === 0 ||
										isPending
									}
									onClick={() =>
										addPrerequisite(prerequisite)
									}
									sx={{
										my: 2,
									}}>
									Add Prerequisite
								</Button>
							</FormControl>
							{errors.prerequisites && (
								<Typography variant="body2" color="error">
									{errors.prerequisites.message}
								</Typography>
							)}
							{watch().prerequisites?.length > 0 && (
								<Grid
									container
									direction="row"
									rowSpacing="20px"
									alignItems="left"
									justifyContent="left">
									{watch().prerequisites.map(
										(prerequisite, index) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={index + "prerequisite"}>
												<CheckListItem
													item={prerequisite}
													editable
													onEdit={() =>
														removePrerequisite(
															prerequisite
														)
													}
												/>
											</Grid>
										)
									)}
								</Grid>
							)}
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Skills"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Alter the skills that students will learn from your course."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.skills}>
								<TextField
									name="skill"
									value={skill}
									onChange={skillChangeHandler}
									fullWidth
									type="text"
									label="Skills"
								/>
								<Button
									size="large"
									disableElevation
									variant="contained"
									type="button"
									disabled={
										watch().skills?.length >= 12 ||
										skill?.length === 0 ||
										isPending
									}
									onClick={() => addSkill(skill)}
									sx={{
										my: 2,
									}}>
									Add Skill
								</Button>
							</FormControl>
							{errors.skills && (
								<Typography variant="body2" color="error">
									{errors.skills.message}
								</Typography>
							)}
							{watch().skills?.length > 0 && (
								<Grid
									container
									direction="row"
									rowSpacing="20px"
									alignItems="left"
									justifyContent="left">
									{watch().skills.map((skill, index) => (
										<Grid
											item
											xs={12}
											sm={6}
											key={index + "skill"}>
											<CheckListItem
												item={skill}
												editable
												onEdit={() =>
													removeSkill(skill)
												}
											/>
										</Grid>
									))}
								</Grid>
							)}
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Pricing"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading=" Alter the course pricing."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								component="fieldset"
								error={!!errors.paid}>
								<Controller
									name="paid"
									control={control}
									render={({ field }) => (
										<RadioGroup
											{...field}
											row={window.innerWidth > 600}
											aria-label="Pricing"
											name="paid"
											defaultValue="true"
											onChange={paidChangeHandler}
											sx={{
												mb: 2,
											}}>
											<FormControlLabel
												value="true"
												control={<Radio />}
												label="Paid"
											/>
											<FormControlLabel
												value="false"
												control={<Radio />}
												label="Free"
											/>
										</RadioGroup>
									)}
								/>
							</FormControl>
							{errors.paid && (
								<Typography variant="body2" color="error">
									{errors.paid.message}
								</Typography>
							)}
							{watch().paid == true && (
								<>
									<FormControl fullWidth>
										<Controller
											name="price"
											control={control}
											render={({ field }) => (
												<TextField
													{...field}
													fullWidth
													type="number"
													name="price"
													label="Price"
													onChange={
														priceChangeHandler
													}
												/>
											)}
										/>
									</FormControl>
									{errors.price && (
										<Typography
											variant="body2"
											color="error">
											{errors.price.message}
										</Typography>
									)}
								</>
							)}
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Course Image"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Change the course image."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<FormControl
								required
								fullWidth
								error={!!errors.imageCover}>
								<Button
									component="label"
									fullWidth
									variant="contained"
									disableElevation
									size="large"
									disabled={isPending}
									sx={{ mb: 2 }}>
									{image.preview
										? "Change Image"
										: "Upload Image"}
									<input
										ref={fileInputRef}
										accept="image/*"
										style={{ display: "none" }}
										multiple={false}
										type="file"
										onChange={handleImageChange}
									/>
								</Button>
							</FormControl>
							{errors.imageCover && (
								<Typography variant="body2" color="error">
									"Please upload a valid image for your
									course."
								</Typography>
							)}
							{image.preview && (
								<Box
									sx={{
										width: "100%",
										borderRadius: 12,
										position: "relative",
									}}>
									<IconButton
										onClick={removeImage}
										sx={{
											position: "absolute",
											top: 0,
											left: 0,
											m: 1,
											backgroundColor: "white",
											"&:hover": {
												backgroundColor: "white",
											},
										}}>
										<Clear />
									</IconButton>
									<img
										src={
											typeof image.preview === "string"
												? image.preview
												: URL.createObjectURL(
														image.preview
												  )
										}
										alt="Course Image"
										style={{
											width: "100%",
											height: "auto",
											maxHeight: 400,
											borderRadius: 12,
											objectFit: "cover",
											objectPosition: "center",
										}}
									/>
								</Box>
							)}
						</SectionWrapper>
						<SectionWrapper>
							<SectionHeader
								heading="Update Course"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 0,
								}}
							/>
							<SectionHeader
								isSubHeading
								variant="h6"
								heading="Click the button below to save your changes."
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<Button
								disabled={isPending}
								variant="contained"
								type="submit"
								fullWidth
								disableElevation
								size="large"
								endIcon={<Done />}>
								Update Course
							</Button>
						</SectionWrapper>
					</Stack>
				</form>
			</FormContainer>
		</PageWrapper>
	);
};

export default UpdateCourseInformationForm;
