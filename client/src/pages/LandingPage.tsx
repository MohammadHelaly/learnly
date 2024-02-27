import HomeSection from "../components/UI/PageLayout/HomeSection";
import CourseSelection from "../components/UI/Courses/Catalog/CourseSelection";
import InformationSection from "../components/UI/PageLayout/InformationSection";
import CallToAction from "../components/UI/PageLayout/CallToAction";
import TestimonialSection from "../components/LandingPage/TestimonialSection/TestimonialSection";
import Footer from "../components/Footer/Footer";
import AnimatedPage from "./AnimatedPage";

const LandingPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="Learn. Teach. Grow."
				description="Learnly allows you to learn and teach anywhere, anytime. Develop your skills and share your knowledge with others."
				buttonText="Start Learning"
				buttonLink="/courses"
				secondButtonText="Start Teaching"
				secondButtonLink="/careers"
				landing
			/>
			<CourseSelection
				heading="Check Out Our Most Popular Courses"
				headingAlignment="center"
				headingAnimated={true}
				cardsAnimated={true}
				variant="grey"
				query={{
					url: "/courses",
				}}
			/>
			<InformationSection variant="transparent" />
			<TestimonialSection />
			<CallToAction
				question="Ready to start improving?"
				answer="Get started with Learnly today!"
				callToAction="Get Started Now"
				redirectTo="/courses"
			/>
			<Footer />
		</AnimatedPage>
	);
};

export default LandingPage;
