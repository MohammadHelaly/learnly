import { SxProps, Typography } from "@mui/material";
import useAnimate from "../../hooks/use-animate";

interface SectionHeaderProps {
	heading: string | JSX.Element;
	headingAlignment: "left" | "center";
	headingAnimated?: boolean;
	isSubHeading?: boolean;
	sx?: SxProps;
	variant?: "h3" | "h4" | "h5";
}

const SectionHeader = (props: SectionHeaderProps) => {
	const {
		heading,
		isSubHeading,
		headingAlignment,
		headingAnimated,
		sx,
		variant,
	} = props;

	const elementRef = useAnimate("animate", false);

	return (
		<Typography
			ref={headingAnimated ? elementRef : undefined}
			variant={variant ? variant : isSubHeading ? "h5" : "h4"}
			color={isSubHeading ? "text.secondary" : "text.primary"}
			textAlign={window.innerWidth > 600 ? headingAlignment : "center"}
			sx={{
				mb: 5,
				opacity: headingAnimated ? 0 : 1,
				transition: "all 1s ease-in-out",
				...sx,
			}}>
			{heading}
		</Typography>
	);
};

export default SectionHeader;
