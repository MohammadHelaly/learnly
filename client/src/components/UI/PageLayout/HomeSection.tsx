import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import useAnimate from "../../../hooks/use-animate";

interface HomeSectionProps {
	landing?: boolean;
	title: string;
	description: string;
	buttonText?: string;
	buttonLink?: string;
	buttonOnClick?: () => void;
	buttonArrow?: boolean;
	secondButtonOnClick?: () => void;
	secondButtonText?: string;
	secondButtonLink?: string;
	secondButtonArrow?: boolean;
}

const HomeSection = (props: HomeSectionProps) => {
	const {
		landing,
		title,
		description,
		buttonText,
		buttonLink,
		buttonOnClick,
		buttonArrow,
		secondButtonText,
		secondButtonLink,
		secondButtonOnClick,
		secondButtonArrow,
	} = props;
	const titleRef = useAnimate("animate", false);
	const descriptionRef = useAnimate("animate", false);

	return (
		<Box
			sx={{
				bgcolor: "transparent",
				pt: landing ? 25 : 20,
				pb: landing ? 20 : !buttonText ? 5 : 10,
				minWidth: "100vw !important",
				minHeight: "100",
			}}>
			<Container maxWidth="sm">
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography
						ref={titleRef}
						variant={landing ? "h2" : "h3"}
						align="center"
						color="common.white"
						sx={{
							opacity: "0",
							transition: "all 1.75s ease",
							transitionDelay: "0.5s",
							mb: landing ? "" : 2,
						}}>
						{title}
					</Typography>
					<Typography
						ref={descriptionRef}
						variant={landing ? "h6" : "h5"}
						align="center"
						color="common.white"
						sx={{
							opacity: "0",
							transition: "all 1.75s ease",
							transitionDelay: "1s",
						}}
						paragraph>
						{description}
					</Typography>
					{buttonText && (
						<Stack
							sx={{ pt: 2 }}
							direction="row"
							spacing={2}
							justifyContent="center">
							<NavLink to={buttonLink ?? ""}>
								<Button
									variant="contained"
									size="large"
									color="secondary"
									disableElevation
									onClick={buttonOnClick}
									endIcon={buttonArrow && <ArrowForward />}
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
									{buttonText}
								</Button>
							</NavLink>
							{secondButtonText &&
								(secondButtonLink || secondButtonOnClick) && (
									<NavLink to={secondButtonLink ?? ""}>
										<Button
											variant="outlined"
											size="large"
											color="secondary"
											disableElevation
											onClick={secondButtonOnClick}
											endIcon={
												secondButtonArrow && (
													<ArrowForward />
												)
											}
											sx={{
												height: "100%",
												color: "secondary.main",
												border: 1,
												borderColor: "secondary.main",
												"&:hover": {
													border: 1,
													borderColor:
														"secondary.main",
													backgroundColor:
														"secondary.main",
													color: "#000000",
												},
											}}>
											{secondButtonText}
										</Button>
									</NavLink>
								)}
						</Stack>
					)}
				</Box>
			</Container>
		</Box>
	);
};

export default HomeSection;
