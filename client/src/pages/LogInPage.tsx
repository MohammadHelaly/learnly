import NavigationGuard from "../components/Navigation/NavigationGuard";
import AnimatedPage from "./AnimatedPage";
import LogInForm from "../components/LogInPage/LogInForm";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";

const LogInPage = () => {
	return (
		<NavigationGuard guardWhileSignedIn>
			<AnimatedPage>
				<PageWrapper centered>
					<LogInForm />
				</PageWrapper>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default LogInPage;
