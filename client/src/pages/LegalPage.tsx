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

						{/* Legal Terms */}
						<Typography variant="h5" gutterBottom>
							1. Legal Terms
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="1.1. User Agreement"
									secondary="By accessing Learnly, you agree to our Terms and Conditions. These terms regulate your acceptable use of the platform, content, and behaviors. Violations may result in warnings, account suspension, or termination."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="1.2. Content Guidelines"
									secondary="Users are responsible for the content they upload, ensuring it adheres to Learnly's quality standards and complies with applicable laws. Any content deemed offensive, infringing, or misleading will be removed at Learnly's discretion."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="1.3. Copyright & Intellectual Property"
									secondary="All Learnly content, including courses, branding, and multimedia, belongs to Learnly or content creators. Users may not reproduce, distribute, or sell this content without explicit permission."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="1.4. Limitations of Liability"
									secondary="Learnly is not responsible for any damages arising from using the platform. Users are urged to ensure that their devices and networks are secure before accessing our content."
								/>
							</ListItem>
							{/* <Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="1.5. Payment & Refund Policy"
									secondary="Learnly provides various subscription plans and courses. Users are billed accordingly. Refunds are available based on the type of course or subscription plan and will be issued as per our Refund Policy."
								/>
							</ListItem> */}
						</List>

						{/* Community Guidelines */}
						<Typography variant="h5" gutterBottom>
							2. Community Guidelines
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="2.1. Respectful Behavior"
									secondary="Users must interact respectfully with other members. Any form of harassment, discrimination, or offensive language is strictly prohibited."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="2.2. Constructive Feedback"
									secondary="Feedback and comments should be constructive and helpful. Trolling, abuse, or personal attacks will not be tolerated."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="2.3. No Spamming"
									secondary="Avoid posting irrelevant links, advertisements, or repetitive content. All posts should add value to the Learnly community."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="2.4. Collaborations and Networking"
									secondary="Collaborative projects should align with community values, providing safe and productive interactions. Users are encouraged to network positively and respect diverse ideas."
								/>
							</ListItem>
							{/* <Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="2.5. Reporting Issues"
									secondary="If you encounter inappropriate behavior or content, report it through Learnly's support channels for prompt investigation and resolution."
								/>
							</ListItem> */}
						</List>

						{/* Privacy Policy */}
						<Typography variant="h5" gutterBottom>
							3. Privacy Policy
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="3.1. Data Collection"
									secondary="We collect personal data during registration and platform use, including name, email, and preferences. We may also collect cookies and usage data for platform analytics and optimization."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.2. Data Usage"
									secondary="Your data personalizes your learning experience, provides support, and optimizes platform performance. Learnly may send marketing emails, which you can opt out of at any time."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.3. Data Sharing"
									secondary="Learnly doesn't sell personal data to third parties but may share information with trusted partners to facilitate our services. Data is only shared with your explicit consent, or when required by law."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.4. Data Security"
									secondary="We prioritize data security through encryption and restricted access. Although we implement robust security measures, we cannot guarantee complete safety, so users are encouraged to follow best practices."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.5. User Rights"
									secondary="Users have the right to access, correct, or delete their data. If you wish to exercise these rights or have privacy concerns, contact us through any of the methods provided on the platform."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.6. Children's Privacy"
									secondary="Learnly does not knowingly collect personal data from children under 13. Parents or guardians who believe their child has submitted data may contact us to remove it."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.7. Cookie Policy"
									secondary={
										<>
											<Typography variant="subtitle1">
												Purpose of Cookies
											</Typography>
											<Typography variant="body2">
												Learnly uses cookies to enhance
												your user experience, analyze
												platform traffic, and improve
												the performance of our services.
											</Typography>

											<Typography
												variant="subtitle1"
												sx={{ mt: 2 }}>
												Types of Cookies Used
											</Typography>
											<Typography variant="body2">
												<strong>
													Essential Cookies:
												</strong>{" "}
												Required for the proper
												functioning of the platform.
											</Typography>
											<Typography variant="body2">
												<strong>
													Analytical Cookies:
												</strong>{" "}
												Used to analyze user behavior
												and improve our platform's
												performance.
											</Typography>
											<Typography variant="body2">
												<strong>
													Marketing Cookies:
												</strong>{" "}
												Help deliver personalized
												content and relevant
												advertisements.
											</Typography>

											<Typography
												variant="subtitle1"
												sx={{ mt: 2 }}>
												Cookie Management
											</Typography>
											<Typography variant="body2">
												You can control or disable
												cookies in your browser
												settings. Please note that
												disabling essential cookies may
												impact your ability to use some
												platform features.
											</Typography>
										</>
									}
								/>
							</ListItem>
							{/* <Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="3.8. International Compliance"
									secondary="Learnly adheres to international data protection standards, including GDPR. Users can exercise their rights in accordance with regional regulations."
								/>
							</ListItem> */}
						</List>

						{/* Changes to this Policy */}
						<Typography variant="h5" gutterBottom>
							4. Changes to This Policy
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							gutterBottom>
							Learnly reserves the right to update this policy at
							any time. Major changes will be communicated through
							the platform or via email.
						</Typography>

						{/* Open Source Details */}
						<Typography variant="h5" gutterBottom>
							5. Licensing and Acknowledgments
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="5.1. Project Licensing"
									secondary="Learnly is an open-source project licensed under the MIT license, granting users permission to freely use, copy, modify, and distribute the software."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="5.2. Acknowledgements"
									secondary="We extend our gratitude to the open-source community for their invaluable contributions and support. Learnly incorporates several third-party libraries and frameworks, and we deeply appreciate their creators' dedication. A complete list of acknowledgments is available in the project's README file on GitHub."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="5.3. Contributing"
									secondary="We welcome community contributions. Learnly's repository is available on GitHub, where users can submit feature requests, report issues, and contribute through pull requests."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="5.4. Code of Conduct"
									secondary="All contributors are expected to follow our Code of Conduct, ensuring respectful and inclusive behavior. Violations may lead to temporary or permanent bans from contributing."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="5.5. Documentation"
									secondary="Learnly's documentation is comprehensive and user-friendly. Please refer to the official documentation on GitHub for setup instructions, development guidelines, and contribution policies."
								/>
							</ListItem>
							{/* <Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="5.6. Community Support"
									secondary="Users and contributors can join Learnly's community forums or Slack channel for support and discussion. We encourage sharing knowledge, providing feedback, and building a thriving learning environment."
								/>
							</ListItem> */}
						</List>

						{/* Security Best Practices */}
						<Typography variant="h5" gutterBottom>
							6. Security Best Practices
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="6.1. Password Management"
									secondary="Use strong, unique passwords and update them regularly. Avoid sharing your password with others or using it across multiple platforms."
								/>
							</ListItem>
							<Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="6.2. Secure Connections"
									secondary="Only access Learnly over secure networks and avoid using public Wi-Fi for sensitive activities. Verify the platform's URL to avoid phishing."
								/>
							</ListItem>
							{/* <Divider variant="middle" />
							<ListItem>
								<ListItemText
									primary="6.3. Two-Factor Authentication"
									secondary="Enable two-factor authentication for an extra layer of security. This feature will require a secondary verification code for logins."
								/>
							</ListItem> */}
						</List>

						{/* Contact Information */}
						<Typography variant="h5" gutterBottom>
							7. Contact Information
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							gutterBottom>
							For any questions about our Legal Terms, Privacy
							Policy, or Security Best Practices, feel free to
							contact us through any of the methods provided on
							the platform.
						</Typography>
						{/* <Box>
							<Typography variant="body1" color="text.secondary">
								**Email:** info@learnly.com
							</Typography>
							<Typography variant="body1" color="text.secondary">
								**Phone:** +1 (123) 456-7890
							</Typography>
							<Typography variant="body1" color="text.secondary">
								**Address:** 123 Learning Ave, Suite 100,
								Education City, ST 45678
							</Typography>
						</Box> */}
					</SectionWrapper>
				</Container>
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default LegalPage;
