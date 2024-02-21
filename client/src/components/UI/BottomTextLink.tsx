import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";

interface BottomTextLinkProps {
	text: string;
	to: string;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	color: " #9c27b0",
	transition: "all 1s ease",
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const BottomTextLink = (props: BottomTextLinkProps) => {
	const { text, to } = props;
	return (
		<StyledNavLink
			to={to}
			sx={{
				mt: 5,
			}}>
			<Typography variant="h6" textAlign="center">
				{text}
			</Typography>
			<ArrowForwardIcon />
		</StyledNavLink>
	);
};

export default BottomTextLink;
