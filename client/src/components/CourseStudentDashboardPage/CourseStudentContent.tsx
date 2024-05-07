import {
	Typography,
	Stack,
	Container,
	Button,
	Box,
	Drawer,
	IconButton,
} from "@mui/material";

import SectionHeader from "../../components/UI/PageLayout/SectionHeader";
import SectionWrapper from "../../components/UI/PageLayout/SectionWrapper";
import SkeletonCourseContents from "../../components/UI/Courses/SkeletonCourseContents";
import ErrorWarning from "../../components/UI/Messages/ErrorWarning";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material";
import Footer from "../Footer/Footer";
import Checkbox from "@mui/material/Checkbox";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import CourseDescription from "../CourseCatalogPage/CourseDescription";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import AnimatedPage from "../../pages/AnimatedPage";
import { string } from "zod";
import DrawerList from "./DrawerList";
interface CourseContentsProps {
	isLoading: boolean;
	isError: boolean;
	sections: Section[];
	courseName: string;
}

const CourseStudentContents = (props: CourseContentsProps) => {
	const {
		sections: selectedSections,
		isLoading,
		isError,
		courseName,
	} = props;
	const [video, setVideo] = useState("");
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	return (
		<SectionWrapper sx={{ mt: 0 }}>
			{isError ? (
				<ErrorWarning />
			) : isLoading ? (
				<SkeletonCourseContents />
			) : (
				<Box
					sx={{
						flexDirection: "row",
						display: "flex",
						width: "100%",
					}}>
					<Button
						disableElevation
						sx={{
							position: "absolute",
							top: window.innerWidth > 600 ? "25%" : "15%",
							// top: "25%",
							zIndex: 2,
							right: 0,
							display: open ? "none" : "flex",
							borderStartEndRadius: 0,
							borderEndEndRadius: 0,
						}}
						variant="contained"
						onClick={() => {
							if (open) {
								setOpen(false);
							} else {
								setOpen(true);
							}
						}}>
						<ArrowBackIcon sx={{ paddingRight: "0.5rem" }} />
						Contents
					</Button>
					<Box>
						<Drawer
							open={open}
							onClose={toggleDrawer(false)}
							anchor="right"
							variant="persistent"
							// sx={{ overflowY: "auto" }}

							PaperProps={{
								sx: {
									"::-webkit-scrollbar": {
										display: "none",
									},
									// Hide scrollbar for Firefox
									"-ms-overflow-style": "none", // IE and Edge
									scrollbarWidth: "none", // Firefox
									// top: "8.75%", // Adjust this value to move the drawer down the page
									mt: window.innerWidth > 600 ? 8 : 7,
									overflowY: "scroll",
									overflowX: "hidden",
									// height: "91.25%",
									minWidth: "25%",

									// Adjust this value to change the height of the drawer
								},
							}}>
							<Box>
								{
									<Box
										sx={{
											backgroundColor: "#f5f5f5",
											// width: "100%",
											boxShadow: "none !important",
											overflow: "hidden",
											border: 1,
											borderBottom: 1,
											borderColor: "divider",
											p: 2,
										}}>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
											justifyContent="space-between"
											width="100%">
											<Typography
												variant="h5"
												sx={{
													fontWeight: "400",
												}}>
												Course Content
											</Typography>
											<IconButton
												onClick={() => {
													setOpen(false);
												}}>
												<CloseIcon></CloseIcon>
											</IconButton>
										</Stack>
									</Box>
								}

								<DrawerList
									sections={selectedSections}
									setVideo={setVideo}
								/>
							</Box>
						</Drawer>
					</Box>
					<CardMedia
						component="video"
						controls
						className="MuiCardMedia-media"
						sx={{
							width: open ? "75%" : "100%",
							height: "100%",
							overflow: "hidden",
						}}
						image={video ? video : "#"}
					/>
				</Box>
			)}
		</SectionWrapper>
	);
};

export default CourseStudentContents;
