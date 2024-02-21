import { Typography } from "@mui/material";
import useAnimate from "../../hooks/use-animate";

interface SectionHeaderProps {
	heading: string;
	headingAlignment: "left" | "center";
	headingAnimated?: boolean;
}

const SectionHeader = (props: SectionHeaderProps) => {
	const { heading, headingAlignment, headingAnimated } = props;

	const elementRef = useAnimate("animate", false);

	return (
		<Typography
			ref={headingAnimated ? elementRef : undefined}
			variant="h4"
			textAlign={window.innerWidth > 600 ? headingAlignment : "center"}
			sx={{
				mb: 5,
				opacity: headingAnimated ? 0 : 1,
				transition: "all 1s ease-in-out",
			}}>
			{heading}
		</Typography>
	);
};

export default SectionHeader;
