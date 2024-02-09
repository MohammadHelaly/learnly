import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Card,
	Container,
	ImageList,
	Rating,
	Stack,
	Typography,
	Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "#9c27b0",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CourseBanner = (props) => {
	const { course, loading } = props;

	const [scrolled, setScrolled] = useState(false);

	const scrollValue = window.innerWidth > 600 ? 400 : 600;

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > scrollValue;
			if (isScrolled !== scrolled) {
				setScrolled(!scrolled);
			}
		};

		document.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [scrolled]);

	return (
		<Box
			// direction="row"
			// justifyContent="space-between"
			sx={{
				width: "100%",
				position: "fixed",
				backgroundColor: "white",
				opacity: scrolled ? 1 : 0,
				transition: "all 0.5s ease",
				boxShadow: scrolled
					? "0px 0px 10px 0px rgba(0,0,0,0.75)"
					: "none",
				textAlign: "left",

				// mt: 8,
				px: window.innerWidth > 600 ? 3 : 0,
				py: window.innerWidth > 600 ? 3 : 1,
				zIndex: scrolled ? 2 : -2,
				transform: scrolled ? "none" : "translateY(-100%)",
			}}>
			<Container maxWidth="lg">
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<Stack
						direction="column"
						alignItems="left"
						justifyContent="left">
						<Typography
							variant={window.innerWidth > 600 ? "h5" : "h6"}
							sx={{
								fontWeight: 500,
							}}>
							{loading ? (
								<Skeleton
									animation="wave"
									variant="text"
									width="100%"
								/>
							) : (
								course?.name
							)}
						</Typography>
						<Typography variant="body2">
							Enroll now and get full lifetime access!
						</Typography>
					</Stack>
					<Button
						variant="contained"
						size="large"
						disableElevation
						sx={{
							// mb: 3,
							width: window.innerWidth > 600 ? "20%" : "80%",
							height: 50,
							fontSize: "1rem",
							backgroundColor: "#00f3b6",
							// backgroundColor: "#9c27b0",
							left: window.innerWidth > 600 ? "-3%" : "auto",
							color: "black",
							// border: "1px solid #00f3b6",
							"&:hover": {
								backgroundColor: "#9c27b0",
								color: "white",
								// backgroundColor: "transparent",
								// color: "#9c27b0",
								// border: "1px solid #9c27b0",
							},
						}}
						endIcon={<ArrowForward />}>
						Enroll now - ${course?.price}
					</Button>
				</Stack>
			</Container>
		</Box>
	);
};

export default CourseBanner;
