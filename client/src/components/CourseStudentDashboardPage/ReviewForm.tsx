import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { Button, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import FormContainer from "../UI/PageLayout/FormContainer";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import Popup from "../Popup/Popup";
import { useQuery } from "@tanstack/react-query";
import dummyCourseReviewsData from "../../assets/data/dummyCourseReviewsData";
interface ReviewFormProps {
	courseId: string;
}

const schema = z.object({
	rating: z
		.number()
		.int()
		.min(1, "Rating is required.")
		.max(5, "Rating must be between 1 and 5."),
	review: z.string().min(4, "Review is too short."),
});

type ReviewFormSchemaType = z.infer<typeof schema>;

const ReviewForm = (props: ReviewFormProps) => {
	const { courseId } = props;
	const authContext = useContext(AuthContext);
	const queryClient = useQueryClient();
	const PopupFunction = () => {
		queryClient.invalidateQueries({
			queryKey: ["courseReviews", { courseId }],
		});
		queryClient.invalidateQueries({
			queryKey: ["courses", { courseId }],
		});
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ReviewFormSchemaType>({
		resolver: zodResolver(schema),
		defaultValues: {
			rating: 0,
			review: "",
		},
	});

	const { mutate, isError, isPending, isSuccess } = useMutation({
		mutationFn: (data: any) => {
			return api.post("/reviews", {
				...data,
			});
		},
		onSuccess: (response) => {},
		onError: (error) => {
			console.error(error);
		},
	});

	const onSubmit = (data: ReviewFormSchemaType) => {
		const formData = {
			rating: data.rating,
			review: data.review,
			user: authContext.user?.id || "",
			course: courseId,
		};

		mutate(formData);
	};

	return (
		<FormContainer sx={{ px: window.innerWidth < 600 ? 0 : 2 }}>
			<Typography
				variant="h4"
				color="common.black"
				sx={{ paddingBottom: "1rem" }}
			>
				Leave a Review?
			</Typography>

			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="rating"
					control={control}
					render={({ field }) => (
						<Rating
							{...field}
							color="secondary"
							value={field.value || 0}
							onChange={(event, newValue) =>
								field.onChange(newValue)
							}
							precision={1}
							sx={{
								// Optional: Additional styling for the Rating component
								"& .MuiRating-iconFilled": {
									color: "secondary.main", // Apply the secondary color
								},
								"& .MuiRating-iconHover": {
									color: "secondary.light", // Optional: Color when hovered over
								},
							}}
						/>
					)}
				/>
				{errors.rating && (
					<Typography color="error">
						{errors.rating.message}
					</Typography>
				)}

				<Controller
					name="review"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Review"
							type="text"
							variant="outlined"
							fullWidth
							multiline
							rows={4}
							margin="normal"
							error={!!errors.review}
							helperText={errors.review?.message}
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					size="large"
					disableElevation
					sx={{ mt: 2 }}
				>
					Leave Review
				</Button>
			</form>
			<Popup
				heading="Success!"
				openPopup={isSuccess}
				content="Review submitted successfully!"
				buttonText="Great!"
				popupFunction={PopupFunction}
			/>
			<Popup
				heading="Something went wrong..."
				content="A problem occurred while processing your request. Please try again."
				openPopup={isError}
				buttonText="Close"
				error={true}
				popupFunction={() => {}}
			/>
		</FormContainer>
	);
};

export default ReviewForm;
