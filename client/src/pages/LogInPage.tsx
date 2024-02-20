import { Box } from "@mui/material";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import AnimatedPage from "./AnimatedPage";
import LogInForm from "../components/LogInPage/LogInForm";
import Footer from "../components/Footer/Footer";

const LogInPage = () => {
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
					<LogInForm />
				</Box>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default LogInPage;
