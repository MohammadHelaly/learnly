import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

const TextNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: theme.theme.palette.primary.main,
	"&:hover": {
		textDecoration: "underline",
	},
}));

export default TextNavLink;
