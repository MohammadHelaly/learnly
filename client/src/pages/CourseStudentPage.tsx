import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import CourseStudentContents from "../components/CourseStudentDashboardPage/CourseStudentContent";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import CourseDescription from "../components/CourseCatalogPage/CourseDescription";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CourseReviews from "../components/CourseCatalogPage/CourseReviews";
import CourseHighlights from "../components/CourseCatalogPage/CourseHighlights";
import CourseCategories from "../components/UI/Courses/CourseCategories";
import { Typography } from "@mui/material";
import CourseNavigationGuard from "../components/CourseStudentDashboardPage/CourseNavigationGuard";
import ReviewForm from "../components/CourseStudentDashboardPage/ReviewForm";
function CourseStudentPage() {
	const { courseId } = useParams();
	const [value, setValue] = useState("0");
	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
	};

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === (courseId as string)
	);

	const {
		data, //: course,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});
	const course = data ?? dummyCourse;
	return (
		<CourseNavigationGuard courseId={courseId}>
			<SectionWrapper>
				<PageWrapper>
					<SectionHeader
						heading={course?.name}
						headingAlignment="center"
						sx={{ color: "purple", padding: 0, margin: "1rem" }}
					/>
					<CourseStudentContents
						courseName={course?.name}
						sections={course?.sections}
						isLoading={isLoading}
						isError={isError}
					/>
					<SectionWrapper>
						<TabContext value={value}>
							<Box
								sx={{
									borderBottom: 1,
									borderColor: "divider",
								}}
							>
								<TabList
									onChange={handleChange}
									aria-label="Dashboard Tabs"
									centered={window.innerWidth < 600}
								>
									<Tab
										label="Course Information"
										value="0"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
									<Tab
										label="Course Reviews"
										value="1"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
									<Tab
										label="Annoucements"
										value="2"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
								</TabList>
							</Box>
							<TabPanel value="0" sx={{ p: 0, m: 0 }}>
								<Container maxWidth="lg">
									<CourseHighlights
										duration={course?.duration}
										isLoading={isLoading}
										isError={isError}
									/>
									<CourseCategories
										categories={course?.categories}
										isLoading={isLoading}
										isError={isError}
									/>
									<CourseDescription
										description={course?.description}
										isLoading={isLoading}
										isError={isError}
									/>
								</Container>
							</TabPanel>
							<TabPanel value="1" sx={{ p: 0, m: 0 }}>
								<Container
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<ReviewForm />
								</Container>
								<Container>
									<CourseReviews
										id={courseId as string}
										reviews={course?.reviews as Review[]}
										ratingsAverage={course?.ratingsAverage}
										ratingsQuantity={
											course?.ratingsQuantity
										}
									/>
								</Container>
							</TabPanel>
							<TabPanel value="2" sx={{ p: 0, m: 0 }}></TabPanel>
						</TabContext>
					</SectionWrapper>
				</PageWrapper>
				<Footer />
			</SectionWrapper>
		</CourseNavigationGuard>
	);
}

export default CourseStudentPage;
