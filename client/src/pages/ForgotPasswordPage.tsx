import NavigationGuard from "../components/Navigation/NavigationGuard";
import AnimatedPage from "./AnimatedPage";
import ForgotPasswordForm from "../components/ForgotPasswordPage/ForgotPasswordForm";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";

const ForgotPasswordPage = () => {
	return (
		<NavigationGuard guardWhileSignedIn>
			<AnimatedPage>
				<PageWrapper centered>
					<ForgotPasswordForm />
				</PageWrapper>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default ForgotPasswordPage;
