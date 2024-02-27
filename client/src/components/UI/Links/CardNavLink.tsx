import { NavLink } from "react-router-dom";
import styled from "@mui/system/styled";

const CardNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "inherit",
}));

export default CardNavLink;
