import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import ApiInstance from "../api/ApiInstance";
import { Box, Container, Typography } from "@mui/material";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseBanner from "../components/CourseCatalogPage/CourseBanner";
import CourseHighlights from "../components/CourseCatalogPage/CourseHighlights";
import CoursePrerequisitesAndSkills from "../components/CourseCatalogPage/CoursePrerequisitesAndSkills";
import CourseDescription from "../components/CourseCatalogPage/CourseDescription";
import CourseReviews from "../components/CourseCatalogPage/CourseReviews";
import SimilarCourses from "../components/CourseCatalogPage/Similar Courses";
import CourseContents from "../components/CourseCatalogPage/CourseContents";
import CourseInstructors from "../components/CourseCatalogPage/CourseInstructors";
import CourseInformation from "../components/CourseCatalogPage/CourseInformation";
import CourseCategories from "../components/CourseCatalogPage/CourseCategories";

const CourseCatalogPage = () => {
	const { courseId } = useParams();
	// const [course, setCourse] = useState(null);
	// const [similarCourses, setSimilarCourses] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const course = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId as string)
	);

	const {
		name,
		price,
		categories,
		prerequisites,
		skills,
		description,
		summary,
		duration,
		difficulty,
		ratingsAverage,
		ratingsQuantity,
		instructors,
		image,
		paid,
	} = course as Course;

	useEffect(() => {
		setError(false);
		setLoading(true);
		ApiInstance.get(`/courses/${courseId}`)
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
	}, [courseId]);

	return (
		<AnimatedPage>
			<CourseBanner name={name} price={price} loading={loading} />
			<CourseInformation
				name={name}
				price={price}
				summary={summary}
				duration={duration}
				difficulty={difficulty}
				ratingsAverage={ratingsAverage}
				ratingsQuantity={ratingsQuantity}
				instructors={instructors}
				image={image}
				paid={paid as boolean}
				loading={loading}
			/>
			<Box
				sx={{
					minHeight: window.innerWidth > 3000 ? "60vh" : "auto",
					maxWidth: "100vw",
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					alignItems: "left",
					justifyContent: "flex-start",
					py: 3,
					px: window.innerWidth > 600 ? 13 : 0,
					backgroundColor: "white",
				}}>
				<Container maxWidth="lg">
					<CourseHighlights duration={duration} loading={loading} />
					<CourseCategories
						categories={categories}
						loading={loading}
					/>
					<CoursePrerequisitesAndSkills
						prerequisites={prerequisites}
						skills={skills}
						loading={loading}
					/>
					<CourseContents loading={loading} />
					<CourseDescription
						description={description}
						loading={loading}
					/>
					<CourseInstructors
						instructors={instructors}
						loading={loading}
					/>
					<CourseReviews
						courseId={courseId as string}
						ratingsAverage={ratingsAverage}
						ratingsQuantity={ratingsQuantity}
						loading={loading}
					/>
					<SimilarCourses categories={categories} />
				</Container>
			</Box>
			<Footer />
		</AnimatedPage>
	);
};

export default CourseCatalogPage;
