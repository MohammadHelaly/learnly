import { Box, Container, Stack, Typography } from "@mui/material";
import ContactUsCard from "./ContactUsCard";
import SectionWrapper from "../../UI/PageLayout/SectionWrapper";
import SectionHeader from "../../UI/PageLayout/SectionHeader";
import useAnimate from "../../../hooks/use-animate";
import contactInformation from "../../../assets/data/contactInformation";

const ContactUs = () => {
	const paragraphRef = useAnimate("animate", false);

	return (
		<Box id="contact-us" sx={{ py: 10, bgcolor: "white" }}>
			<Container maxWidth="lg">
				<SectionWrapper sx={{ mt: 0, gap: 4 }}>
					<SectionHeader
						heading="Contact Us"
						headingAlignment="center"
						headingAnimated
					/>
					<Stack
						direction="row"
						flexWrap="wrap"
						gap={2}
						justifyContent="center"
						alignContent="stretch">
						{contactInformation.map((contact, index) => (
							<ContactUsCard
								key={index}
								index={index}
								{...contact}
							/>
						))}
					</Stack>
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
