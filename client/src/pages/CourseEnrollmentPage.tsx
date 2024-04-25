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
		<AnimatedPage>
			<PageWrapper>
				{!isLoading ? (
					<SectionWrapper>
						<Container>
							<Stack display="flex" flexDirection="row">
								<Container sx={{ width: "80%" }}>
									<Stack>
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

										<Typography
											variant="body1"
											fontWeight="light bold"
											sx={{
												mb: 2,
												borderBottom:
													"1px solid #e0e0e0",
												paddingBottom: 1,
											}}
										>
											Course
										</Typography>
										<Stack
											direction="row"
											justifyContent="space-between"
										>
											<Stack direction="row" spacing={3}>
												<img
													src={course?.imageCover.url}
													alt={course?.name}
												/>
												<Stack direction="column">
													<Typography fontWeight="bold">
														{course?.name}
													</Typography>
													<Typography
														fontWeight="light bold"
														variant="body2"
													>
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
													>
														<Typography
															color="secondary.main"
															sx={{ pt: 0.3 }}
														>
															{
																course?.ratingsAverage
															}
														</Typography>
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
																pt: 0.6,
															}}
														/>
													</Stack>
													<Typography
														fontWeight="1"
														variant="body2"
													>
														{course.duration} Hours
													</Typography>
													<Typography
														fontWeight="1"
														variant="body2"
													>
														{course.difficulty}
													</Typography>
												</Stack>
											</Stack>
											<Typography>
												E£{course.price}
											</Typography>
										</Stack>
									</Stack>
								</Container>

								<Box
									sx={{
										borderBottom: "1px solid #e0e0e0",
										pt: 4,
										mt: 2,
									}}
								>
									<Typography sx={{ pt: 4 }}>
										Total:
									</Typography>
									<Typography
										sx={{ pt: 1, pb: 4, mb: 4 }}
										variant="h4"
										fontWeight="light bold"
									>
										E£{course.price}
									</Typography>
									<Button
										variant="contained"
										color="primary"
										size="large"
										disableElevation
										disabled={isPendingUser}
										sx={{
											width: "100%",
											mt: 2,
										}}
										onClick={() => {
											if (authContext.user) {
												mutateUser(authContext.user.id);
											}
										}}
									>
										Enroll in Course
									</Button>
								</Box>
							</Stack>
						</Container>
					</SectionWrapper>
				) : (
					<Typography>isLoading</Typography>
				)}
				<Container>
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
				</Container>
			</PageWrapper>

			<Footer />
			<Popup
				content="Course enrolled successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</AnimatedPage>
	);
}

export default CourseEnrollmentPage;
