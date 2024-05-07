import AnimatedPage from "./AnimatedPage";
import CallToAction from "../components/UI/PageLayout/CallToAction";
import Footer from "../components/Footer/Footer";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import InformationSection from "../components/UI/PageLayout/InformationSection";
import photo from "../assets/images/shot-data-center-multiple-rows-260nw-1394052911.png";

const CareersPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="Join Our Mission Today!"
				description="We aim to make education accessible to everyone, everywhere."
				buttonText="Become an Instructor"
				buttonLink="/become-an-instructor"
				buttonArrow
				// secondButtonText="Jobs at Learnly"
				// secondButtonLink="/job-openings"
				// secondButtonArrow
			/>
			<InformationSection
				variant="grey"
				cardsContent={[
					{
						title: "Build Your Career with Learnly",
						description:
							"Opportunities for growth and development are endless at Learnly. You can build your career and make a difference in the lives of others.",
						image: photo,
					},
					{
						title: "Connect with a Global Community of Learners",
						description:
							"Join a diverse community of learners and instructors from around the world. Share your knowledge and learn from others.",
						image: photo,
					},
					{
						title: "Your Success is Our Success",
						description:
							"We are committed to helping you succeed. Our platform is designed to help you reach your goals and achieve your dreams.",
						image: photo,
					},
				]}
			/>
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
