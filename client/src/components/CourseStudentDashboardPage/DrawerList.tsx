import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import dummyCourseSectionsData from "../../assets/data/dummyCourseSectionsData";
import Checkbox from "@mui/material/Checkbox";
interface DrawerListProps {
	sections: Section[];
	setVideo: (video: string) => void;
}

function DrawerList(props: DrawerListProps) {
	const { sections: selectedSections, setVideo } = props;
	const sections = selectedSections ?? dummyCourseSectionsData;
	const [selectedSection, setSelectedSection] = useState<
		string | null | undefined
	>(null);
	const [selectedModule, setSelectedModule] = useState<
		string | null | undefined
	>(null);
	return (
		<>
			{sections?.map((section: Section, index: number) => {
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
							borderBottom:
								index === sections.length - 1 ? 1 : "none", // Add bottom border for the last one
							borderColor: "divider",
						}}
					>
						<AccordionSummary
							key={id + "-summary"}
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							sx={{
								backgroundColor:
									section.id === selectedSection
										? "#f5f5f5"
										: "#fff",
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
								<AccordionDetails
									key={index + "-" + title}
									sx={{
										backgroundColor:
											module.title === selectedModule &&
											section.id === selectedSection
												? "#f5f5f5"
												: "#fff",
									}}
								>
									<Checkbox />
									<Button
										onClick={() => {
											if (module.video) {
												setVideo(module.video.url);
											} else {
												setVideo("");
											}
											setSelectedModule(module.title);
											setSelectedSection(section.id);
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
			})}
		</>
	);
}

export default DrawerList;
