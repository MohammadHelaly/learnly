import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import api from "../../api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import FormContainer from "../UI/PageLayout/FormContainer";
import TextNavLink from "../UI/Links/TextNavLink";
import Popup from "../Popup/Popup";

const schema = z
	.object({
		name: z
			.string()
			.max(40, { message: "A username must be 40 characters or less." }),
		email: z.string().email({ message: "Please enter a valid email." }),
		password: z.string().min(8, {
			message: "Passwords must be at least 8 characters long.",
		}),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ["passwordConfirm"],
		message: "Passwords do not match",
	});

type SignUpSchemaType = z.infer<typeof schema>;

const SignUpForm = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpSchemaType>({
		mode: "onTouched",
		resolver: zodResolver(schema),
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (formData: FormData) => {
			return api.post("/users/signup", formData);
		},
		onSuccess: (response) => {
			authContext.login(response.data.data.user);
			queryClient.invalidateQueries({ queryKey: ["authenticateMe"] }); //TODO: Check if this is necessary
			navigate("/catalog");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const onSubmit = (data: SignUpSchemaType) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("passwordConfirm", data.passwordConfirm);

		mutate(formData);
	};

	return (
		<FormContainer>
			<Typography variant="h4" color="common.black">
				Create your account
			</Typography>
			<Typography
				variant="body1"
				color="common.black"
				sx={{
					mb: 4,
				}}
			>
				Already have an account?{" "}
				<TextNavLink to="/log-in">Log in</TextNavLink>
			</Typography>
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					fontWeight: 300,
				}}
			>
				Join a community of lifelong learners who share your passion.
				<br />
				Learnly is for everyone, everywhere.
			</Typography>
			{/* {isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Something went wrong. Please try again.
				</Typography>
			)} */}
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				autoComplete="off"
			>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<TextField
							required
							label="Name"
							variant="outlined"
							disabled={isPending}
							sx={{ width: "100%", mt: 4, mb: 2 }}
							helperText={
								errors.name && (
									<Typography variant="body2" color="error">
										{errors.name.message}
									</Typography>
								)
							}
							{...field}
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							required
							label="Email"
							variant="outlined"
							disabled={isPending}
							sx={{ width: "100%", mb: 2 }}
							helperText={
								errors.email && (
									<Typography variant="body2" color="error">
										{errors.email.message}
									</Typography>
								)
							}
							{...field}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							required
							type="password"
							label="Password"
							disabled={isPending}
							variant="outlined"
							sx={{ width: "100%", mb: 2 }}
							helperText={
								errors.password && (
									<Typography variant="body2" color="error">
										{errors.password.message}
									</Typography>
								)
							}
							{...field}
						/>
					)}
				/>
				<Controller
					name="passwordConfirm"
					disabled={isPending}
					control={control}
					render={({ field }) => (
						<TextField
							required
							type="password"
							label="Confirm Password"
							variant="outlined"
							sx={{ width: "100%", mb: 4 }}
							helperText={
								errors.passwordConfirm && (
									<Typography variant="body2" color="error">
										{errors.passwordConfirm.message}
									</Typography>
								)
							}
							{...field}
						/>
					)}
				/>
				<Typography
					variant="body2"
					color="common.black"
					sx={{
						fontSize: "0.75rem",
					}}
				>
					By clicking "Sign up", you agree to Learnly's{" "}
					<TextNavLink to="/legal">
						Terms of Service and Privacy Policy
					</TextNavLink>
				</Typography>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					size="large"
					disableElevation
					sx={{ width: "100%", mt: 2 }}
				>
					Sign up
				</Button>
			</form>
			<Popup
				content={"Email already exists"}
				openPopup={isError}
				buttonText={"Close"}
				popupFunction={() => {}}
			/>
		</FormContainer>
	);
};

export default SignUpForm;
