import { Box, Container } from "@mui/material";
import InformationSectionContent from "./InformationSectionContent";

interface InformationSectionProps {
	variant: "transparent" | "white" | "grey";
	cardsContent: {
		title: string;
		description: string;
		image: string;
	}[];
}

const InformationSection = (props: InformationSectionProps) => {
	const { variant, cardsContent } = props;

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
				{cardsContent.map((content, index) => (
					<InformationSectionContent
						key={index}
						index={index}
						{...content}
					/>
				))}
			</Container>
		</Box>
	);
};

export default InformationSection;
