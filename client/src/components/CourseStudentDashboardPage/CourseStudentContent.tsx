import {
	Typography,
	Stack,
	Container,
	Button,
	Box,
	Drawer,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import dummyCourseSectionsData from "../../assets/data/dummyCourseSectionsData";
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
	const sections = selectedSections ?? dummyCourseSectionsData;

	const DrawerList = sections?.map((section: Section, index: number) => {
		const { id, title, description, modules, duration } = section;
		return (
			<Accordion
				key={id + "-accordion"}
				disableGutters={true}
				sx={{
					width: "100%",
					boxShadow: "none !important",
					overflow: "hidden",
					border: 1,
					borderBottom: index === sections.length - 1 ? 1 : "none", // Add bottom border for the last one
					borderColor: "divider",
				}}
			>
				<AccordionSummary
					key={id + "-summary"}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{
						backgroundColor: "#f5f5f5",
						width: "100%",
						flexDirection: "row-reverse",
						py: 1,
					}}
				>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						justifyContent="space-between"
						width="100%"
						sx={{
							ml: 1,
						}}
					>
						<Typography
							variant="h5"
							sx={{
								fontWeight: "400",
							}}
						>
							{title}
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{
								fontWeight: "400",
							}}
						>
							{`${modules?.length} Modules • ${
								duration ?? 0
							} Hours`}
						</Typography>
					</Stack>
				</AccordionSummary>
				<AccordionDetails
					key={id + "-details"}
					sx={{
						borderTop: 1,
						borderColor: "divider",
					}}
				>
					<Typography variant="h6" color="text.secondary">
						{description}
					</Typography>
				</AccordionDetails>
				{modules?.map((module: Module, index: number) => {
					const { title } = module;
					return (
						<AccordionDetails key={index + "-" + title}>
							<Checkbox />
							<Button
								onClick={() => {
									if (module.video) {
										setVideo(module.video.url);
									} else {
										setVideo("");
									}
								}}
							>
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
								>
									<PlayCircleIcon fontSize="small" />
									<Typography variant="body1">
										{title}
									</Typography>
								</Stack>
							</Button>
						</AccordionDetails>
					);
				})}
			</Accordion>
		);
	});

	return (
		<>
			<SectionWrapper>
				{isError ? (
					<ErrorWarning />
				) : isLoading ? (
					<SkeletonCourseContents />
				) : (
					<Container
						sx={{
							flexDirection: "row",
							display: "flex",
							height: "650px",
							width: "100%",
						}}
					>
						<Button
							sx={{ position: "fixed", top: "50%", right: 0 }}
							variant="contained"
							onClick={() => {
								if (open) {
									setOpen(false);
								} else {
									setOpen(true);
								}
							}}
						>
							<ArrowBackIcon sx={{ paddingRight: "0.5rem" }} />
							Contents
						</Button>
						<Drawer
							open={open}
							onClose={toggleDrawer(false)}
							anchor="right"
							variant="persistent"
							sx={{ position: "absolute", top: "10%" }}
						>
							<Box>
								{
									<Box
										sx={{
											backgroundColor: "#f5f5f5",
											width: "100%",
											boxShadow: "none !important",
											overflow: "hidden",
											border: 1,
											borderBottom: 1,
											borderColor: "divider",
											py: 1,
										}}
									>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center"
											justifyContent="space-between"
											width="100%"
											sx={{
												ml: 1,
											}}
										>
											<Typography
												variant="h5"
												sx={{
													fontWeight: "400",
												}}
											>
												Course Content
											</Typography>
											<Button
												onClick={() => {
													setOpen(false);
												}}
											>
												<CloseIcon></CloseIcon>
											</Button>
										</Stack>
									</Box>
								}
								{DrawerList}
							</Box>
						</Drawer>
						<CardMedia
							component="video"
							controls
							className="MuiCardMedia-media"
							sx={{
								width: "100%",
								height: "100%",
								minHeight: "100%",
							}}
							image={video ? video : "#"}
						/>

						{/* <Box
							sx={{
								width: "100%",
								overflowY: "auto",
								overflowX: "hidden",
							}}
						>
							{sections?.map(
								(section: Section, index: number) => {
									const {
										id,
										title,
										description,
										modules,
										duration,
									} = section;
									return (
										<Accordion
											key={id + "-accordion"}
											disableGutters={true}
											sx={{
												width: "100%",
												boxShadow: "none !important",
												overflow: "hidden",
												border: 1,
												borderBottom:
													index ===
													sections.length - 1
														? 1
														: "none", // Add bottom border for the last one
												borderColor: "divider",
											}}
										>
											<AccordionSummary
												key={id + "-summary"}
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												sx={{
													backgroundColor: "#f5f5f5",
													width: "100%",
													flexDirection:
														"row-reverse",
													py: 1,
												}}
											>
												<Stack
													direction="row"
													spacing={1}
													alignItems="center"
													justifyContent="space-between"
													width="100%"
													sx={{
														ml: 1,
													}}
												>
													<Typography
														variant="h5"
														sx={{
															fontWeight: "400",
														}}
													>
														{title}
													</Typography>
													<Typography
														variant="body1"
														color="text.secondary"
														sx={{
															fontWeight: "400",
														}}
													>
														{`${
															modules?.length
														} Modules • ${
															duration ?? 0
														} Hours`}
													</Typography>
												</Stack>
											</AccordionSummary>
											<AccordionDetails
												key={id + "-details"}
												sx={{
													borderTop: 1,
													borderColor: "divider",
												}}
											>
												<Typography
													variant="h6"
													color="text.secondary"
												>
													{description}
												</Typography>
											</AccordionDetails>
											{modules?.map(
												(
													module: Module,
													index: number
												) => {
													const { title } = module;
													return (
														<AccordionDetails
															key={
																index +
																"-" +
																title
															}
														>
															<Checkbox />
															<Button
																onClick={() => {
																	if (
																		module.video
																	) {
																		setVideo(
																			module
																				.video
																				.url
																		);
																	} else {
																		setVideo(
																			""
																		);
																	}
																}}
															>
																<Stack
																	direction="row"
																	spacing={1}
																	alignItems="center"
																>
																	<PlayCircleIcon fontSize="small" />
																	<Typography variant="body1">
																		{title}
																	</Typography>
																</Stack>
															</Button>
														</AccordionDetails>
													);
												}
											)}
										</Accordion>
									);
								}
							)}
						</Box> */}
					</Container>
				)}
			</SectionWrapper>
		</>
	);
};

export default CourseStudentContents;
