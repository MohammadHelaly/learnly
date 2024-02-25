import { Box, Typography, Grid, Container } from "@mui/material";
import testimonials from "../../../assets/data/testimonials";
import useAnimate from "../../../hooks/use-animate";
import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
	const headerRef = useAnimate("animate", false);
	const paragraphRef = useAnimate("animate", false);

	return (
		<Box
			sx={{
				py: 10,
				background: "rgb(245, 245, 245)",
			}}>
			<Container maxWidth="lg">
				<Typography
					ref={headerRef}
					variant="h4"
					textAlign={"center"}
					sx={{
						mb: 5,
						opacity: 0,
						transition: "all 1s ease-in-out",
						transitionDelay: "0.5s",
					}}>
					Why Learnly?
				</Typography>
				<Grid container justifyContent="center" gap={2}>
					{testimonials.map((testimonial, index) => (
						<Grid item key={index}>
							<TestimonialCard index={index} {...testimonial} />
						</Grid>
					))}
				</Grid>
				<Typography
					ref={paragraphRef}
					variant="h6"
					textAlign={"center"}
					sx={{
						mt: 5,
						mx: 1,
						opacity: 0,
						transition: "all 2s ease-in-out",
					}}>
					Our users are our biggest fans. We've got tons of great
					feedback from them.
				</Typography>
			</Container>
		</Box>
	);
};

export default TestimonialSection;
