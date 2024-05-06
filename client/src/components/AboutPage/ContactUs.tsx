import { Box, Button, Container, Typography } from "@mui/material";

const ContactUs = () => {
	return (
		<Box id="contact-us">
			<Box
				sx={{
					bgcolor: "white",
					py: 10,
					minHeight: "100",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Container maxWidth="lg">
					<Typography
						variant="h4"
						textAlign="center"
						color="common.black"
						sx={{
							mb: 3,
							// opacity: 0,
							transition: "all 1s ease-in-out",
						}}>
						Contact Us
					</Typography>
					<Typography
						variant="h5"
						textAlign="center"
						color={"common.black"}
						sx={{
							mb: 3,
							// opacity: 0,
							transition: "all 1s ease-in-out",
						}}>
						Email:
					</Typography>
					<Typography
						variant="h5"
						textAlign="center"
						color={"common.black"}
						sx={{
							mb: 3,
							opacity: 0,
							transition: "all 1s ease-in-out",
						}}>
						Phone:
					</Typography>
					<Typography
						variant="h5"
						textAlign="center"
						color={"common.white"}
						sx={{
							mb: 3,
							opacity: 0,
							transition: "all 1s ease-in-out",
						}}>
						Address:
					</Typography>
					<Typography
						variant="h5"
						textAlign="center"
						color={"common.white"}
						sx={{
							mb: 3,
							opacity: 0,
							transition: "all 1s ease-in-out",
						}}>
						Social Media:
					</Typography>
				</Container>
			</Box>
		</Box>
	);
};

export default ContactUs;
