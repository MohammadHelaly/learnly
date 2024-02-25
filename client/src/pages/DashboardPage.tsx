import React, { useState } from "react";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import { Container } from "@mui/material";
import SectionHeader from "../components/UI/SectionHeader";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageWrapper from "../components/UI/PageWrapper";
import StudentDashboard from "../components/DashboardPage/StudentDashboard";
import InstructorDashboard from "../components/DashboardPage/InstructorDashboard";

const DashboardPage = () => {
	const [value, setValue] = useState("0");

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
	};

	return (
		// <NavigationGuard>
		<AnimatedPage>
			<PageWrapper>
				<Container maxWidth="lg">
					<SectionWrapper>
						<SectionHeader
							heading="Where You Left Off"
							headingAlignment="left"
							variant="h4"
						/>
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
										label="Your Learning"
										value="0"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
									<Tab
										label="Your Teaching"
										value="1"
										sx={{
											fontSize: "1.2rem",
											fontWeight: 400,
										}}
									/>
								</TabList>
							</Box>
							<TabPanel value="0" sx={{ p: 0, m: 0 }}>
								<StudentDashboard />
							</TabPanel>
							<TabPanel value="1" sx={{ p: 0, m: 0 }}>
								<InstructorDashboard />
							</TabPanel>
						</TabContext>
					</SectionWrapper>
				</Container>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
		// </NavigationGuard>
	);
};

export default DashboardPage;
