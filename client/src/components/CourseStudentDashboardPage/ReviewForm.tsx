import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { Button, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import FormContainer from "../UI/PageLayout/FormContainer";

const schema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }),
});

type ForgotPasswordSchemaType = z.infer<typeof schema>;

const ReviewForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordSchemaType>({
		mode: "onTouched",
		resolver: zodResolver(schema),
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending, isSuccess } = useMutation({
		mutationFn: (formData: FormData) => {
			return api.post("/users/forgotPassword", formData);
		},
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ["authenticateMe"] }); //TODO: Check if this is necessary
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
		<>
			<FormContainer large sx={{ px: window.innerWidth < 600 ? 0 : 2 }}>
				<Typography
					variant="h4"
					color="common.black"
					sx={{ paddingBottom: "1rem" }}
				>
					Leave a Review?
				</Typography>

				<Rating name="simple-controlled" />
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								required
								id="email"
								label="Review"
								type="text"
								variant="outlined"
								disabled={isPending}
								sx={{ width: "100%", mt: 4, mb: 2 }}
								helperText={
									errors.email && (
										<Typography
											variant="body2"
											color="error"
										>
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
						sx={{ width: "100%", mt: 2 }}
					>
						Leave Review
					</Button>
				</form>
			</FormContainer>
		</>
	);
};

export default ReviewForm;
