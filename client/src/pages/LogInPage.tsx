import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import AnimatedPage from "./AnimatedPage";
import LogInForm from "../components/LogInPage/LogInForm";
import Footer from "../components/Footer/Footer";

const LogInPage = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (authContext.isLoggedIn) {
			navigate("/dashboard");
		}
	}, [authContext, navigate]);

	return (
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
	);
};

export default LogInPage;
