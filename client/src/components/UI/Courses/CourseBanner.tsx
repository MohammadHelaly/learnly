import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";

interface CourseBannerProps {
	name: string;
	price: number;
	loading: boolean;
}

const CourseBanner = (props: CourseBannerProps) => {
	const { name, price, loading } = props;

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
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{
				width: "100vw",
				position: "fixed",
				backgroundColor: "white",
				opacity: scrolled ? 1 : 0,
				transition: "all 0.5s ease",
				boxShadow: scrolled
					? "0px 0px 10px 0px rgba(0,0,0,0.75)"
					: "none",
				py: window.innerWidth > 600 ? 3 : 1,
				zIndex: scrolled ? 2 : -2,
				transform: scrolled ? "none" : "translateY(-100%)",
			}}>
			<Container maxWidth="lg">
				<Stack
					direction="row"
					justifyContent="space-between"
					alignContent="center"
					alignItems="center"
					spacing={2}>
					<Stack
						direction="column"
						alignItems="left"
						justifyContent="left">
						<Typography
							variant={window.innerWidth > 600 ? "h5" : "body1"}
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
								name
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
							minWidth: window.innerWidth > 600 ? 250 : 145,

							height: 50,
							// fontSize:
							// 	window.innerWidth > 600 ? "1rem" : "0.65rem",
							backgroundColor: "#00f3b6",
							color: "black",
							"&:hover": {
								backgroundColor: "#9c27b0",
								color: "white",
							},
						}}
						endIcon={<ArrowForward />}>
						Enroll now
					</Button>
				</Stack>
			</Container>
		</Box>
	);
};

export default CourseBanner;
