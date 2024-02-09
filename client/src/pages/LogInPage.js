import { Box } from "@mui/material";
import AnimatedPage from "./AnimatedPage";
import LogInForm from "../components/LogInPage/LogInForm";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

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
					// alignItems: "left",
					alignItems: "center",
					justifyContent: "center",
					pb: 5,
					mt: window.innerWidth > 600 ? 8 : 7,
					px: window.innerWidth > 600 ? 4 : 2,
					// backgroundColor: "#f5f5f5",
					backgroundColor: "white",
				}}>
				<LogInForm />
			</Box>
			<Footer />
		</AnimatedPage>
	);
};

export default LogInPage;
