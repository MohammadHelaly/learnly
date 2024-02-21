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
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});

	const course = data ?? dummyCourse;

	return (
		<AnimatedPage>
			<CourseBanner
				courseId={courseId as string}
				name={course?.name}
				price={course?.price}
				isLoading={isLoading}
				isError={isError}
			/>
			<CourseInformation
				courseId={courseId as string}
				name={course?.name}
				price={course?.price}
				summary={course?.summary}
				duration={course?.duration}
				difficulty={course?.difficulty}
				ratingsAverage={course?.ratingsAverage}
				ratingsQuantity={course?.ratingsQuantity}
				instructors={course?.instructors}
				image={course?.imageCover}
				paid={course?.paid as boolean}
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
						duration={course?.duration}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseCategories
						categories={course?.categories}
						isLoading={isLoading}
						isError={isError}
					/>
					<CoursePrerequisitesAndSkills
						prerequisites={course?.prerequisites}
						skills={course?.skills}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseContents isLoading={isLoading} isError={isError} />
					<CourseDescription
						description={course?.description}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseInstructors
						instructors={course?.instructors}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseReviews
						courseId={courseId as string}
						reviews={course?.reviews as Review[]}
						ratingsAverage={course?.ratingsAverage}
						ratingsQuantity={course?.ratingsQuantity}
					/>
					<CourseSelection
						heading="See Some Similar Courses"
						headingAlignment="left"
						headingAnimated={false}
						variant="white"
						query={{
							url: "/courses",
							config: {
								params: {
									categories: course?.categories, // TODO: Fix this, need to search for multiple values in the categories array
									id: { $ne: courseId },
								},
							},
						}}
					/>
				</Container>
			</Box>
			<Footer />
		</AnimatedPage>
	);
};

export default CourseCatalogPage;
