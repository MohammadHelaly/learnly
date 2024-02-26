import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseBanner from "../components/UI/Courses/Catalog/CourseBanner";
import CourseHighlights from "../components/CourseCatalogPage/CourseHighlights";
import CoursePrerequisitesAndSkills from "../components/CourseCatalogPage/CoursePrerequisitesAndSkills";
import CourseDescription from "../components/CourseCatalogPage/CourseDescription";
import CourseReviews from "../components/CourseCatalogPage/CourseReviews";
import CourseContents from "../components/UI/Courses/CourseContents";
import CourseInstructors from "../components/CourseCatalogPage/CourseInstructors";
import CourseInformation from "../components/CourseCatalogPage/CourseInformation";
import CourseCategories from "../components/CourseCatalogPage/CourseCategories";
import CourseSelection from "../components/UI/Courses/Catalog/CourseSelection";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import api from "../api";
import PageWrapper from "../components/UI/PageWrapper";

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
				id={courseId as string}
				name={course?.name}
				price={course?.price}
				isLoading={isLoading}
				isError={isError}
			/>
			<CourseInformation
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
					<CoursePrerequisitesAndSkills
						prerequisites={course?.prerequisites}
						skills={course?.skills}
						isLoading={isLoading}
						isError={isError}
					/>
					<CourseContents
						sections={course?.sections}
						isLoading={isLoading}
						isError={isError}
					/>
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
						id={courseId as string}
						reviews={course?.reviews as Review[]}
						ratingsAverage={course?.ratingsAverage}
						ratingsQuantity={course?.ratingsQuantity}
					/>
				</Container>
				<CourseSelection
					heading="See Some Similar Courses"
					headingAlignment="left"
					headingAnimated={false}
					variant="white"
					query={{
						url: "/courses",
						config: {
							params: {
								categories: { in: course?.categories }, // Look into adding $ here instead of in regex in the backend
								_id: { ne: courseId },
							},
						},
					}}
				/>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default CourseCatalogPage;
