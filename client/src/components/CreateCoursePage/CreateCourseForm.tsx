import React, { ChangeEvent, useState, useRef } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	MenuItem,
	Stack,
	FormControl,
	RadioGroup,
	Radio,
	FormControlLabel,
	InputLabel,
	Select,
	Checkbox,
	IconButton,
} from "@mui/material";
import { Clear, Done } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import FormContainer from "../UI/PageLayout/FormContainer";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import categories from "../../assets/data/categories";
import CourseCategories from "../UI/Courses/CourseCategories";
import CheckListItem from "../UI/Courses/CheckListItem";
import resizeImageFile from "../../helpers/resizeImageFile";

import Popup from "../Popup/Popup";

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

type CourseFormSchemaType = z.infer<typeof schema>;

interface ImageState {
	preview: string | undefined;
	uploaded: boolean;
}

const CreateCourseForm = () => {
	const [prerequisite, setPrerequisite] = useState("");
	const [skill, setSkill] = useState("");
	const [image, setImage] = useState<ImageState>({
		preview: undefined,
		uploaded: false,
	});

	// Reference for the file input
	const fileInputRef = useRef<HTMLInputElement>(null);

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

	const popupFunction = () => {
		navigate("/dashboard");
	};

	const { mutate, isError, isPending, isSuccess } = useMutation({
		mutationFn: (data: CourseFormSchemaType) => {
			return api.post("/courses", { ...data });
		},

		onSuccess: (response) => {
			// navigate(`/courses/${response.data.data.data.id}`);
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const renderSelectedCategories = (selected: string[]) =>
		selected.join(", ");

	const isSelected = (value: string) => watch().categories.includes(value);

	const removeCategory = (selectedCategory: string) => {
		const newCategories = watch().categories.filter(
			(category) => category !== selectedCategory
		);
		setValue("categories", newCategories);
	};

	const prerequisiteChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
		setPrerequisite(event.target.value);

	const addPrerequisite = (value: string) => {
		setValue("prerequisites", [...watch().prerequisites, value]);
		setPrerequisite("");
	};

	const removePrerequisite = (selectedPrerequisite: string) => {
		const newPrerequisites = watch().prerequisites.filter(
			(prerequisite) => prerequisite !== selectedPrerequisite
		);
		setValue("prerequisites", newPrerequisites);
	};

	const skillChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
		setSkill(event.target.value);

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

	// const paidChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
	// 	const value = event.target.value === "true";
	// 	setValue("paid", value);
	// 	setValue("price", 0);
	// };

	// const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
	// 	console.log(watch().price);
	// 	setValue("price", parseFloat(event.target.value));
	// };

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImage({ preview: URL.createObjectURL(file), uploaded: true });
		}
	};

	const removeImage = () => {
		setImage({ preview: undefined, uploaded: false });
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const onSubmit = async (data: CourseFormSchemaType) => {
		const resizedImage = image.preview
			? await resizeImageFile(
					new File(
						[await (await fetch(image.preview)).blob()],
						"imageCover"
					)
			  )
			: undefined;

		setValue("imageCover", resizedImage);

		const body = {
			name: data.name,
			summary: data.summary,
			description: data.description,
			// price: data.price,
			price: 0.0,
			// paid: data.paid,
			paid: false,
			categories: data.categories,
			skills: data.skills,
			prerequisites: data.prerequisites,
			imageCover: resizedImage,
			difficulty: data.difficulty,
		};

		mutate(body);
	};

	return (
		<FormContainer large>
			<form
				style={{
					width: "100%",
				}}
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
			>
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
							heading="Give your course a name that reflects its content and purpose."
							keepHeadingAlignmentOnSmallScreens
							headingAlignment="left"
							headingAnimated={false}
							sx={{
								mb: 2,
							}}
						/>
						<FormControl required fullWidth error={!!errors.name}>
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
													color="error"
												>
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
							heading="Provide a brief summary of your course. Keep it short and descriptive."
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
							error={!!errors.summary}
						>
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
													color="error"
												>
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
							heading="Provide a detailed description of your course. Go into detail about what students will learn and why they should take your course. The more information you provide, the better."
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
							error={!!errors.description}
						>
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
													color="error"
												>
													{errors.description.message}
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
							heading="Select up to 12 categories that best describe your course. This will help students find your course when they search for topics."
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
							error={!!errors.categories}
						>
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
										renderValue={renderSelectedCategories}
										variant="outlined"
										fullWidth
									>
										{categories.sort().map((category) => (
											<MenuItem
												key={category}
												value={category}
											>
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
						{watch().categories.length > 0 && (
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
							heading="Let students know how difficult your course is. This will help them decide if your course is right for them."
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
							error={!!errors.difficulty}
						>
							<Controller
								name="difficulty"
								control={control}
								render={({ field }) => (
									<RadioGroup
										{...field}
										row={window.innerWidth > 600}
										aria-label="Difficulty"
										name="difficulty"
										defaultValue="Beginner"
									>
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
							heading="List up to 12 prerequisites for your course. Write them as short bullet points. If there are none, leave this section blank."
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
							error={!!errors.prerequisites}
						>
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
									watch().prerequisites.length >= 12 ||
									prerequisite.length === 0 ||
									isPending
								}
								onClick={() => addPrerequisite(prerequisite)}
								sx={{
									my: 2,
								}}
							>
								Add Prerequisite
							</Button>
						</FormControl>
						{errors.prerequisites && (
							<Typography variant="body2" color="error">
								{errors.prerequisites.message}
							</Typography>
						)}
						{watch().prerequisites.length > 0 && (
							<Grid
								container
								direction="row"
								rowSpacing="20px"
								alignItems="left"
								justifyContent="left"
							>
								{watch().prerequisites.map(
									(prerequisite, index) => (
										<Grid
											item
											xs={12}
											sm={6}
											key={index + "prerequisite"}
										>
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
							heading="List up to 12 skills that students will learn from your course. This will help students understand what they will gain from your course. We recommend listing at least 3 skills. Write them as short bullet points."
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{
								mb: 2,
							}}
						/>
						<FormControl required fullWidth error={!!errors.skills}>
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
									watch().skills.length >= 12 ||
									skill.length === 0 ||
									isPending
								}
								onClick={() => addSkill(skill)}
								sx={{
									my: 2,
								}}
							>
								Add Skill
							</Button>
						</FormControl>
						{errors.skills && (
							<Typography variant="body2" color="error">
								{errors.skills.message}
							</Typography>
						)}
						{watch().skills.length > 0 && (
							<Grid
								container
								direction="row"
								rowSpacing="20px"
								alignItems="left"
								justifyContent="left"
							>
								{watch().skills.map((skill, index) => (
									<Grid
										item
										xs={12}
										sm={6}
										key={index + "skill"}
									>
										<CheckListItem
											item={skill}
											editable
											onEdit={() => removeSkill(skill)}
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
							heading="Decide how you'd like to price your course. Either set a price or make it free. Making your course free can help you attract more students."
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
							error={!!errors.paid}
						>
							<Controller
								name="paid"
								control={control}
								render={({ field }) => (
									<RadioGroup
										{...field}
										row={window.innerWidth > 600}
										aria-label="Pricing"
										name="paid"
										defaultValue="false"
										// onChange={paidChangeHandler}
										sx={{
											mb: 2,
										}}
									>
										<FormControlLabel
											value="false"
											control={<Radio />}
											label="Free"
										/>
										<FormControlLabel
											value="true"
											control={<Radio disabled />}
											label="Paid - Coming Soon"
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
												// onChange={priceChangeHandler}
												disabled
												placeholder="Coming Soon!"
											/>
										)}
									/>
								</FormControl>
								{errors.price && (
									<Typography variant="body2" color="error">
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
							heading="Upload an image for your course. Make sure it's an eye-catching image that represents your course.
                             This will be the first thing students see when they find your course."
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
							error={!!errors.imageCover}
						>
							<Button
								component="label"
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								disabled={isPending}
								sx={{
									mb: 2,
								}}
							>
								{image?.preview
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
								"Please upload a valid image for your course."
							</Typography>
						)}
						{image.preview && (
							<Box
								sx={{
									width: "100%",
									borderRadius: 12,
									position: "relative",
								}}
							>
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
									}}
								>
									<Clear />
								</IconButton>
								<img
									src={image.preview}
									alt="Course cover"
									style={{
										width: "100%",
										height: "auto",
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
							heading="Save and Continue"
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
							heading="You're almost there! Once you're ready, click the button below to save your course and continue. You'll get to set up your course contents in the next step. You can always come back and edit your course later."
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
							endIcon={<Done />}
						>
							Save and Continue
						</Button>
					</SectionWrapper>
				</Stack>
			</form>
			<Popup
				content={"Course created Successfully!"}
				openPopup={isSuccess}
				buttonText={"Go to Dashboard"}
				popupFunction={popupFunction}
			/>
		</FormContainer>
	);
};

export default CreateCourseForm;
