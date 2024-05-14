import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import SmallList from "../../components/UI/PageLayout/SmallList";
import TextNavLink from "../UI/Links/TextNavLink";
import CardNavLink from "../UI/Links/CardNavLink";

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
				<TextNavLink
					to="/"
					sx={{
						color: " #000000",
						"&:hover": {
							textDecoration: "none",
						},
					}}>
					<Typography
						variant="h4"
						sx={{ marginBottom: 6, letterSpacing: "0.1rem" }}>
						Learnly
					</Typography>
				</TextNavLink>
				{/* <Grid container spacing={2}> */}
				<Grid item xs={12} sm={4}>
					<Typography
						variant="h5"
						sx={{ fontWeight: 400, marginBottom: 2 }}>
						Useful Links
					</Typography>
					<SmallList>
						<li>
							<TextNavLink
								sx={{
									color: " #000000",
									fontSize: "1.25rem",
									fontWeight: "300",
								}}
								to="/courses"
								color="inherit">
								Catalog
							</TextNavLink>
						</li>
						<li>
							<TextNavLink
								sx={{
									color: " #000000",
									fontSize: "1.25rem",
									fontWeight: "300",
								}}
								to="/careers"
								color="inherit">
								Careers
							</TextNavLink>
						</li>
						<li>
							<TextNavLink
								sx={{
									color: " #000000",
									fontSize: "1.25rem",
									fontWeight: "300",
								}}
								to="/about"
								color="inherit">
								About Us
							</TextNavLink>
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
							<TextNavLink
								sx={{
									color: " #000000",
									fontSize: "1.25rem",
									fontWeight: "300",
								}}
								to="/help"
								color="inherit">
								Help and FAQs
							</TextNavLink>
						</li>
						<li>
							<TextNavLink
								sx={{
									color: " #000000",
									fontSize: "1.25rem",
									fontWeight: "300",
								}}
								to="/newsletter"
								color="inherit">
								Newsletter
							</TextNavLink>
						</li>
					</SmallList>
				</Grid>
				<Stack
					direction="row"
					justifyContent="left"
					alignItems="center"
					spacing={1}
					sx={{ mt: 6, mb: 0, py: 0 }}>
					<CardNavLink
						to="https://github.com/MohammadHelaly/learnly"
						rel="noopener noreferrer"
						target="_blank">
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
					</CardNavLink>
					<CardNavLink
						to=""
						rel="noopener noreferrer"
						target="_blank">
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
					</CardNavLink>
					<CardNavLink
						to=""
						rel="noopener noreferrer"
						target="_blank">
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
					</CardNavLink>
					<CardNavLink
						to=""
						rel="noopener noreferrer"
						target="_blank">
						<Instagram
							sx={{
								transition: "all 0.5s ease",
								"&:hover": {
									transform: "translateY(-10%) ",
									opacity: 0.7,
								},
							}}
						/>
					</CardNavLink>
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
						<TextNavLink
							to="/legal"
							color="inherit"
							sx={{
								fontSize: "inherit",
								fontWeight: "inherit",
								color: "inherit",
							}}>
							Legal & Privacy
						</TextNavLink>
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
