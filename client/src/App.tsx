import "./App.css";
import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import ApiInstance from "./api/ApiInstance";
import AuthContext from "./store/auth-context";
import ScrollToTop from "./pages/ScrollToTop";
import Background from "./components/Background/Background";
import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import CatalogPage from "./pages/CatalogPage";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import CourseCatalogReviewPage from "./pages/CourseCatalogReviewPage";
import CareersPage from "./pages/CareersPage";
import AboutPage from "./pages/AboutPage";

function App() {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");

		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			authContext.login(parsedUser);
		} else {
			ApiInstance.get("/users/authenticateMe")
				.then((response) => {
					const receivedUser = response.data.data.user;
					if (receivedUser !== null) {
						authContext.login(receivedUser);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	const theme = createTheme({
		palette: {
			primary: {
				// main: "#ff0067",
				// main: "#ff71e1",
				main: "#9c27b0",
				// main: "rgb(255, 0, 0)",
			},
			secondary: {
				main: "#00f3b6",
			},
		},
		typography: {
			fontFamily: "Outfit, Roboto, sans-serif",
			h1: {
				fontWeight: 500,
				letterSpacing: "0rem",
				textTransform: "none",
			},
			h2: {
				fontWeight: 500,
				letterSpacing: "0rem",
				textTransform: "none",
			},
			h3: {
				fontWeight: 500,
				letterSpacing: "0rem",
				textTransform: "none",
			},
			h4: {
				fontWeight: 400,
				letterSpacing: "0rem",
				textTransform: "none",
			},
			h5: {
				fontWeight: 300,
				letterSpacing: "0rem",
				textTransform: "none",
			},
			h6: {
				fontWeight: 300,
				letterSpacing: "0rem",
				textTransform: "none",
			},

			button: {
				textTransform: "none",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ minWidth: "100vw !important", overflowX: "hidden" }}>
				<ScrollToTop />
				<Background />
				<NavBar />
				<AnimatePresence mode="wait">
					<Routes
						key={useLocation().pathname}
						location={useLocation()}>
						<Route path="/" element={<LandingPage />} />
						<Route path="/log-in" element={<LogInPage />} />
						<Route path="/sign-up" element={<SignUpPage />} />
						<Route path="/dashboard" element={<LandingPage />} />
						<Route
							path="/dashboard/:courseId"
							element={<LandingPage />}
						/>
						<Route path="/account" element={<LandingPage />} />
						<Route
							path="/users/:userId"
							element={<LandingPage />}
						/>
						<Route path="/courses" element={<CatalogPage />} />
						<Route
							path="/courses/:courseId"
							element={<CourseCatalogPage />}
						/>
						<Route
							path="/courses/:courseId/reviews"
							element={<CourseCatalogReviewPage />}
						/>
						<Route path="/careers" element={<CareersPage />} />
						<Route path="/about" element={<AboutPage />} />
						{/* <Route
							path="/contact"
							element={<LandingPage />}
							exact
						/> */}
						<Route path="/help" element={<LandingPage />} />
						<Route path="/legal" element={<LandingPage />} />
						<Route path="*" element={<LandingPage />} />
					</Routes>
				</AnimatePresence>
			</Box>
		</ThemeProvider>
	);
}

export default App;
