import {
	Box,
	Container,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Stack,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AnimatedPage from "./AnimatedPage";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import Footer from "../components/Footer/Footer";
import helpAndFaqs from "../assets/data/helpAndFaqs";

const HelpPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="How Can We Help?"
				description="Get answers to frequently asked questions."
			/>
			<PageWrapper>
				<Container maxWidth="md">
					<SectionWrapper sx={{ gap: 4 }}>
						<SectionHeader
							heading="Help & FAQs"
							headingAlignment="center"
							headingAnimated
						/>
						<Typography
							variant="body1"
							color="text.secondary"
							gutterBottom>
							We're here to assist with queries related to Learnly
							courses, accounts, subscriptions, and more. Browse
							our FAQs or use the contact details below for
							personalized support.
						</Typography>
						<SectionHeader
							heading="Frequently Asked Questions (FAQs)"
							headingAlignment="left"
							headingAnimated
							sx={{
								mt: 4,
							}}
						/>
						{helpAndFaqs.map((category, index) => (
							<Box key={index} mb={4}>
								<Typography variant="h5" gutterBottom>
									{category.category}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary"
									gutterBottom>
									{category.description}
								</Typography>
								{category.faqs.map((faq, index) => (
									<Accordion
										key={index}
										disableGutters={true}
										sx={{
											boxShadow: "none !important",
											overflow: "hidden",
											border: 1,
											borderBottom:
												index ===
												category.faqs.length - 1
													? 1
													: "none",
											borderColor: "divider",
										}}>
										<AccordionSummary
											expandIcon={<ExpandMore />}
											aria-controls={`${category.category}-${index}-content`}
											id={`${category.category}-${index}-header`}
											sx={{
												backgroundColor: "#f5f5f5",
												flexDirection: "row-reverse",
											}}>
											<Stack
												direction="row"
												spacing={1}
												alignItems="center"
												justifyContent="space-between"
												width="100%"
												sx={{ ml: 1 }}>
												<Typography
													variant="h6"
													sx={{ fontWeight: "400" }}>
													{faq.question}
												</Typography>
											</Stack>
										</AccordionSummary>
										<AccordionDetails
											sx={{
												borderTop: 1,
												borderColor: "divider",
											}}>
											<Typography variant="body1">
												{faq.answer}
											</Typography>
										</AccordionDetails>
									</Accordion>
								))}
							</Box>
						))}
						<SectionHeader
							heading="Still Need Help?"
							headingAlignment="left"
							headingAnimated
						/>
						<Typography
							variant="body1"
							color="text.secondary"
							gutterBottom>
							If your question isn't answered above, feel free to
							reach out to our team for assistance. You can
							contact us through any of the methods provided on
							this platform. We're here to help you make the most
							out of your Learnly experience.
						</Typography>
						{/* <List> */}
						{/* <ListItem>
								<ListItemText
									primary="Email"
									secondary="info@learnly.com"
								/>
							</ListItem> */}
						{/* <ListItem>
							<ListItemText
								primary="Live Chat"
								secondary="Available Monday to Friday, 9 AM - 6 PM"
							/>
						</ListItem> */}
						{/* </List> */}
					</SectionWrapper>
				</Container>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default HelpPage;
