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
import { wrap } from "module";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import CourseNavigationGuard from "../components/Navigation/CourseNavigationGuard";

function CourseEnrollmentPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const authContext = useContext(AuthContext);
	const popupFunction = () => {
		navigate("/dashboard");
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
		mutate: mutateUser,
		isError: isMutateSectionError,
		isPending: isPendingUser,
		isSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.post(`/courseEnrollments/${courseId}`, {
				user: data,
			});
		},
		onSuccess: (response) => {
			if (authContext.user && courseId) {
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
				guardWhileEnrolled>
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
										sx={{ width: "100%" }}
										justifyContent="space-between"
										spacing={2}>
										{" "}
										<Stack
											width={
												window.innerWidth > 600
													? "70%"
													: "100%"
											}>
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
												}}>
												Course
											</Typography>
											<Stack
												width="100%"
												direction={{
													xs: "column",
													md: "row",
												}}
												justifyContent="space-between">
												<Stack
													width="100%"
													direction={{
														xs: "column",
														md: "row",
													}}
													spacing={3}>
													{/* <Box> */}
													<CardMedia
														component="img"
														sx={{
															// width:
															// 	window.innerWidth >
															// 	600
															// 		? "100%"
															// 		: "45vw",
															// height:
															// 	window.innerWidth >
															// 	600
															// 		? 170
															// 		: 110,
															objectFit: "cover",
															width:
																window.innerWidth <
																600
																	? "100%"
																	: "60%",
															// : "92.5vw",
															height:
																window.innerWidth >
																600
																	? 300
																	: 200,
															borderRadius:
																// window.innerWidth >
																// 600
																// 	?
																"20px",
															// : "0",
														}}
														image={
															course?.imageCover
																.url
														}
													/>
													{/* </Box> */}

													<Stack
														direction="column"
														spacing={1}>
														<Typography
															variant="h6"
															fontWeight="bold">
															{course?.name}
														</Typography>
														<Typography
															fontWeight="light"
															variant="body2">
															By{" "}
															{
																course
																	?.instructors[0]
																	.name
															}
														</Typography>
														<Stack
															direction="row"
															spacing={1}
															alignItems="center">
															<Rating
																name="read-only"
																value={
																	course?.ratingsAverage
																}
																readOnly
																precision={0.25}
																size="small"
																sx={{
																	color: "secondary.main",
																	// color: "black",
																}}
															/>
															<Typography
																variant="body2"
																color="text.secondary"
																sx={{
																	fontWeight: 400,
																}}>
																{"("}
																{
																	course?.ratingsQuantity
																}
																{")"}
															</Typography>
														</Stack>
														<Typography
															fontWeight="1"
															variant="body2">
															{course.duration}{" "}
															Hours
														</Typography>
														<Typography
															fontWeight="1"
															variant="body2">
															{course.difficulty}
														</Typography>
													</Stack>
												</Stack>
												<Box>
													<Typography>
														{course.price === 0
															? "Free"
															: `E£${course.price}`}
													</Typography>
												</Box>
											</Stack>
										</Stack>
										<Stack
											sx={{
												borderBottom: {
													xs: "0px",
													md: "1px solid #e0e0e0",
												},
											}}
											width={
												window.innerWidth > 600
													? "25%"
													: "100%"
											}
											direction="column"
											justifyContent="space-between">
											<Stack width="100%">
												<Typography>Total:</Typography>
												<Typography
													variant="h4"
													fontWeight="light bold"
													sx={{
														color: "secondary.main",
														pt: 0,

														mb:
															window.innerWidth <
															600
																? 2
																: 4,
													}}>
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
												fullWidth
												disabled={isPendingUser}
												sx={{
													// mb: 3,
													mb: 2,
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
													if (authContext.user) {
														mutateUser(
															authContext.user.id
														);
													}
												}}>
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
					<Popup
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
