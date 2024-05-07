import AnimatedPage from "./AnimatedPage";
import HomeSection from "../components/UI/PageLayout/HomeSection";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import {
	Box,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import Footer from "../components/Footer/Footer";
import legalAndPrivacy from "../assets/data/legalAndPrivacy";

const LegalPage = () => {
	return (
		<AnimatedPage>
			<HomeSection
				title="Legal Resources"
				description="Read Learnly's Terms of Service and Privacy Policy."
			/>
			<PageWrapper>
				<Container maxWidth="md">
					<SectionWrapper sx={{ gap: 4 }}>
						<SectionHeader
							heading="Legal & Privacy"
							headingAlignment="center"
							headingAnimated
						/>
						<Typography
							variant="body1"
							color="text.secondary"
							gutterBottom>
							Welcome to Learnly! This document serves as our
							legal terms, conditions, and privacy policy. We are
							committed to safeguarding your data and providing
							transparent guidelines on using our platform. Please
							read it carefully to understand your rights and
							obligations.
						</Typography>
						{legalAndPrivacy.map((section, index) => (
							<Box key={index}>
								<Typography variant="h5" gutterBottom>
									{section.heading}
								</Typography>
								<List>
									{section.entries.map((entry, index) => (
										<Box key={index}>
											<ListItem>
												<ListItemText
													primary={entry.primary}
													secondary={entry.secondary}
												/>
											</ListItem>
											<Divider variant="middle" />
										</Box>
									))}
								</List>
							</Box>
						))}
					</SectionWrapper>
				</Container>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default LegalPage;
