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
import { useEffect } from "react";
import Livechat from "./Livechat";

interface DrawerListProps {
	toggleDrawerFlag: boolean;
}

const DrawerList = (props: DrawerListProps) => {
	const { toggleDrawerFlag } = props;

	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	useEffect(() => {
		setOpen(toggleDrawerFlag);
	}, [toggleDrawerFlag]);

	return (
		<Drawer
			open={open}
			onClose={toggleDrawer(false)}
			anchor="right"
			variant="persistent"
			// sx={{ overflowY: "auto" }}
			sx={{ mb: 0 }}
			PaperProps={{
				sx: {
					"::-webkit-scrollbar": {
						display: "none",
					},
					zIndex: 1100,
					// Hide scrollbar for Firefox
					"-ms-overflow-style": "none", // IE and Edge
					scrollbarWidth: "none", // Firefox
					// top: "0%", // Adjust this value to move the drawer down the page
					// mt: window.innerWidth > 600 ? 8 : 7,
					overflowY: "scroll",
					overflowX: "hidden",
					// height: "91.25%",
					minWidth: "25%",
					height: "86.5%",
					pb: 1,
					// Adjust this value to change the height of the drawer
				},
			}}
		>
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
						}}
					>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							justifyContent="space-between"
							width="100%"
						>
							<Typography
								variant="h5"
								sx={{
									fontWeight: "400",
								}}
							>
								Livestream Chat
							</Typography>
							<IconButton
								onClick={() => {
									setOpen(false);
								}}
							>
								<CloseIcon></CloseIcon>
							</IconButton>
						</Stack>
					</Box>
				}
				<Livechat />
			</Box>
		</Drawer>
	);
};

export default DrawerList;
