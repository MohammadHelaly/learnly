import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";

const StyledNavLink = styled(NavLink)((theme) => ({
	color: " #000000",
	fontSize: "1.25rem",
	fontWeight: "300",
	transition: "all 0.5s ease",
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const StyledList = styled("ul")((theme) => ({
	listStyle: "none",
	paddingLeft: 0,
	"& li": {
		marginBottom: 16,
		marginLeft: window.innerWidth > 600 ? 24 : 16,
	},
}));

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "rgb(245, 245, 245)",
				color: "#000000",
				padding: "50px 0",
			}}>
			<Container maxWidth="lg">
				<StyledNavLink
					to="/"
					color="inherit"
					sx={{
						"&:hover": {
							textDecoration: "none",
						},
					}}>
					<Typography
						variant="h4"
						sx={{ marginBottom: 6, letterSpacing: "0.1rem" }}>
						Learnly
					</Typography>
				</StyledNavLink>
				{/* <Grid container spacing={2}> */}
				<Grid item xs={12} sm={4}>
					<Typography
						variant="h5"
						sx={{ fontWeight: 400, marginBottom: 2 }}>
						Useful Links
					</Typography>

					<StyledList>
						<li>
							<StyledNavLink to="/courses" color="inherit">
								Catalog
							</StyledNavLink>
						</li>
						<li>
							<StyledNavLink to="/careers" color="inherit">
								Careers
							</StyledNavLink>
						</li>
						<li>
							<StyledNavLink to="/about" color="inherit">
								About Us
							</StyledNavLink>
						</li>
						{/* <li>
							<StyledNavLink
								to="/contact"
								color="inherit"
								>
								Contact Us
							</StyledNavLink>
						</li> */}
						<li>
							<StyledNavLink to="/help" color="inherit">
								Help and FAQs
							</StyledNavLink>
						</li>
					</StyledList>
				</Grid>
				<Stack
					direction="row"
					justifyContent="left"
					alignItems="center"
					spacing={1}
					sx={{ mt: 6, mb: 0, py: 0 }}>
					<GitHub
						sx={{
							transform: "scale(0.95)",
							transition: "all 0.5s ease",
							"&:hover": {
								transform: "translateY(-10%) scale(0.95)",
								opacity: 0.7,
							},
						}}
					/>
					<LinkedIn
						sx={{
							transform: "scale(1.1)",
							transition: "all 0.5s ease",
							"&:hover": {
								transform: "translateY(-10%) scale(1.1)",
								opacity: 0.7,
							},
						}}
					/>
					<Facebook
						sx={{
							transform: "scale(1.1)",
							transition: "all 0.5s ease",
							"&:hover": {
								transform: "translateY(-10%) scale(1.1)",
								opacity: 0.7,
							},
						}}
					/>
					<Instagram
						sx={{
							transition: "all 0.5s ease",
							"&:hover": {
								transform: "translateY(-10%) ",
								opacity: 0.7,
							},
						}}
					/>
				</Stack>
				{/* <Grid item xs={12} sm={4}>
						<Typography
							variant="h5"
							sx={{ fontWeight: 400, marginBottom: 2 }}>
							Company
						</Typography>
						<StyledList>
							<li>
								<StyledNavLink to="/about" color="inherit">
									About
								</StyledNavLink>
							</li>
							<li>
								<StyledNavLink to="/contact" color="inherit">
									Contact
								</StyledNavLink>
							</li>
							<li>
								<StyledNavLink to="/blog" color="inherit">
									Blog
								</StyledNavLink>
							</li>
						</StyledList>
					</Grid>
				</Grid> */}

				<Typography variant="body2" sx={{ marginTop: 6 }}>
					&copy; {currentYear} Learnly. All rights reserved.
				</Typography>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ my: 0, py: 0 }}
					spacing={4}>
					<Typography variant="body2" sx={{ marginTop: 2 }}>
						We use cookies to ensure that our users have the best
						experience on our website.
					</Typography>
					<Typography variant="body2" sx={{ marginTop: 1 }}>
						<StyledNavLink
							to="/legal"
							color="inherit"
							sx={{
								fontSize: "inherit",
								fontWeight: "inherit",
							}}>
							Legal & Privacy
						</StyledNavLink>
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
