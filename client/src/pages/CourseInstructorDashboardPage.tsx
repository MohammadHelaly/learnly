import { Box, Stack, Container, Tab } from "@mui/material";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import CourseImage from "../components/UI/Courses/Catalog/CourseImage";
import CourseInformationContent from "../components/CourseCatalogPage/CourseInformationContent";
import InstructorCourseEnrollmentPrompt from "../components/CourseInstructorDashboardPage/InstructorCourseEnrollmentPrompt";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import UpdateCourseContent from "../components/CourseInstructorDashboardPage/UpdateCourseContent";
import UpdateCourseInformation from "../components/CourseInstructorDashboardPage/UpdateCourseInformation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

const CourseInstructorDashboardPage = () => {
	const [value, setValue] = useState("0");

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
	};

	const { courseId } = useParams();

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === (courseId as string)
	);

	const {
		data, //: course,
		isLoading, //isError
		isError: isGetError,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});

	const course = data ?? dummyCourse;
	return (
		<AnimatedPage>
			<SectionWrapper
				sx={{
					backgroundColor: "#f5f5f5",
					mt: window.innerWidth > 600 ? 8 : 7,
				}}>
				<Container maxWidth="lg">
					<Stack
						direction={
							window.innerWidth > 600 ? "row" : "column-reverse"
						}
						gap={window.innerWidth > 600 ? 4 : 0}
						alignItems="center"
						justifyContent="center"
						sx={{
							pb: 10,
							pt: window.innerWidth > 600 ? 10 : 0,
						}}>
						{
							// isError ? (
							// 	<ErrorWarning />
							// ) :
							<>
								<Container
									maxWidth="sm"
									sx={{
										px: "0px !important",
										justifyContent:
											window.innerWidth > 600
												? "left"
												: "center",
										flexDirection: "column",
										display: "flex",
										gap: 2,
									}}>
									<CourseInformationContent
										name={course?.name}
										summary={course?.summary}
										duration={course?.duration}
										difficulty={course?.difficulty}
										ratingsAverage={course?.ratingsAverage}
										ratingsQuantity={
											course?.ratingsQuantity
										}
										instructors={course?.instructors}
										isLoading={isLoading}
									/>
									<InstructorCourseEnrollmentPrompt
										sx={{
											display:
												window.innerWidth > 600
													? "none"
													: "flex",
										}}
										id={course?.id}
										isLoading={isLoading}
										paid={course?.paid}
										price={course?.price}
									/>
								</Container>
								<Container
									maxWidth="sm"
									sx={{
										px: "0px !important",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										pb: window.innerWidth > 600 ? 0 : 4,
									}}>
									<CourseImage
										imageCover={course?.imageCover}
										name={course?.name}
										isLoading={isLoading}
									/>
									<InstructorCourseEnrollmentPrompt
										sx={{
											display:
												window.innerWidth > 600
													? "flex"
													: "none",
										}}
										id={course?.id}
										isLoading={isLoading}
										paid={course?.paid}
										price={course?.price}
									/>
								</Container>
							</>
						}
					</Stack>
				</Container>
			</SectionWrapper>
			<PageWrapper sx={{ mt: 0, pb: 0 }}>
				<Container maxWidth="lg">
					<SectionWrapper>
						<TabContext value={value}>
							<Box
								sx={{
									borderBottom: 1,
									borderColor: "divider",
								}}>
								<TabList
									onChange={handleChange}
									aria-label="Dashboard Tabs"
									centered={window.innerWidth < 600}>
									<Tab
										label="Course Information"
										value="0"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
									<Tab
										label="Course Content"
										value="1"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
								</TabList>
							</Box>
							<TabPanel value="0" sx={{ p: 0, m: 0 }}>
								<UpdateCourseInformation courseId={courseId} />
							</TabPanel>
							<TabPanel value="1" sx={{ p: 0, m: 0 }}>
								<UpdateCourseContent courseId={courseId} />
							</TabPanel>
						</TabContext>
					</SectionWrapper>
				</Container>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default CourseInstructorDashboardPage;
