import { Box, Container } from "@mui/material";
import photo from "../../../assets/images/shot-data-center-multiple-rows-260nw-1394052911.png";
import InformationSectionContent from "./InformationSectionContent";

interface InformationSectionProps {
	variant: "transparent" | "white" | "grey";
	cardsContent?: {
		title: string;
		description: string;
		img: string;
	}[];
}

const InformationSection = (props: InformationSectionProps) => {
	const { variant } = props;

	return (
		<Box
			sx={{
				color:
					variant === "transparent" ? "common.white" : "common.black",
				backgroundColor:
					variant === "transparent"
						? "transparent"
						: variant === "grey"
						? "#f5f5f5"
						: "white",
				overflowX: "hidden",
			}}>
			<Container maxWidth="lg">
				<InformationSectionContent
					index={0}
					title="Level Up with Lifetime Access to Courses"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla ante nec libero malesuada tristique."
					image={photo}
				/>
				<InformationSectionContent
					index={1}
					title="Get in Touch with World Class Instructors"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla ante nec libero malesuada tristique."
					image={photo}
				/>
				<InformationSectionContent
					index={2}
					title="Explore a Vast Array of Specializations"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla ante nec libero malesuada tristique."
					image={photo}
				/>
			</Container>
		</Box>
	);
};

export default InformationSection;
