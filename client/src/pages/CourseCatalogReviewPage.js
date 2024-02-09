import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import ApiInstance from "../api/ApiInstance";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseBanner from "../components/CourseCatalogPage/CourseBanner";
import ReviewCard from "../components/CourseCatalogPage/ReviewCard";
import StarRateIcon from "@mui/icons-material/StarRate";

const CourseCatalogReviewPage = () => {
	const { courseId } = useParams();
	// const [course, setCourse] = useState(null);
	// const [similarCourses, setSimilarCourses] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [reviews, setReviews] = useState([
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

	const limit = 9;

	const course = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId)
	);

	useEffect(() => {
		setError(false);
		setLoading(true);
		ApiInstance.get(`/courses/${courseId}/reviews`, {
			params: {
				page,
				limit,
			},
		})
			.then((response) => {
				console.log(response.data);
				// setCourse(response.data.data.course);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(true);
				setLoading(false);
			});
	}, [courseId, page]);

	return (
		<AnimatedPage>
			<CourseBanner course={course} loading={loading} />
			<Box
				// maxWidth="lg"
				sx={{
					minHeight: window.innerWidth > 3000 ? "60vh" : "auto",
					maxWidth: "100vw",
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "flex-start",
					py: 3,
					mt: window.innerWidth > 600 ? 8 : 7,
					px: window.innerWidth > 600 ? 13 : 2,
					backgroundColor: "white",
				}}>
				<Container maxWidth="lg">
					<Typography
						variant="h4"
						sx={{
							textAlign:
								window.innerWidth > 600 ? "left" : "center",
							my: 5,
						}}>
						{course?.name}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						sx={{
							textAlign:
								window.innerWidth > 600 ? "left" : "center",
							my: 5,
						}}>
						<StarRateIcon fontSize="normal" />
						{course?.ratingsAverage} out of 5 stars{" ("}
						{course?.ratingsQuantity}
						{" ratings)"}
					</Typography>
					<Stack direction="column" alignItems="center">
						{reviews.map((review) => (
							<ReviewCard review={review} loading={loading} />
						))}
					</Stack>
				</Container>
				<Pagination
					count={10}
					value={page}
					onChange={(event, value) => {
						setPage(value);
					}}
					variant="outlined"
					sx={{
						my: 10,
					}}
				/>
			</Box>
			<Footer />
		</AnimatedPage>
	);
};

export default CourseCatalogReviewPage;
