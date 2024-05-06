import { Stack } from "@mui/material";
import AnimatedPage from "./AnimatedPage";
import NewsletterForm from "../components/NewsletterPage/NewsletterForm";
import Footer from "../components/Footer/Footer";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import FormContainer from "../components/UI/PageLayout/FormContainer";

const NewsletterPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="The Learnly Newsletter"
				description="Subscribe to our newsletter to get the latest updates, news, and more."
			/>
			<PageWrapper>
				<FormContainer>
					<Stack spacing={6}>
						<NewsletterForm variant="subscribe" />
						<NewsletterForm variant="unsubscribe" />
					</Stack>
				</FormContainer>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default NewsletterPage;
