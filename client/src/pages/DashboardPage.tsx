import NavigationGuard from "../components/Navigation/NavigationGuard";
import Box from "@mui/material/Box";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import { Container } from "@mui/material";
import SectionHeader from "../components/UI/SectionHeader";
import SectionWrapper from "../components/UI/SectionWrapper";
import CourseSelection from "../components/UI/Courses/CourseSelection";
import Courses from "../components/UI/Courses/Courses";

const DashboardPage = () => {
	return (
		// <NavigationGuard>
		<AnimatedPage>
			<Box
				sx={{
					minHeight: "75vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "space-between",
					backgroundColor: "white",
					mt: window.innerWidth > 600 ? 8 : 7,
				}}>
				<Container maxWidth="lg">
					<SectionWrapper>
						<SectionHeader
							heading="Where You Left Off"
							headingAlignment="left"
							variant="h3"
							sx={{
								pb: 1,
								borderBottom: "1px solid #e0e0e0",
							}}
						/>
						<CourseSelection
							heading="Your Teaching"
							headingAlignment="left"
							headingAnimated={false}
							cardsAnimated={false}
							variant="white"
							query={{
								url: "/courses",
							}}
						/>
						<CourseSelection
							heading="Your Learning"
							headingAlignment="left"
							headingAnimated={false}
							cardsAnimated={false}
							variant="white"
							query={{
								url: "/courses",
							}}
						/>
					</SectionWrapper>
				</Container>
			</Box>
			<Footer />
		</AnimatedPage>
		// </NavigationGuard>
	);
};

export default DashboardPage;
