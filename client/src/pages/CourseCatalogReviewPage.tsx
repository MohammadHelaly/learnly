import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import { Box, Container, Pagination, Typography } from "@mui/material";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseBanner from "../components/UI/Courses/CourseBanner";
import StarRateIcon from "@mui/icons-material/StarRate";
import Reviews from "../components/UI/Reviews/Reviews";
import dummyCourseReviewsData from "../assets/data/dummyCourseReviewsData";

const CourseCatalogReviewPage = () => {
	const { courseId } = useParams();
	const [page, setPage] = useState(1);

	const dummyReviews = dummyCourseReviewsData.slice(0, 9);

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data: course,
		isLoading: isLoadingCourse,
		isError: isErrorCourse,
	} = useQuery({
		queryKey: ["course", { courseId }],
		queryFn: async () =>
			await api.get(`/courses/${courseId}`, {
				params: {
					fields: "name,price,ratingsAverage,ratingsQuantity",
				},
			}),
		select: (response) => response.data.data.course,
	});

	const {
		data, //: courseReviews,
		isLoading: isLoadingReviews,
		isError: isErrorReviews,
	} = useQuery({
		queryKey: ["courseReviews", { courseId, page }],
		queryFn: async () =>
			await api.get(`/courses/${courseId}/reviews`, {
				params: {
					page,
					limit: 9,
				},
			}),
		select: (response) => response.data.data.reviews,
	});

	const courseReviews = data ?? dummyReviews;

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId as string)
		// (course) => course.id === (courseId ? parseInt(courseId))
	);
	const { name, price, ratingsAverage, ratingsQuantity } =
		dummyCourse as Course;

	return (
		<AnimatedPage>
			<CourseBanner
				name={name}
				price={price}
				isLoading={isLoadingCourse}
				isError={isErrorCourse}
			/>
			<Box
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
						{name}
					</Typography>
					<Typography
						variant="h5"
						color="text.secondary"
						sx={{
							textAlign:
								window.innerWidth > 600 ? "left" : "center",
							my: 5,
						}}>
						<StarRateIcon fontSize="medium" />
						{ratingsAverage} out of 5 stars{" ("}
						{ratingsQuantity}
						{" ratings)"}
					</Typography>
					<Reviews
						reviews={courseReviews}
						isError={isErrorReviews}
						isLoading={isLoadingReviews}
						maxLength={9}
					/>
				</Container>
				<Pagination
					count={10}
					page={page}
					onChange={pageChangeHandler}
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
