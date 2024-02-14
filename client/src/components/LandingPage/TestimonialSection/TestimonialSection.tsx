import { Box, Typography, Grid } from "@mui/material";
import testimonialData from "../../../assets/data/testimonialData";
import useAnimate from "../../../hooks/use-animate";
import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
	const headerRef = useAnimate("animate", false);
	const paragraphRef = useAnimate("animate", false);

	return (
		<Box
			sx={{
				py: 10,
				px: window.innerWidth < 600 ? 0 : 10,
				background: "rgb(245, 245, 245)",
			}}>
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
			<Grid container justifyContent="center">
				{testimonialData.map((testimonial, index) => {
					return (
						<TestimonialCard
							key={index}
							index={index}
							testimonial={testimonial}
						/>
					);
				})}
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
				Our users are our biggest fans. We've got tons of great feedback
				from them.
			</Typography>
		</Box>
	);
};

export default TestimonialSection;
