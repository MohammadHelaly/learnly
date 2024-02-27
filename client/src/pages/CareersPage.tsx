import AnimatedPage from "./AnimatedPage";
import CallToAction from "../components/UI/PageLayout/CallToAction";
import Footer from "../components/Footer/Footer";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import InformationSection from "../components/UI/PageLayout/InformationSection";

const CareersPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="Join Our Mission Today!"
				description="We aim to make education accessible to everyone, everywhere."
				buttonText="Become an Instructor"
				buttonLink="/become-an-instructor"
			/>
			<InformationSection variant="grey" />
			<CallToAction
				question="Have something to share?"
				answer="Start teaching with Learnly today!"
				callToAction="Get Started Now"
				redirectTo="/become-an-instructor"
			/>
			<Footer />
		</AnimatedPage>
	);
};

export default CareersPage;
