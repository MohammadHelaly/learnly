import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const schema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." }),
});

type LogInSchemaType = z.infer<typeof schema>;

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "#9c27b0",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const LogInForm = () => {
	const authContext = useContext(AuthContext);

	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInSchemaType>({
		mode: "onTouched",
		resolver: zodResolver(schema),
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (formData: FormData) => {
			return api.post("/users/login", formData);
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

	const onSubmit = (data: LogInSchemaType) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);

		mutate(formData);
	};

	return (
		<Grid
			container
			direction="column"
			sx={{
				width: "100%",
				maxWidth: "500px",
				transition: "all 0.4s ease-in-out",
				p: 2,
				mb: 2,
				backgroundColor: "#ffffff",
				borderRadius: "10px",
				boxShadow: "0 0 0px rgba(0,0,0,0.5)",
			}}>
			<Typography variant="h4" color="common.black">
				Log in to Learnly
			</Typography>
			<Typography
				variant="body1"
				color="common.black"
				sx={{
					mb: 4,
				}}>
				Don't have an account?{" "}
				<StyledNavLink to="/sign-up">Sign up</StyledNavLink>
			</Typography>
			<Typography
				variant="body1"
				// color="common.black"
				sx={{
					fontWeight: 300,
					color: "#666666",
				}}>
				Develop your skills and share your knowledge with others.
				<br />
				Learn and teach anywhere, anytime.
			</Typography>
			{isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Incorrect email or password. Please try again.
				</Typography>
			)}
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							required
							id="email"
							label="Email"
							type="email"
							variant="outlined"
							disabled={isPending}
							sx={{ width: "100%", mt: 4, mb: 2 }}
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
							id="password"
							type="password"
							label="Password"
							disabled={isPending}
							variant="outlined"
							sx={{ width: "100%", mb: 4 }}
							helperText={
								<>
									{errors.password && (
										<Typography
											variant="body2"
											color="error">
											{errors.password.message}
										</Typography>
									)}
									<Typography variant="body1">
										<StyledNavLink to="/forgot-password">
											Forgot your password?
										</StyledNavLink>
									</Typography>
								</>
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
					By clicking "Log in", you agree to Learnly's{" "}
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
					disabled={isPending}
					sx={{ width: "100%", mt: 2 }}>
					Log in
				</Button>
			</form>
		</Grid>
	);
};

export default LogInForm;
