import { Box } from "@mui/material";
import AnimatedPage from "./AnimatedPage";
import SignUpForm from "../components/SignUpPage/SignUpForm";
import Footer from "../components/Footer/Footer";
import NavigationGuard from "../components/Navigation/NavigationGuard";

const SignUpPage = () => {
	return (
		<NavigationGuard guardWhileSignedIn>
			<AnimatedPage>
				<Box
					sx={{
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						pb: 5,
						mt: window.innerWidth > 600 ? 8 : 7,
						px: window.innerWidth > 600 ? 4 : 2,
						backgroundColor: "white",
					}}>
					<SignUpForm />
				</Box>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default SignUpPage;
