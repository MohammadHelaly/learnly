import { Box, Button, Typography, styled } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useAnimate from "../../hooks/use-animate";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "inherit",
}));

const AboutSection = () => {
	const line1Ref = useAnimate("animate", false);
	const line2Ref = useAnimate("animate", false);
	const buttonRef = useAnimate("animate", false);

	const scrollToContact = () => {
		const contactUsElement = document.getElementById("contact-us");

		if (contactUsElement) {
			contactUsElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<Box
			sx={{
				bgcolor: "rgba(0,0,0,0)",
				p: 10,
				pt: 20,
				minHeight: "100",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Typography
				ref={line2Ref}
				variant="h3"
				textAlign="center"
				color={"common.white"}
				sx={{
					mb: 2,
					opacity: 0,
					transition: "all 1s ease-in-out 0.2s",
				}}>
				Learn about Learnly!
			</Typography>
			<Typography
				ref={line1Ref}
				variant="h5"
				textAlign="center"
				color={"common.white"}
				sx={{
					mb: 3,
					opacity: 0,
					transition: "all 1s ease-in-out",
				}}>
				Read about our team, our mission, and our vision.
			</Typography>
			{/* <StyledNavLink to="/a" exact="true"> */}
			<Button
				ref={buttonRef}
				variant="contained"
				color="primary"
				size="large"
				disableElevation
				onClick={scrollToContact}
				endIcon={<ArrowForwardIcon />}
				sx={{
					// height: "100%",
					opacity: 0,
					color: "#000000",
					backgroundColor: "#00f3b6",
					border: "solid #00f3b6",
					borderWidth: 1,
					transition:
						"opacity 0.5s ease-in-out .2s, background-color 0.2s ease-in-out 0s",
					"&:hover": {
						backgroundColor: "rgba(0, 0, 0, 0)",
						border: "solid #00f3b6",
						borderWidth: 1,
						color: "#00f3b6",
					},
				}}>
				Get in Touch with Us
			</Button>
			{/* </StyledNavLink> */}
		</Box>
	);
};

export default AboutSection;
