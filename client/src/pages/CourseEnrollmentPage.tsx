import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import api from "../api";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import FormContainer from "../components/UI/PageLayout/FormContainer";
import CourseSelection from "../components/UI/Courses/Catalog/CourseSelection";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CardMedia from "@mui/material/CardMedia";
import {
	Button,
	Container,
	Typography,
	Stack,
	Rating,
	Box,
} from "@mui/material";
import Popup from "../components/Popup/Popup";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import CourseNavigationGuard from "../components/Navigation/CourseNavigationGuard";
import EnrollmentCourseCard from "../components/UI/Courses/Catalog/EnrollmentCourseCard";
import { Check } from "@mui/icons-material";
import { useState } from "react";
import DialogForm from "../components/Popup/DialogForm";

function CourseEnrollmentPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const authContext = useContext(AuthContext);
	const popupFunction = () => {
		navigate("/dashboard");
	};

	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === (courseId as string)
	);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});
	const course = data ?? dummyCourse;

	const {
		mutate,
		isError: isMutateError,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.post(`/courses/${courseId}/enrollments`);
		},
		onSuccess: (response) => {
			if (authContext.user && courseId) {
				// Look into this
				authContext.user.coursesEnrolled = [
					...authContext.user.coursesEnrolled,
					courseId,
				];
			}
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	return (
		<NavigationGuard>
			<CourseNavigationGuard
				courseId={courseId}
				role="student"
				guardWhileEnrolled
			>
				<AnimatedPage>
					<PageWrapper>
						{!isLoading ? (
							<SectionWrapper>
								<Container>
									<SectionHeader
										heading="Enrollment"
										headingAlignment="left"
										keepHeadingAlignmentOnSmallScreens
										headingAnimated={false}
										sx={{
											mb: 0,
											pb: 4,
										}}
									/>
									<Stack
										display="flex"
										flexDirection={{
											xs: "column",
											md: "row",
										}}
										width="100%"
										justifyContent="space-between"
										spacing={4}
									>
										<Stack
											width={
												window.innerWidth > 600
													? "70%"
													: "100%"
											}
										>
											<Typography
												variant="body1"
												fontWeight="light bold"
												sx={{
													mb: 2,
													borderBottom:
														"1px solid #e0e0e0",
													paddingBottom: 1,
													width:
														window.innerWidth > 600
															? "100%"
															: "92vw",
												}}
											>
												Course
											</Typography>
											<EnrollmentCourseCard {...course} />
										</Stack>
										<Stack
											sx={{
												mt:
													window.innerWidth > 600
														? "0px !important"
														: 4,
												borderBottom: {
													md: "0px",
													xs: "1px solid #e0e0e0",
												},
											}}
											width={
												window.innerWidth > 600
													? "25%"
													: "100%"
											}
											direction="column"
											justifyContent="space-between"
										>
											<Stack width="100%">
												<Typography
													variant="body1"
													fontWeight="semibold"
													sx={{
														mb: 2,
														paddingBottom: 1,
													}}
												>
													Total
												</Typography>
												<Typography
													variant="h4"
													fontWeight="semibold"
													sx={{
														pt: 0,
														mb:
															window.innerWidth <
															600
																? 2
																: 4,
													}}
												>
													{course.price === 0
														? "Free"
														: `E£${course.price}`}
												</Typography>
											</Stack>
											<Button
												variant="contained"
												color="primary"
												size="large"
												disableElevation
												endIcon={<Check />}
												fullWidth
												disabled={isPending}
												sx={{
													// mb: 3,
													mb:
														window.innerWidth < 600
															? 2
															: 1.5,

													height: 50,
													fontSize: "1rem",
													backgroundColor:
														"secondary.main",
													color: "black",
													// border: "1px solid #00f3b6",
													"&:hover": {
														backgroundColor:
															"primary.main",
														color: "white",
														// backgroundColor: "transparent",
														// color: "#9c27b0",
														// border: "1px solid #9c27b0",
													},
												}}
												onClick={() => {
													handleOpenDialog();
												}}
											>
												{" "}
												Enroll Now
											</Button>
										</Stack>
									</Stack>
								</Container>
							</SectionWrapper>
						) : (
							<Typography>Loading...</Typography>
						)}
						<CourseSelection
							heading="See Some Similar Courses"
							headingAlignment="left"
							headingAnimated={false}
							variant="white"
							query={{
								url: "/courses",
								config: {
									params: {
										categories: { in: course?.categories }, // Look into adding $ here instead of in regex in the backend
										_id: { ne: courseId },
									},
								},
							}}
						/>
					</PageWrapper>
					<Footer />
					<DialogForm
						heading="Course Enrollment"
						content="Are you sure you want to enroll in this course?"
						openDialog={openDialog}
						closeDialog={handleCloseDialog}
						dialogFunction={mutate}
					/>
					<Popup
						heading="Success!"
						content="Course enrolled successfully!"
						openPopup={isSuccess}
						buttonText="Great!"
						popupFunction={popupFunction}
					/>
				</AnimatedPage>
			</CourseNavigationGuard>
		</NavigationGuard>
	);
}

export default CourseEnrollmentPage;
