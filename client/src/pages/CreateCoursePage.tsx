import AnimatedPage from "./AnimatedPage";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import CreateCourseForm from "../components/CreateCoursePage/CreateCourseForm";
import Footer from "../components/Footer/Footer";
import HomeSection from "../components/UI/PageLayout/HomeSection";

const CreateCoursePage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="Create a Course"
				description="Create a course and share your knowledge."
			/>
			<PageWrapper>
				<CreateCourseForm />
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default CreateCoursePage;
