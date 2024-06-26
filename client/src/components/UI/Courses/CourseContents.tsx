import { Typography, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import dummyCourseSectionsData from "../../../assets/data/dummyCourseSectionsData";
import SectionHeader from "../PageLayout/SectionHeader";
import SectionWrapper from "../PageLayout/SectionWrapper";
import SkeletonCourseContents from "./SkeletonCourseContents";
import ErrorWarning from "../Messages/ErrorWarning";
import formatDuration from "../../../utils/formatDuration";
interface CourseContentsProps {
	isLoading: boolean;
	isError: boolean;
	sections: Section[];
}

const CourseContents = (props: CourseContentsProps) => {
	const { sections: selectedSections, isLoading, isError } = props;

	const sections = selectedSections ?? dummyCourseSectionsData;

	return (
		<SectionWrapper>
			<SectionHeader heading="Course Contents" headingAlignment="left" />
			{isError ? (
				<ErrorWarning />
			) : isLoading ? (
				<SkeletonCourseContents />
			) : (
				sections?.map((section: Section, index: number) => {
					const { id, title, description, modules, duration } =
						section;
					return (
						<Accordion
							key={id + "-accordion"}
							disableGutters={true}
							sx={{
								boxShadow: "none !important",
								overflow: "hidden",
								border: 1,
								borderBottom:
									index === sections.length - 1 ? 1 : "none", // Add bottom border for the last one
								borderColor: "divider",
							}}>
							<AccordionSummary
								key={id + "-summary"}
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								sx={{
									backgroundColor: "#f5f5f5",
									width: "100%",
									flexDirection: "row-reverse",
								}}>
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
									justifyContent="space-between"
									width="100%"
									sx={{
										ml: 1,
									}}>
									<Typography
										variant="h5"
										sx={{
											fontWeight: "400",
										}}>
										{title}
									</Typography>
									<Typography
										variant="body1"
										color="text.secondary"
										sx={{
											fontWeight: "400",
										}}>
										{`${
											modules?.length
										} Modules • ${formatDuration(
											duration
										)}`}
									</Typography>
								</Stack>
							</AccordionSummary>
							<AccordionDetails
								key={id + "-details"}
								sx={{
									borderTop: 1,
									borderColor: "divider",
								}}>
								<Typography variant="h6" color="text.secondary">
									{description}
								</Typography>
							</AccordionDetails>
							{modules?.map((module: Module, index: number) => {
								const { title } = module;
								return (
									<AccordionDetails key={index + "-" + title}>
										<Stack
											direction="row"
											spacing={1}
											alignItems="center">
											<PlayCircleIcon fontSize="small" />
											<Typography variant="body1">
												{title}
											</Typography>
										</Stack>
									</AccordionDetails>
								);
							})}
						</Accordion>
					);
				})
			)}
		</SectionWrapper>
	);
};

export default CourseContents;
