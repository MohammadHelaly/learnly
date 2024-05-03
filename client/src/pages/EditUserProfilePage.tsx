import { Box, Container, Tab } from "@mui/material";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import UserProfile from "../components/EditUserProfilePage/UserProfile";
import AccountSettings from "../components/EditUserProfilePage/AccountSettings";

const EditUserProfilePage = () => {
	const [value, setValue] = useState("0");

	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
	};

	return (
		<NavigationGuard>
			<AnimatedPage>
				<PageWrapper>
					<SectionWrapper
						sx={
							{
								// backgroundColor: "#f5f5f5",
								// mt: window.innerWidth > 600 ? 8 : 7,
							}
						}
					>
						<Container maxWidth="lg">
							<SectionHeader
								heading="Your Account"
								headingAlignment="left"
								variant="h4"
							/>
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
											label="Your Profile"
											value="0"
											sx={{
												fontSize: "1.2rem",
												fontWeight: 400,
											}}
										/>
										<Tab
											label="Account Settings"
											value="1"
											sx={{
												fontSize: "1.2rem",
												fontWeight: 400,
											}}
										/>
									</TabList>
								</Box>
								<TabPanel value="0" sx={{ p: 0, m: 0 }}>
									<PageWrapper sx={{ mt: 0 }}>
										<UserProfile />
									</PageWrapper>
								</TabPanel>
								<TabPanel value="1" sx={{ p: 0, m: 0 }}>
									<PageWrapper sx={{ mt: 0 }}>
										<AccountSettings />
									</PageWrapper>
								</TabPanel>
							</TabContext>
						</Container>
					</SectionWrapper>
				</PageWrapper>
				<Footer />
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default EditUserProfilePage;
