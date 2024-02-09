import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useAnimate from "../../hooks/use-animate";

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "inherit",
	textDecoration: "none",
}));

const HomeSection = () => {
	const titleRef = useAnimate("animate", false);
	const descriptionRef = useAnimate("animate", false);

	return (
		<Box
			sx={{
				bgcolor: "rgba(0, 0, 0, 0)",
				pt: 30,
				pb: 20,
				minWidth: "100vw !important",
			}}>
			<Container maxWidth="sm">
				<Typography
					ref={titleRef}
					variant="h2"
					align="center"
					color="common.white"
					sx={{
						opacity: "0",
						transition: "all 1.75s ease",
						transitionDelay: "1s",
					}}>
					Learn. Teach. Grow.
				</Typography>
				<Typography
					ref={descriptionRef}
					variant="h6"
					align="center"
					color="common.white"
					sx={{
						opacity: "0",
						transition: "all 1.75s ease",
						transitionDelay: "1.5s",
					}}
					paragraph>
					Learnly allows you to learn and teach anywhere, anytime.
					Develop your skills and share your knowledge with others.
				</Typography>
				<Stack
					sx={{ pt: 2 }}
					direction="row"
					spacing={2}
					justifyContent="center">
					<StyledNavLink to="/courses" exact="true">
						<Button
							variant="contained"
							size="large"
							color="secondary"
							disableElevation
							sx={{
								height: "100%",
								color: "#000000",
								backgroundColor: "#00f3b6",
								border: "solid #00f3b6",
								borderWidth: 1,
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0)",
									border: "solid #00f3b6",
									borderWidth: 1,
									color: "#00f3b6",
								},
							}}>
							Start Learning
						</Button>
					</StyledNavLink>
					<StyledNavLink to="/careers" exact="true">
						<Button
							variant="outlined"
							size="large"
							color="secondary"
							disableElevation
							sx={{
								height: "100%",
								color: "#00f3b6",
								border: "solid #00f3b6",
								borderWidth: 1,
								"&:hover": {
									border: "solid #00f3b6",
									backgroundColor: "#00f3b6",
									borderWidth: 1,
									color: "#000000",
								},
							}}>
							Start Teaching
						</Button>
					</StyledNavLink>
				</Stack>
			</Container>
		</Box>
	);
};

export default HomeSection;
