import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import { Button, TextField, Typography, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import FormContainer from "../../UI/PageLayout/FormContainer";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
import Popup from "../../Popup/Popup";
import { useQuery } from "@tanstack/react-query";
import dummyCourseReviewsData from "../../../assets/data/dummyCourseReviewsData";
import { useEffect } from "react";
import DeleteReviewForm from "./DeleteReviewForm";
interface UpdateReviewFormProps {
	courseId: string;
	review: string;
	rating: number;
	reviewId: string;
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

const UpdateReviewForm = (props: UpdateReviewFormProps) => {
	const { courseId, review, rating, reviewId } = props;

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
			rating: rating,
			review: review,
		},
	});

	const { mutate, isError, isPending, isSuccess } = useMutation({
		mutationFn: (data: any) => {
			return api.patch(`/reviews/${reviewId}`, {
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
			// user: authContext.user?.id || "",
			// course: courseId,
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
				Your Review
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

				{/* <Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 2 }}
				>
					Update Review
				</Button> */}
				<Stack
					direction="row"
					spacing={1}
					justifyContent="space-between"
					width="100%"
				>
					<Button
						type="submit"
						size="medium"
						fullWidth
						variant="contained"
						disableElevation
					>
						Update Review
					</Button>
					{/* <Button
						fullWidth
						size="medium"
						variant="outlined"
						color="error"
						disableElevation
						sx={{
							"&:hover": {
								backgroundColor: "error.main",
								color: "white",
							},
						}}
					>
						Delete
					</Button> */}
					<DeleteReviewForm reviewId={reviewId} />
				</Stack>
			</form>
			<Popup
				heading="Success!"
				openPopup={isSuccess}
				content="Review updated successfully!"
				buttonText="Great!"
				popupFunction={PopupFunction}
			/>
		</FormContainer>
	);
};

export default UpdateReviewForm;
