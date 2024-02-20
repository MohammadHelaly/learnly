import HomeSection from "../components/LandingPage/HomeSection";
import CourseSelection from "../components/UI/Courses/CourseSelection";
import InformationSection from "../components/LandingPage/InformationSection";
import CallToAction from "../components/UI/CallToAction";
import TestimonialSection from "../components/LandingPage/TestimonialSection/TestimonialSection";
import Footer from "../components/Footer/Footer";
import AnimatedPage from "./AnimatedPage";

const LandingPage = () => {
	return (
		<AnimatedPage>
			<HomeSection />
			<CourseSelection
				heading="Check Out our Most Popular Courses"
				headingAlignment="center"
				headingAnimated={true}
				cardsAnimated={true}
				variant="grey"
				query={{
					url: "/courses",
				}}
			/>
			<InformationSection />
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
