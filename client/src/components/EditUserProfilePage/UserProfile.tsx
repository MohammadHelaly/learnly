import React from "react";
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
	FormControl,
} from "@mui/material";
import NavigationGuard from "../Navigation/NavigationGuard";
import api from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import { useState, useContext, ChangeEvent } from "react";
import AuthContext from "../../store/auth-context";
import SectionHeader from "../UI/PageLayout/SectionHeader";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, set } from "react-hook-form";
import { useEffect } from "react";
import resizeImageFile from "../../helpers/resizeImageFile";
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
function UserProfile() {
	const authContext = useContext(AuthContext);
	const [name, setName] = useState(authContext.user?.name);
	const [bio, setBio] = useState(authContext.user?.bio);
	const [image, setImage] = useState<ImageState>({
		preview: authContext.user?.photo?.url,
		uploaded: "",
	});

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
	const { mutate, isError, isPending } = useMutation({
		mutationFn: (data: Partial<UserInformationSchemaType>) => {
			return api.patch(`/users/updateMe`, {
				...data,
			});
		},
		onSuccess: (response) => {
			alert("User updated successfully.");
			if (authContext.user) {
				if (name) {
					authContext.user.name = name;
				}
				if (bio) {
					authContext.user.bio = bio;
				}
				if (image.preview) {
					authContext.user.photo = {
						url: image.preview as string,
						key: "",
					};
				}
				authContext.update(authContext.user);
			}
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});
	const setValueOptions = {
		shouldDirty: true,
		shouldValidate: true,
		shouldTouch: true,
	};

	const onSubmit = async (data: UserInformationSchemaType) => {
		if (!isDirty) return;

		const body = {
			photo: dirtyFields.photo ? data.photo : undefined,
			name: dirtyFields.name ? data.name : undefined,
			bio: dirtyFields.bio ? data.bio : undefined,
		};
		setName(body.name);
		setBio(body.bio);
		setImage({ ...image, preview: body.photo });
		mutate(body);
	};
	useEffect(() => {
		const resizeImage = async () => {
			if (image.preview && typeof image.preview !== "string") {
				const resizedImage = await resizeImageFile(
					image.preview as File
				);
				setValues("photo", resizedImage, setValueOptions);
			} else {
				resetField("photo");
			}
		};

		resizeImage();
	}, [image.preview]);

	useEffect(() => {
		reset({
			name: authContext.user?.name,
			bio: authContext.user?.bio,
			photo: authContext.user?.photo,
		});
		setImage({
			preview: authContext.user?.photo?.url,
			uploaded: "",
		});
	}, [authContext.user]);

	useEffect(() => {});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack
				alignItems={"center"}
				display={"flex"}
				flexDirection={"column"}
			>
				<Stack alignItems={"center"} sx={{ paddingTop: "2rem" }}>
					<Typography
						align="center"
						variant="h5"
						sx={{ paddingBottom: "1rem" }}
					>
						Change Profile Picture
					</Typography>
					<Avatar
						alt={authContext.user?.name}
						src={
							typeof image?.preview === "string"
								? image.preview
								: ""
							// : URL.createObjectURL(image?.preview as Blob)
						}
						sx={{
							marginBottom: "0.5rem",
							backgroundColor: "primary.main",
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
				<Stack spacing="1rem" display={"flex"} flexDirection={"column"}>
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
					<FormControl required fullWidth error={!!errors.name}>
						<Controller
							name="bio"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									type="text"
									name="bio"
									label="Bio"
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
					<Button type="submit" disabled={isPending}>
						Save Changes
					</Button>
				</Stack>
			</Stack>
		</form>
	);
}

export default UserProfile;
