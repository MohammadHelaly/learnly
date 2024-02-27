import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "inherit",
	fontSize: "1.5rem",
	fontWeight: "500",
	transition: "all 0.5s ease",
	textDecoration: "none",
}));

export default StyledNavLink;
