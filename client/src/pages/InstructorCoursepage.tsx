import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseBanner from "../components/UI/Courses/Catalog/CourseBanner";
import CourseHighlights from "../components/CourseCatalogPage/CourseHighlights";
import CoursePrerequisitesAndSkills from "../components/CourseCatalogPage/CoursePrerequisitesAndSkills";
import CourseDescription from "../components/CourseCatalogPage/CourseDescription";
import CourseReviews from "../components/CourseCatalogPage/CourseReviews";
import CourseContents from "../components/UI/Courses/CourseContents";
import CourseInstructors from "../components/CourseCatalogPage/CourseInstructors";
import InstructorCourseInformation from "../components/InstructorCatalogPage/InstructorCourseInformation";
import CourseCategories from "../components/UI/Courses/CourseCategories";
import CourseSelection from "../components/UI/Courses/Catalog/CourseSelection";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import api from "../api";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import AddSection from "../components/InstructorCatalogPage/AddSection";
import InstructorCoursePrerequisites from "../components/InstructorCatalogPage/InstructorCoursePrerequisites";
import InstructorCourseSkills from "../components/InstructorCatalogPage/InstructorCourseSkills";
import InstructorCourseContents from "../components/InstructorCatalogPage/InstructorCourseContent";
import { Stack } from "@mui/material";
const InstructorCoursePage = () => {
	const { courseId } = useParams();
	console.log(courseId);
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
			{/* <CourseBanner
				id={courseId as string}
				name={course?.name}
				price={course?.price}
				isLoading={isLoading}
				isError={isError}
			/> */}
			<InstructorCourseInformation
				id={courseId as string}
				name={course?.name}
				price={course?.price}
				summary={course?.summary}
				duration={course?.duration}
				difficulty={course?.difficulty}
				ratingsAverage={course?.ratingsAverage}
				ratingsQuantity={course?.ratingsQuantity}
				instructors={course?.instructors}
				imageCover={course?.imageCover}
				paid={course?.paid as boolean}
				isLoading={isLoading}
				isError={isError}
			/>
			<PageWrapper sx={{ mt: 0, pb: 0 }}>
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
					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<InstructorCourseSkills />
						<InstructorCoursePrerequisites />
					</Stack>
					<InstructorCourseContents
						sections={course?.sections}
						isLoading={isLoading}
						isError={isError}
					/>
					<AddSection />
					<CourseDescription
						description={course?.description}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseReviews
						id={courseId as string}
						reviews={course?.reviews as Review[]}
						ratingsAverage={course?.ratingsAverage}
						ratingsQuantity={course?.ratingsQuantity}
					/>
				</Container>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default InstructorCoursePage;
