import CareersSection from "../components/CareersPage/CareersSection";
import CareersInformationSection from "../components/CareersPage/CareersInformationSection";
import AnimatedPage from "./AnimatedPage";
import CallToAction from "../components/Miscellaneous/CallToAction";
import Footer from "../components/Footer/Footer";

const CareersPage = () => {
	return (
		<AnimatedPage>
			<CareersSection />
			<CareersInformationSection />
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
