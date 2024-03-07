import { Typography, Stack, Button, Icon } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
// import dummyCourseSectionsData from "../../../assets/data/dummyCourseSectionsData";
// import SectionHeader from "../PageLayout/SectionHeader";
// import SectionWrapper from "../PageLayout/SectionWrapper";
// import SkeletonCourseContents from "./SkeletonCourseContents";
// import ErrorWarning from "../Messages/ErrorWarning";

interface CourseContentsProps {
	isLoading: boolean;
	isError: boolean;
	sections: Section[];
}

const AddSection = () => {
	//const { sections: selectedSections, isLoading, isError } = props;

	// const sections = selectedSections ?? dummyCourseSectionsData;

	return (
		<Stack alignItems="center">
			<Button sx={{ color: "black" }}>
				<AddIcon />
				<Typography
					variant="h6"
					sx={{
						fontWeight: "400",
					}}
				>
					Add new Section
				</Typography>
			</Button>
		</Stack>
	);
};

export default AddSection;
