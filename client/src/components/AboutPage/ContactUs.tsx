import {
	Box,
	Container,
	Grid,
	Typography,
	Link,
	IconButton,
	Stack,
} from "@mui/material";
import {
	Facebook,
	ConnectWithoutContact,
	LinkedIn,
	Email,
	Phone,
	LocationOn,
	Instagram,
} from "@mui/icons-material";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import useAnimate from "../../hooks/use-animate";

const ContactUs = () => {
	const paragraphRef = useAnimate("animate", false);
	const box1Ref = useAnimate("animate", false);
	const box2Ref = useAnimate("animate", false);
	const box3Ref = useAnimate("animate", false);
	const box4Ref = useAnimate("animate", false);

	return (
		<Box id="contact-us" sx={{ py: 10, bgcolor: "white" }}>
			<Container maxWidth="lg">
				<SectionWrapper sx={{ mt: 0, gap: 4 }}>
					<SectionHeader
						heading="Contact Us"
						headingAlignment="center"
						headingAnimated
					/>
					<Grid
						container
						spacing={6}
						justifyContent="center"
						alignContent="stretch">
						<Grid item xs={12} sm={6} md={3}>
							<Box
								ref={box1Ref}
								sx={{
									py: 4,
									opacity: 0,
									transition: "all 1s ease-in-out",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "center",
									gap: 1,
								}}
								textAlign="center">
								<IconButton color="primary">
									<Email
										sx={{
											height: 52,
											width: 52,
										}}
									/>
								</IconButton>
								<Typography variant="h4" color="common.black">
									Email
								</Typography>
								{/* <Link
									href="mailto:contact@platform.com"
									rel="noopener noreferrer"
									target="_blank"
									underline="hover"
									color="common.black"> */}
								<Typography variant="h6" color="common.black">
									contact@platform.com
								</Typography>
								{/* </Link> */}
							</Box>
						</Grid>
						{/* <Grid item xs={12} sm={6} md={3}>
							<Box
								ref={box2Ref}
								sx={{
									py: 4,
									opacity: 0,
									transition: "all 1s ease-in-out",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									gap: 1,
									alignItems: "center",
								}}
								textAlign="center">
								<IconButton color="primary">
									<Phone sx={{
											height: 52,
											width: 52,
										}} />
								</IconButton>
								<Typography variant="h4" color="common.black">
									Phone
								</Typography>
								<Link
									href="tel:+11234567890"
									color="common.black"
									rel="noopener noreferrer"
						target="_blank">
									<Typography
										variant="h6"
										color="common.black">
										+1 (123) 456-7890
									</Typography>
								</Link>
							</Box>
						</Grid> */}
						{/* <Grid item xs={12} sm={6} md={3}>
							<Box
								ref={box3Ref}
								sx={{
									py: 4,
									opacity: 0,
									transition: "all 1s ease-in-out",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									gap: 1,
									alignItems: "center",
								}}
								textAlign="center">
								<IconButton color="primary">
									<LocationOn sx={{
											height: 52,
											width: 52,
										}} />
								</IconButton>
								<Typography variant="h4" color="common.black">
									Address
								</Typography>
								<Typography variant="h6" color="common.black">
									123 Learning St, Suite 456 <br /> Cityville,
									ST 78901
								</Typography>
							</Box>
						</Grid> */}
						<Grid item xs={12} sm={6} md={3}>
							<Box
								ref={box4Ref}
								sx={{
									py: 4,
									opacity: 0,
									transition: "all 1s ease-in-out",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "center",
									gap: 1,
								}}
								textAlign="center">
								<IconButton color="primary">
									<ConnectWithoutContact
										sx={{
											height: 52,
											width: 52,
										}}
									/>
								</IconButton>
								<Typography variant="h4" color="common.black">
									Social Media
								</Typography>
								<Stack direction="row" spacing={0}>
									<IconButton
										sx={{
											color: "black",
										}}
										// href="https://facebook.com"
										// rel="noopener noreferrer"
										// target="_blank"
									>
										<Facebook fontSize="large" />
									</IconButton>
									<IconButton
										sx={{
											color: "black",
										}}
										// href="https://twitter.com"
										// rel="noopener noreferrer"
										// target="_blank"
									>
										<Instagram fontSize="large" />
									</IconButton>
									<IconButton
										sx={{
											color: "black",
										}}
										// href="https://linkedin.com"
										// rel="noopener noreferrer"
										// target="_blank"
									>
										<LinkedIn fontSize="large" />
									</IconButton>
								</Stack>
							</Box>
						</Grid>
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
						We'd love to hear from you! Reach out to us with any
						questions, feedback, or suggestions.
					</Typography>
				</SectionWrapper>
			</Container>
		</Box>
	);
};

export default ContactUs;
