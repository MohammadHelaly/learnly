import AnimatedPage from "./AnimatedPage";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import InformationSection from "../components/UI/PageLayout/InformationSection";
import CallToAction from "../components/UI/PageLayout/CallToAction";
import Footer from "../components/Footer/Footer";
import photo from "../assets/images/shot-data-center-multiple-rows-260nw-1394052911.png";

const BecomeAnInstructorPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="Share Your Knowledge with the World!"
				description="Become an instructor and teach what you love."
				buttonText="Make a Difference"
				buttonLink="/dashboard/teach/courses/create"
				buttonArrow
			/>
			<InformationSection
				variant="white"
				cardsContent={[
					{
						title: "Create a Course",
						description:
							"Share your expertise with the world. Create a course and reach millions of learners. Our Dashboard makes it easy to get started, customize your course, and publish it.",
						image: photo,
					},
					{
						title: "Interact with Students",
						description:
							"Engage with students and answer their questions. Our platform allows you to interact with learners, provide feedback, and support their learning journey.",
						image: photo,
					},
					{
						title: "Build Your Brand",
						description:
							"Build your brand and credibility. Add an endearing bio and upload a nice photo of yourself to make your profile stand out!",
						image: photo,
					},
				]}
			/>
			<CallToAction
				question="Are you ready to make your mark?"
				answer="Prove your potential. Share your knowledge."
				callToAction="Make a Difference"
				redirectTo="/dashboard/teach/courses/create"
			/>
			<Footer />
		</AnimatedPage>
	);
};

export default BecomeAnInstructorPage;
