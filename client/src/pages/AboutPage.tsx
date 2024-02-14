import AboutSection from "../components/AboutPage/AboutSection";
import AboutInformationSection from "../components/AboutPage/AboutInformationSection";
import OurTeam from "../components/AboutPage/OurTeam";
import ContactUs from "../components/AboutPage/ContactUs";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";

const AboutPage = () => {
	return (
		<AnimatedPage>
			<AboutSection />
			<AboutInformationSection />
			<OurTeam />
			<ContactUs />
			<Footer />
		</AnimatedPage>
	);
};

export default AboutPage;
