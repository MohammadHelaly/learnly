import HomeSection from "../components/UI/PageLayout/HomeSection";
import CourseSelection from "../components/UI/Courses/Catalog/CourseSelection";
import InformationSection from "../components/UI/PageLayout/InformationSection";
import CallToAction from "../components/UI/PageLayout/CallToAction";
import TestimonialSection from "../components/LandingPage/TestimonialSection/TestimonialSection";
import Footer from "../components/Footer/Footer";
import AnimatedPage from "./AnimatedPage";
import photo from "../assets/images/shot-data-center-multiple-rows-260nw-1394052911.png";

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
			<InformationSection
				variant="transparent"
				cardsContent={[
					{
						title: "Level Up with Lifetime Access to Courses",
						description:
							"Our courses are designed to help you learn and grow at your own pace. Gain lifetime access to all course materials and content.",
						image: photo,
					},
					{
						title: "Get in Touch with World Class Instructors",
						description:
							"Learn from the best! Our instructors are experts in their fields and are here to help you succeed.",
						image: photo,
					},
					{
						title: "Explore a Vast Array of Specializations",
						description:
							"Choose from a wide range of courses and specializations. Whether you're a beginner or an expert, we have something for everyone.",
						image: photo,
					},
				]}
			/>
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
