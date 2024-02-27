import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TextNavLink from "./TextNavLink";

interface BottomTextLinkProps {
	text: string;
	to: string;
}

const BottomTextLink = (props: BottomTextLinkProps) => {
	const { text, to } = props;
	return (
		<TextNavLink
			to={to}
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				mt: 5,
			}}>
			<Typography variant="h6" textAlign="center">
				{text}
			</Typography>
			<ArrowForwardIcon />
		</TextNavLink>
	);
};

export default BottomTextLink;
