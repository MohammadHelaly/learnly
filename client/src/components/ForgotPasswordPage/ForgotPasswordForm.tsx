import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { Button, TextField, Typography } from "@mui/material";
import FormContainer from "../UI/FormContainer";

const schema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }),
});

type ForgotPasswordSchemaType = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordSchemaType>({
		mode: "onTouched",
		resolver: zodResolver(schema),
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (formData: FormData) => {
			return api.post("/users/forgotPassword", formData);
		},
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ["authenticateMe"] }); //TODO: Check if this is necessary
			// TODO: Add a snackbar/popup to show the user that the email was sent and they can close this page
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const onSubmit = (data: ForgotPasswordSchemaType) => {
		const formData = new FormData();
		formData.append("email", data.email);

		mutate(formData);
	};

	return (
		<FormContainer>
			<Typography variant="h4" color="common.black">
				Forgot Your Password?
			</Typography>
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					fontWeight: 300,
					mt: 2,
				}}>
				No worries! Enter your email and we'll send you a link to reset
				it.
			</Typography>
			{isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Incorrect email. Please try again.
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
				<Button
					type="submit"
					variant="contained"
					color="primary"
					size="large"
					disableElevation
					disabled={isPending}
					sx={{ width: "100%", mt: 2 }}>
					Send Email
				</Button>
			</form>
		</FormContainer>
	);
};

export default ForgotPasswordForm;
