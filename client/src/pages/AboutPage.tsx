import OurTeam from "../components/AboutPage/OurTeam/OurTeam";
import ContactUs from "../components/AboutPage/ContactUs";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import InformationSection from "../components/UI/PageLayout/InformationSection";
import photo from "../assets/images/shot-data-center-multiple-rows-260nw-1394052911.png";

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
				buttonArrow
			/>
			<InformationSection
				variant="white"
				cardsContent={[
					{
						title: "A Mission to Make Education Accessible",
						description:
							"Learnly was developed as a graduation project by 6 ambitious students from Alexandria University. It aims to make education accessible to everyone, everywhere.",
						image: photo,
					},
					{
						title: "We Value Lifelong Learning",
						description:
							"We believe that learning should be a lifelong journey. We hope to inspire and empower individuals to embark on the journey of developing their skills and achieving their goals.",
						image: photo,
					},
					{
						title: "The Learnly Difference",
						description:
							"Learnly helps students and instructors connect and engage in a meaningful way. Our platform is designed to make learning and teaching interactive, engaging, and fun.",
						image: photo,
					},
				]}
			/>
			<OurTeam />
			<ContactUs />
			<Footer />
		</AnimatedPage>
	);
};

export default AboutPage;
