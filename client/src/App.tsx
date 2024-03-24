import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { AnimatePresence } from "framer-motion";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import AuthContext from "./store/auth-context";
import ScrollToTop from "./pages/ScrollToTop";
import Background from "./components/Background/Background";
import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CatalogPage from "./pages/CatalogPage";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import ChannelPage from "./pages/ChannelPage";
import CourseCatalogReviewPage from "./pages/CourseCatalogReviewPage";
import CareersPage from "./pages/CareersPage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CourseInstructorDashboardPage from "./pages/CourseInstructorDashboardPage";
import NewsletterPage from "./pages/NewsletterPage";
import "./App.css";

function App() {
	const authContext = useContext(AuthContext);

	const {
		data: receivedUser,
		refetch,
		isError,
		isLoading, // TODO: Look into using React Query to manage loading and error states
	} = useQuery({
		queryKey: ["authenticateMe"],
		queryFn: async () => await api.get("/users/authenticateMe"),
		select: (response) => response.data.data.user,
		enabled: false,
	});

	useEffect(() => {
		const storedUser = localStorage.getItem("user"); // TODO: Look into using React Query to manage loading state

		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			authContext.login(parsedUser);
			return;
		}

		refetch();
		if (receivedUser) authContext.login(receivedUser);
	}, [receivedUser, refetch]);

	const theme = createTheme({
		palette: {
			primary: {
				// main: "#ff0067",
				// main: "#ff71e1",
				main: "#9c27b0",
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
						<Route
							path="/forgot-password"
							element={<ForgotPasswordPage />}
						/>
						<Route // Not reacheable from the app, only from the email link
							path="/reset-password/:passwordResetToken"
							element={<ResetPasswordPage />}
						/>
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route
							path="/dashboard/learn/courses/:courseId"
							element={<LandingPage />}
						/>
						<Route
							path="/dashboard/teach/courses/create"
							element={<CreateCoursePage />}
						/>
						<Route
							path="/dashboard/teach/courses/:courseId"
							element={<CourseInstructorDashboardPage />}
						/>
						<Route
							path="/users/account"
							element={<LandingPage />}
						/>
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
						<Route path="/channels" element={<LandingPage />} />
						<Route
							path="/channels/:channelId"
							element={<ChannelPage />}
						/>
						<Route path="/careers" element={<CareersPage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/help" element={<LandingPage />} />
						<Route
							path="/newsletter"
							element={<NewsletterPage />}
						/>
						<Route path="/legal" element={<LandingPage />} />
						<Route path="*" element={<LandingPage />} />
					</Routes>
				</AnimatePresence>
			</Box>
		</ThemeProvider>
	);
}

export default App;
