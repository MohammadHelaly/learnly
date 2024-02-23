import AnimatedPage from "./AnimatedPage";
import SignUpForm from "../components/SignUpPage/SignUpForm";
import Footer from "../components/Footer/Footer";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import PageWrapper from "../components/UI/PageWrapper";

const SignUpPage = () => {
	return (
		<NavigationGuard guardWhileSignedIn>
			<AnimatedPage>
				<PageWrapper centered>
					<SignUpForm />
				</PageWrapper>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default SignUpPage;
