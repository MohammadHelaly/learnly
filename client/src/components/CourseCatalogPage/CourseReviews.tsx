import { Card, Container, Stack, Typography, Box } from "@mui/material";
import ApiInstance from "../../api/ApiInstance";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarRateIcon from "@mui/icons-material/StarRate";
import ReviewCard from "./ReviewCard";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface CourseReviewsProps {
	courseId: string | number;
	ratingsAverage: number;
	ratingsQuantity: number;
	loading: boolean;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	color: " #9c27b0",
	transition: "all 1s ease",
	textDecoration: "none",
	marginLeft: window.innerWidth > 600 ? 10 : 2,
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CourseReviews = (props: CourseReviewsProps) => {
	const { courseId, ratingsAverage, ratingsQuantity, loading } = props;
	const [reviews, setReviews] = useState<Review[]>([
		{
			id: 1,
			rating: 4,
			review: "This course was really good. But I think it could be better.But I think it could be better.But I think it could be better.",
			user: {
				id: 1,
				name: "John Doe",
				photo: "https://i.pravatar.cc/300",
			},
			createdAt: "2021-10-10",
		},
		{
			id: 2,
			rating: 5,
			review: "This course was really good.",
			user: {
				id: 1,
				name: "John Doe",
				photo: "https://i.pravatar.cc/300",
			},
			createdAt: "2021-10-10",
		},
		{
			id: 3,
			rating: 3,
			review: "This course was really good.",
			user: {
				id: 1,
				name: "John Doe",
				photo: "https://i.pravatar.cc/300",
			},
			createdAt: "2021-10-10",
		},
		{
			id: 4,
			rating: 2,
			review: "This course was really good.",
			user: {
				id: 1,
				name: "John Doe",
				photo: "https://i.pravatar.cc/300",
			},
			createdAt: "2021-10-10",
		},
		{
			id: 5,
			rating: 1,
			review: "This course was really good.",
			user: {
				id: 1,
				name: "John Doe",
				photo: "https://i.pravatar.cc/300",
			},
			createdAt: "2021-10-10",
		},
	]);
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	ApiInstance.get(`/courses/${course.id}/reviews`)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			// setCourse(response.data.data.course);
	// 			setReviews(response.data.data.reviews);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 			setError(true);
	// 			setLoading(false);
	// 		});
	// }, [props.courseId]);

	return (
		<Box
			sx={{
				px: window.innerWidth > 600 ? 0 : 2,
			}}>
			<Typography
				variant="h4"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				What people are saying about this course
			</Typography>
			<Typography
				variant="h5"
				color="text.secondary"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				<StarRateIcon fontSize="medium" />
				{ratingsAverage} out of 5 stars{" ("}
				{ratingsQuantity}
				{" ratings)"}
			</Typography>
			<Stack direction="column" spacing={1} alignItems="center">
				{reviews &&
					reviews.slice(0, 4).map((reviewItem) => {
						const { id, rating, review, user, createdAt } =
							reviewItem;
						return (
							<ReviewCard
								key={id}
								review={review}
								user={user}
								createdAt={createdAt}
								rating={rating}
								loading={loading}
							/>
						);
					})}
			</Stack>
			<StyledNavLink to={`/courses/${courseId}/reviews`}>
				<Typography
					variant="h6"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						// fontWeight: "bold",
						// color: "#9c27b0",
						mt: 2,
						mb: 7,
						ml: window.innerWidth > 600 ? 4 : 0,
					}}>
					See More Reviews
					<ArrowForwardIcon
						sx={{
							mb: -1,
						}}
					/>
				</Typography>
			</StyledNavLink>
		</Box>
	);
};

export default CourseReviews;
