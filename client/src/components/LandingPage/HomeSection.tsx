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
				pt: 25,
				pb: 25,
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
						transitionDelay: "0.5s",
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
						transitionDelay: "1s",
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
					<StyledNavLink to="/courses">
						<Button
							variant="contained"
							size="large"
							color="secondary"
							disableElevation
							sx={{
								height: "100%",
								color: "#000000",
								backgroundColor: "secondary.main",
								border: 1,
								borderColor: "secondary.main",
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0)",
									border: 1,
									borderColor: "secondary.main",
									color: "secondary.main",
								},
							}}>
							Start Learning
						</Button>
					</StyledNavLink>
					<StyledNavLink to="/careers">
						<Button
							variant="outlined"
							size="large"
							color="secondary"
							disableElevation
							sx={{
								height: "100%",
								color: "secondary.main",
								border: 1,
								borderColor: "secondary.main",
								"&:hover": {
									border: 1,
									borderColor: "secondary.main",
									backgroundColor: "secondary.main",
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
