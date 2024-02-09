import { Box, Button, Typography } from "@mui/material";

const ContactUs = () => {
	return (
		<div id="contact-us">
			<Box
				sx={{
					bgcolor: "white",
					p: 10,
					pt: 20,
					minHeight: "100",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
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
			</Box>
		</div>
	);
};

export default ContactUs;
