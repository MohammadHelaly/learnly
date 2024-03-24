import { Box, Stack, Container, Tab, TextField, Typography, Avatar, IconButton, Button, Link } from "@mui/material";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import api from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import CourseImage from "../components/UI/Courses/Catalog/CourseImage";
import CourseInformationContent from "../components/CourseCatalogPage/CourseInformationContent";
import InstructorCourseEnrollmentPrompt from "../components/CourseInstructorDashboardPage/InstructorCourseEnrollmentPrompt";
import dummyCoursesData from "../assets/data/dummyCoursesData";
import { Route, useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import UpdateCourseContent from "../components/CourseInstructorDashboardPage/UpdateCourseContent";
import UpdateCourseInformation from "../components/CourseInstructorDashboardPage/UpdateCourseInformation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState,useContext, ChangeEvent } from "react";
import AuthContext from "../store/auth-context";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import ForgotPasswordPage from "./ForgotPasswordPage";

const EditUserProfilePage = () => {

	interface ImageState {
		preview: File | undefined | string;
		uploaded: string | number | readonly string[] | undefined;
	}

	const [value, setValue] = useState("0");
	const authContext = useContext(AuthContext);
	const [image, setImage] = useState<ImageState>({
		preview: authContext.user?.photo?.url,
		uploaded: "",
	});
	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
	};
	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event?.target?.files?.[0];
			setImage((previousValue) => ({
				...previousValue,
				preview: file,
			}));
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<NavigationGuard>
		<AnimatedPage>
			<SectionWrapper
				sx={{
					backgroundColor: "#f5f5f5",
					mt: window.innerWidth > 600 ? 8 : 7,
				}}>  
				<Container maxWidth="lg"sx={{paddingTop:"2rem"}}>
                <SectionHeader
								heading={"Account"}
								headingAlignment="left"
								sx={{
									pb: 1,
									borderBottom: 1,
									borderColor: "divider",
								}}
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
					<Stack  alignItems={"center"} display={"flex"} flexDirection={"column"}>
					<Stack alignItems={"center"} sx={{paddingTop:"2rem"}}>
					<Avatar
					alt={authContext.user?.name}
					/*src={
						typeof image?.preview === "string"
							? image.preview
							: URL.createObjectURL(
									image?.preview
							  )
					}*/
					src={authContext.user?.photo?.url}
					sx={{
					marginBottom:"0.5rem",
					backgroundColor: "primary.main",
					width: 70, height: 70                    }}/>
                    <Button
					component="label"
					sx={{
						mb: 2,
					}}>
					<input
						accept="image/*"
						style={{ display: "none" }}
						multiple={false}
						type="file"
						hidden
						value={image.uploaded}
						onChange={handleImageChange}
					/>Edit Picture</Button>
                    </Stack>
                    <Stack  spacing="1rem" display={"flex"} flexDirection={"column"}>
                    <TextField defaultValue={authContext.user?.name} color="primary"/>  
                    <TextField multiline defaultValue={authContext.user?.bio} color="primary"/>  
					<Button>Save Changes</Button>
                    </Stack>
					</Stack>
								</TabPanel>
								<TabPanel value="1" sx={{ p: 0, m: 0 }}>
								<Stack  alignItems={"center"} display={"flex"} flexDirection={"column"}  sx={{paddingTop:"2rem"}}>
								<Typography align="center" variant="h5">Change Email</Typography>
								<Stack spacing="1rem" sx={{paddingTop:"2rem",paddingBottom:"2rem"}}>
								<TextField defaultValue={authContext.user?.email} color="primary"/>
								<Button>Confirm</Button>
								</Stack>
								<Typography variant="h5">Change Password</Typography>
								<Stack  spacing="1rem" sx={{paddingTop:"2rem"}}>
								<TextField label="Old Password" color="primary"/>
								<TextField label="New Password" color="primary"/>
								<Button>Confirm</Button>
								</Stack>
								</Stack>
								</TabPanel>
							</TabContext>
				</Container>
			</SectionWrapper>
			<Footer />
		</AnimatedPage>
		</NavigationGuard>
	);
};

export default EditUserProfilePage;
