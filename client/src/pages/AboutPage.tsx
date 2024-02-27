import OurTeam from "../components/AboutPage/OurTeam";
import ContactUs from "../components/AboutPage/ContactUs";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import InformationSection from "../components/UI/PageLayout/InformationSection";

const AboutPage = () => {
	const scrollToContact = () => {
		const contactUsElement = document.getElementById("contact-us");

		if (contactUsElement) {
			contactUsElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<AnimatedPage>
			<HomeSection
				title="Learn About Learnly!"
				description="Read about our team, our mission, and our vision."
				buttonText="Get in Touch with Us"
				buttonOnClick={scrollToContact}
			/>
			<InformationSection variant="white" />
			<OurTeam />
			<ContactUs />
			<Footer />
		</AnimatedPage>
	);
};

export default AboutPage;
