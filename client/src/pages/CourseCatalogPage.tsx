import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseBanner from "../components/UI/Courses/CourseBanner";
import CourseHighlights from "../components/CourseCatalogPage/CourseHighlights";
import CoursePrerequisitesAndSkills from "../components/CourseCatalogPage/CoursePrerequisitesAndSkills";
import CourseDescription from "../components/CourseCatalogPage/CourseDescription";
import CourseReviews from "../components/CourseCatalogPage/CourseReviews";
import CourseContents from "../components/CourseCatalogPage/CourseContents";
import CourseInstructors from "../components/CourseCatalogPage/CourseInstructors";
import CourseInformation from "../components/CourseCatalogPage/CourseInformation";
import CourseCategories from "../components/CourseCatalogPage/CourseCategories";
import CourseSelection from "../components/UI/Courses/CourseSelection";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import api from "../api";

const CourseCatalogPage = () => {
	const { courseId } = useParams();

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId as string)
	);

	const {
		data, //: course,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["course", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.course,
	});

	const course = data ?? dummyCourse;

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
		reviews,
		paid,
	} = course;

	return (
		<AnimatedPage>
			<CourseBanner
				name={name}
				price={price}
				isLoading={isLoading}
				isError={isError}
			/>
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
				isLoading={isLoading}
				isError={isError}
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
					backgroundColor: "white",
				}}>
				<Container maxWidth="lg">
					<CourseHighlights
						duration={duration}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseCategories
						categories={categories}
						isLoading={isLoading}
						isError={isError}
					/>
					<CoursePrerequisitesAndSkills
						prerequisites={prerequisites}
						skills={skills}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseContents isLoading={isLoading} isError={isError} />
					<CourseDescription
						description={description}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseInstructors
						instructors={instructors}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseReviews
						courseId={courseId as string}
						reviews={reviews as Review[]}
						ratingsAverage={ratingsAverage}
						ratingsQuantity={ratingsQuantity}
					/>
					<CourseSelection
						heading="See Some Similar Courses"
						headingAlignment="left"
						headingAnimated={false}
						variant="white"
						query={{
							url: "/courses",
						}}
					/>
				</Container>
			</Box>
			<Footer />
		</AnimatedPage>
	);
};

export default CourseCatalogPage;
