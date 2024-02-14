import { Box, Stack, Typography, Container } from "@mui/material";
import photo from "../../assets/images/shot-data-center-multiple-rows-260nw-1394052911.png";
import useAnimate from "../../hooks/use-animate";

const InformationSection = () => {
	const stack1Ref = useAnimate("animate", false);
	const stack2Ref = useAnimate("animate", false);
	const stack3Ref = useAnimate("animate", false);
	return (
		<>
			<Box
				sx={{
					// px: window.innerWidth > 600 ? 20 : 2,
					color: "white",
					overflowX: "hidden",
				}}>
				<Container maxWidth="lg">
					<Stack
						ref={stack1Ref}
						spacing={2}
						direction={window.innerWidth > 800 ? "row" : "column"}
						alignContent="center"
						alignItems="center"
						sx={{
							my: window.innerWidth > 600 ? 5 : 10,
							opacity: 0,
							transition: "all 1s ease-in-out 0.5s",
							// height: 400,
						}}>
						<Box
							sx={{
								p: window.innerWidth > 600 ? 8 : 0,
							}}>
							<Typography
								variant="h4"
								color="common.white"
								textAlign={
									window.innerWidth > 800 ? "left" : "center"
								}
								sx={{
									mb: 3,
								}}>
								Level Up with Lifetime Access to Courses
							</Typography>
							<Typography
								variant="h6"
								color="common.white"
								textAlign={
									window.innerWidth > 800 ? "left" : "center"
								}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla fringilla ante nec libero
								malesuada tristique.
							</Typography>
						</Box>
						<Box
							sx={{
								p: window.innerWidth > 600 ? 10 : 0,
							}}>
							<img
								src={photo}
								alt="information"
								style={{
									height: "100%",
									// width: "100%",
									borderRadius: "10%",
								}}
							/>
						</Box>
					</Stack>
					<Stack
						ref={stack2Ref}
						spacing={2}
						direction={
							window.innerWidth > 800 ? "row-reverse" : "column"
						}
						alignContent="center"
						alignItems="center"
						sx={{
							mb: window.innerWidth > 600 ? 5 : 10,
							opacity: 0,
							transition: "all 1s ease-in-out 0.5s",
							// height: 400,
						}}>
						<Box
							sx={{
								p: window.innerWidth > 600 ? 10 : 0,
							}}>
							<Typography
								variant="h4"
								color="common.white"
								textAlign={
									window.innerWidth > 800 ? "left" : "center"
								}
								sx={{
									mb: 3,
								}}>
								Get in Touch with World Class Instructors
							</Typography>
							<Typography
								variant="h6"
								color="common.white"
								textAlign={
									window.innerWidth > 800 ? "left" : "center"
								}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla fringilla ante nec libero
								malesuada tristique.
							</Typography>
						</Box>
						<Box
							sx={{
								p: window.innerWidth > 600 ? 8 : 0,
							}}>
							<img
								src={photo}
								alt="information"
								style={{
									height: "100%",
									// width: "100%",
									borderRadius: "10%",
								}}
							/>
						</Box>
					</Stack>
					<Stack
						ref={stack3Ref}
						spacing={2}
						direction={window.innerWidth > 800 ? "row" : "column"}
						alignItems="center"
						sx={{
							mb: 10,
							opacity: 0,
							transition: "all 1s ease-in-out 0.5s",
							// height: 400,
						}}>
						<Box
							sx={{
								p: window.innerWidth > 600 ? 8 : 0,
							}}>
							<Typography
								variant="h4"
								color="common.white"
								textAlign={
									window.innerWidth > 800 ? "left" : "center"
								}
								sx={{
									mb: 3,
								}}>
								Explore a Vast Array of Specializations
							</Typography>
							<Typography
								variant="h6"
								color="common.white"
								textAlign={
									window.innerWidth > 800 ? "left" : "center"
								}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nulla fringilla ante nec libero
								malesuada tristique.
							</Typography>
						</Box>
						<Box
							sx={{
								p: window.innerWidth > 600 ? 8 : 0,
							}}>
							<img
								src={photo}
								alt="information"
								style={{
									height: "100%",
									// width: "100%",
									borderRadius: "10%",
								}}
							/>
						</Box>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

export default InformationSection;
