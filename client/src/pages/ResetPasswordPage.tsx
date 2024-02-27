import NavigationGuard from "../components/Navigation/NavigationGuard";
import AnimatedPage from "./AnimatedPage";
import ResetPasswordForm from "../components/ResetPasswordPage/ResetPasswordForm";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";

const ResetPasswordPage = () => {
	return (
		<NavigationGuard guardWhileSignedIn>
			<AnimatedPage>
				<PageWrapper centered>
					<ResetPasswordForm />
				</PageWrapper>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default ResetPasswordPage;
