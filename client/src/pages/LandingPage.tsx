import HomeSection from "../components/LandingPage/HomeSection";
import InformationSection from "../components/LandingPage/InformationSection";
import AnimatedPage from "./AnimatedPage";
import PopularCoursesPreview from "../components/LandingPage/PopularCoursesPreview";
import CallToAction from "../components/Miscellaneous/CallToAction";
import TestimonialSection from "../components/LandingPage/TestimonialSection/TestimonialSection";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
	return (
		<AnimatedPage>
			<HomeSection />
			<PopularCoursesPreview />
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
