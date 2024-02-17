import { Card, Container, Stack, Typography, Box } from "@mui/material";
import api from "../../api";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarRateIcon from "@mui/icons-material/StarRate";
import ReviewCard from "../UI/ReviewCard";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface CourseReviewsProps {
	courseId: string | number;
	reviews: Review[];
	ratingsAverage: number;
	ratingsQuantity: number;
	loading: boolean;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	color: " #9c27b0",
	transition: "all 1s ease",
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CourseReviews = (props: CourseReviewsProps) => {
	const { courseId, reviews, ratingsAverage, ratingsQuantity, loading } =
		props;
	const dummyReviews = [
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
	];

	return (
		<>
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
			<Container maxWidth="lg">
				<Stack direction="column" gap={2} alignItems="center">
					{/* {reviews &&
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
					})} */}
					{dummyReviews &&
						dummyReviews.slice(0, 4).map((reviewItem) => {
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
				<StyledNavLink
					to={`/courses/${courseId}/reviews`}
					sx={{
						mt: 5,
					}}>
					<Typography variant="h6" textAlign="center">
						See More Reviews
					</Typography>
					<ArrowForwardIcon />
				</StyledNavLink>
			</Container>
		</>
	);
};

export default CourseReviews;
