import AnimatedPage from "./AnimatedPage";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import InformationSection from "../components/UI/PageLayout/InformationSection";
import CallToAction from "../components/UI/PageLayout/CallToAction";
import Footer from "../components/Footer/Footer";
import createACoursePhoto from "../assets/images/create-a-course.png";
import interactWithStudentsPhoto from "../assets/images/interact-with-students.png";
import buildYourBrandPhoto from "../assets/images/build-your-brand.png";

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
						image: createACoursePhoto,
					},
					{
						title: "Interact with Students",
						description:
							"Engage with students and answer their questions. Our platform allows you to interact with learners, provide feedback, and support their learning journey.",
						image: interactWithStudentsPhoto,
					},
					{
						title: "Build Your Brand",
						description:
							"Build your brand and credibility. Add an endearing bio and upload a nice photo of yourself to make your profile stand out!",
						image: buildYourBrandPhoto,
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
