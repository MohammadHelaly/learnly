import { Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import api from "../../api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import FormContainer from "../UI/PageLayout/FormContainer";

const schema = z
	.object({
		password: z.string().min(8, {
			message: "Passwords must be at least 8 characters long.",
		}),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ["passwordConfirm"],
		message: "Passwords do not match",
	});

type ResetPasswordSchemaType = z.infer<typeof schema>;

const ResetPasswordForm = () => {
	const { passwordResetToken } = useParams();
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordSchemaType>({
		mode: "onTouched",
		resolver: zodResolver(schema),
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (formData: FormData) => {
			return api.patch(
				`/users/resetPassword/${passwordResetToken}`,
				formData
			);
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

	const onSubmit = (data: ResetPasswordSchemaType) => {
		const formData = new FormData();
		formData.append("password", data.password);
		formData.append("passwordConfirm", data.passwordConfirm);

		mutate(formData);
	};

	return (
		<FormContainer>
			<Typography variant="h4" color="common.black">
				Reset Your Password
			</Typography>
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					fontWeight: 300,
					mt: 2,
					mb: 4,
				}}>
				Choose a new password for your account.
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
				<Button
					type="submit"
					variant="contained"
					color="primary"
					size="large"
					disableElevation
					sx={{ width: "100%", mt: 2 }}>
					Reset Password
				</Button>
			</form>
		</FormContainer>
	);
};

export default ResetPasswordForm;
