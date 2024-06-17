import React, {
	ChangeEvent,
	useContext,
	useEffect,
	useState,
	useRef,
} from "react";
import {
	Box,
	Stack,
	TextField,
	Typography,
	Avatar,
	IconButton,
	Button,
	FormControl,
} from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import FormContainer from "../UI/PageLayout/FormContainer";
import AuthContext from "../../store/auth-context";
import api from "../../api";
import resizeImageFile from "../../helpers/resizeImageFile";
import { z } from "zod";
import { NavLink } from "react-router-dom";
import Popup from "../Popup/Popup";

const schema = z.object({
	name: z
		.string()
		.max(40, { message: "A name must be 80 characters or less." })
		.min(1, { message: "A name must be 1 character or more." }),
	bio: z
		.string()
		.max(1500, { message: "Bio must be less than or equal to 1500." })
		.optional(),
});

type UserInformationSchemaType = z.infer<typeof schema>;

interface ImageState {
	preview: string | undefined;
	uploaded: boolean;
}

const UserProfile = () => {
	const authContext = useContext(AuthContext);
	const [image, setImage] = useState<ImageState>({
		preview: authContext.user?.photo?.url,
		uploaded: false,
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, dirtyFields },
		reset,
	} = useForm<UserInformationSchemaType>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			name: authContext.user?.name || "",
			bio: authContext.user?.bio || "",
		},
	});

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		if (file) {
			setImage((prevState) => ({
				preview: URL.createObjectURL(file),
				uploaded: true,
			}));
		}
	};

	const {
		mutate,
		isPending,
		isSuccess,
		isError: UpdateError,
	} = useMutation({
		mutationFn: (
			data: Partial<
				UserInformationSchemaType & { photo: string | File | Blob }
			>
		) => {
			return api.patch(`/users/updateMe`, data);
		},
		onSuccess: (response) => {
			authContext.update(response.data.data.user);
		},
		onError: (error) => {
			// console.error(error);
			// alert("An error occurred. Please try again.");
		},
	});

	const onSubmit = async (data: UserInformationSchemaType) => {
		if (!(isDirty || image.uploaded)) return;

		let resizedPhoto: string | undefined = undefined;

		if (image.uploaded && image.preview) {
			try {
				const response = await fetch(image.preview);
				const blob = await response.blob();
				const resizedBlob = await resizeImageFile(
					new File([blob], "photo")
				);

				resizedPhoto = resizedBlob as string;
			} catch (error) {
				console.error("Error processing the image file", error);
			}
		}

		if (!image.preview && image.uploaded) {
			resizedPhoto = "default.jpg";
		}

		const requestBody: Partial<
			UserInformationSchemaType & { photo: string | undefined }
		> = {
			photo: image.uploaded ? resizedPhoto : undefined,
			name: dirtyFields.name ? data.name : undefined,
			bio: dirtyFields.bio ? data.bio : undefined,
		};

		mutate(requestBody);
	};

	useEffect(() => {
		reset({
			name: authContext.user?.name,
			bio: authContext.user?.bio,
		});
		setImage({
			preview: authContext.user?.photo?.url,
			uploaded: false,
		});
	}, [authContext.user, reset]);

	const clearImageSelection = () => {
		image.preview
			? setImage({ preview: undefined, uploaded: false })
			: setImage({
					preview: authContext.user?.photo?.url,
					uploaded: false,
			  });
		if (image.preview === authContext.user?.photo?.url) {
			setImage({ preview: undefined, uploaded: true });
		}
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<FormContainer sx={{ px: window.innerWidth < 600 ? 0 : "" }}>
			<form
				style={{ width: "100%", marginBottom: 2 }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Stack
					alignItems="center"
					display="flex"
					flexDirection="column"
					spacing={8}
				>
					<SectionWrapper>
						<SectionHeader
							heading="Your Photo"
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{ mb: 0 }}
						/>
						<SectionHeader
							isSubHeading
							heading="Upload a profile picture."
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{ mb: 4 }}
						/>
						<Stack alignItems="center" spacing={2}>
							<Box sx={{ position: "relative" }}>
								<Avatar
									alt={authContext.user?.name}
									src={image.preview || ""}
									sx={{
										backgroundColor: "primary.main",
										width: 100,
										height: 100,
										mb: 4,
									}}
								/>
								{image.preview && (
									<IconButton
										sx={{
											position: "absolute",
											top: 0,
											left: 0,

											backgroundColor: "white",
											"&:hover": {
												backgroundColor: "white",
											},
										}}
										onClick={clearImageSelection}
									>
										<Clear />
									</IconButton>
								)}
							</Box>
							<Button
								component="label"
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								disabled={isPending}
							>
								<input
									ref={fileInputRef}
									accept="image/*"
									style={{ display: "none" }}
									multiple={false}
									type="file"
									onChange={handleImageChange}
								/>
								Edit Picture
							</Button>
						</Stack>
					</SectionWrapper>
					<SectionWrapper>
						<SectionHeader
							heading="Your Name"
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{ mb: 0 }}
						/>
						<SectionHeader
							isSubHeading
							heading="What should we call you?"
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{ mb: 4 }}
						/>
						<Stack
							spacing="1rem"
							display="flex"
							flexDirection="column"
						>
							<FormControl
								required
								fullWidth
								error={!!errors.name}
							>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											type="text"
											label="Name"
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
						</Stack>
					</SectionWrapper>
					<SectionWrapper>
						<SectionHeader
							heading="Your Bio"
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{ mb: 0 }}
						/>
						<SectionHeader
							isSubHeading
							heading="Tell us about yourself."
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{ mb: 4 }}
						/>
						<FormControl required fullWidth error={!!errors.bio}>
							<Controller
								name="bio"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										type="text"
										label="Bio"
										helperText={
											errors.bio && (
												<Typography
													variant="body2"
													color="error"
												>
													{errors.bio.message}
												</Typography>
											)
										}
									/>
								)}
							/>
						</FormControl>
					</SectionWrapper>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disableElevation
						size="large"
						disabled={isPending}
					>
						Save Changes
					</Button>
					<Popup
						heading="Success!"
						openPopup={isSuccess}
						buttonText="Great!"
						content="User updated successfully!"
						popupFunction={() => {}}
					/>
					<Popup
						heading="Something went wrong…"
						content="A problem occurred while processing your request. Please try again."
						openPopup={UpdateError}
						buttonText="Close"
						popupFunction={() => {}}
					/>
				</Stack>
			</form>
			<SectionWrapper sx={{ mt: 8 }}>
				<SectionHeader
					heading="View Your Profile"
					headingAlignment="left"
					keepHeadingAlignmentOnSmallScreens
					headingAnimated={false}
					sx={{ mb: 0 }}
				/>
				<SectionHeader
					isSubHeading
					heading="View your profile as others see it."
					headingAlignment="left"
					keepHeadingAlignmentOnSmallScreens
					headingAnimated={false}
					sx={{ mb: 4 }}
				/>
				<NavLink to={`/users/${authContext.user?.id}`}>
					<Button
						fullWidth
						variant="contained"
						size="large"
						disableElevation
					>
						View Profile
					</Button>
				</NavLink>
			</SectionWrapper>
		</FormContainer>
	);
};

export default UserProfile;
