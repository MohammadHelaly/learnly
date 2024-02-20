import { Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import api from "../../api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

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

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "#9c27b0",
	"&:hover": {
		textDecoration: "underline",
	},
}));

type SignUpSchemaType = z.infer<typeof schema>;

const SignUpForm = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
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
			navigate("/dashboard");
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
		<Grid
			container
			direction="column"
			sx={{
				width: "100%",
				maxWidth: "500px",
				p: 2,
				my: 6,
				backgroundColor: "#ffffff",
				borderRadius: "10px",
				boxShadow: "0 0 0px rgba(0,0,0,0.5)",
			}}>
			<Typography variant="h4" color="common.black">
				Create your account
			</Typography>
			<Typography
				variant="body1"
				color="common.black"
				sx={{
					mb: 4,
				}}>
				Already have an account?{" "}
				<StyledNavLink to="/log-in">Log in</StyledNavLink>
			</Typography>
			<Typography
				variant="body1"
				// color="common.black"
				sx={{
					fontWeight: 300,
					color: "#666666",
				}}>
				Join a community of lifelong learners who share your passion.
				<br />
				Learnly is for everyone, everywhere.
			</Typography>
			{isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Something went wrong. Please try again.
				</Typography>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				autoComplete="off">
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
					}}>
					By clicking "Sign up", you agree to Learnly's{" "}
					<StyledNavLink to="/legal">
						Terms of Service and Privacy Policy
					</StyledNavLink>
				</Typography>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					size="large"
					disableElevation
					sx={{ width: "100%", mt: 2 }}>
					Sign up
				</Button>
			</form>
		</Grid>
	);
};

export default SignUpForm;
