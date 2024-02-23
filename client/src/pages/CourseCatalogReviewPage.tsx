import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import CourseReviewsSection from "../components/CourseCatalogReviewPage/CourseReviewsSection";

const CourseCatalogReviewPage = () => {
	const { courseId } = useParams();

	return (
		<AnimatedPage>
			<CourseReviewsSection courseId={courseId as string} />
			<Footer />
		</AnimatedPage>
	);
};

export default CourseCatalogReviewPage;
