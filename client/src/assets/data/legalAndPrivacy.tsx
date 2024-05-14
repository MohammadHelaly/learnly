import { Typography } from "@mui/material";

const legalAndPrivacy: LegalAndPrivacy[] = [
	{
		heading: "1. Legal Terms",
		entries: [
			{
				primary: "1.1. User Agreement",
				secondary:
					"By accessing Learnly, you agree to our Terms and Conditions. These terms regulate your acceptable use of the platform, content, and behaviors. Violations may result in warnings, account suspension, or termination.",
			},
			{
				primary: "1.2. Content Guidelines",
				secondary:
					"Users are responsible for the content they upload, ensuring it adheres to Learnly's quality standards and complies with applicable laws. Any content deemed offensive, infringing, or misleading will be removed at Learnly's discretion.",
			},
			{
				primary: "1.3. Copyright & Intellectual Property",
				secondary:
					"All Learnly content, including courses, branding, and multimedia, belongs to Learnly or content creators. Users may not reproduce, distribute, or sell this content without explicit permission.",
			},
			{
				primary: "1.4. Limitations of Liability",
				secondary:
					"Learnly is not responsible for any damages arising from using the platform. Users are urged to ensure that their devices and networks are secure before accessing our content.",
			},
			// {
			// 	primary: "1.5. Payment & Refund Policy",
			// 	secondary:
			// 		"Learnly provides various subscription plans and courses. Users are billed accordingly. Refunds are available based on the type of course or subscription plan and will be issued as per our Refund Policy.",
			// },
		],
	},
	{
		heading: "2. Community Guidelines",
		entries: [
			{
				primary: "2.1. Respectful Behavior",
				secondary:
					"Users must interact respectfully with other members. Any form of harassment, discrimination, or offensive language is strictly prohibited.",
			},
			{
				primary: "2.2. Constructive Feedback",
				secondary:
					"Feedback and comments should be constructive and helpful. Trolling, abuse, or personal attacks will not be tolerated.",
			},
			{
				primary: "2.3. No Spamming",
				secondary:
					"Avoid posting irrelevant links, advertisements, or repetitive content. All posts should add value to the Learnly community.",
			},
			{
				primary: "2.4. Collaborations and Networking",
				secondary:
					"Collaborative projects should align with community values, providing safe and productive interactions. Users are encouraged to network positively and respect diverse ideas.",
			},
			// {
			// 	primary: "2.5. Reporting Issues",
			// 	secondary:
			// 		"If you encounter inappropriate behavior or content, report it through Learnly's support channels for prompt investigation and resolution.",
			// },
		],
	},
	{
		heading: "3. Privacy Policy",
		entries: [
			{
				primary: "3.1. Data Collection",
				secondary:
					"We collect personal data during registration and platform use, including name, email, and preferences. We may also collect cookies and usage data for platform analytics and optimization.",
			},
			{
				primary: "3.2. Data Usage",
				secondary:
					"Your data personalizes your learning experience, provides support, and optimizes platform performance. Learnly may send marketing emails, which you can opt out of at any time.",
			},
			{
				primary: "3.3. Data Sharing",
				secondary:
					"Learnly doesn't sell personal data to third parties but may share information with trusted partners to facilitate our services. Data is only shared with your explicit consent or when required by law.",
			},
			{
				primary: "3.4. Data Security",
				secondary:
					"We prioritize data security through encryption and restricted access. Although we implement robust security measures, we cannot guarantee complete safety, so users are encouraged to follow best practices.",
			},
			{
				primary: "3.5. User Rights",
				secondary:
					"Users have the right to access, correct, or delete their data. If you wish to exercise these rights or have privacy concerns, contact us through any of the methods provided on the platform.",
			},
			{
				primary: "3.6. Children's Privacy",
				secondary:
					"Learnly does not knowingly collect personal data from children under 13. Parents or guardians who believe their child has submitted data may contact us to remove it.",
			},
			{
				primary: "3.7. Cookie Policy",
				secondary: (
					<>
						<Typography variant="subtitle1">
							Purpose of Cookies
						</Typography>
						<Typography variant="body2">
							Learnly uses cookies to enhance your user
							experience, analyze platform traffic, and improve
							the performance of our services.
						</Typography>
						<Typography variant="subtitle1" sx={{ mt: 2 }}>
							Types of Cookies Used
						</Typography>
						<Typography variant="body2">
							<strong>Essential Cookies:</strong> Required for the
							proper functioning of the platform.
						</Typography>
						<Typography variant="body2">
							<strong>Analytical Cookies:</strong> Used to analyze
							user behavior and improve our platform's
							performance.
						</Typography>
						<Typography variant="body2">
							<strong>Marketing Cookies:</strong> Help deliver
							personalized content and relevant advertisements.
						</Typography>
						<Typography variant="subtitle1" sx={{ mt: 2 }}>
							Cookie Management
						</Typography>
						<Typography variant="body2">
							You can control or disable cookies in your browser
							settings. Please note that disabling essential
							cookies may impact your ability to use some platform
							features.
						</Typography>
					</>
				),
			},
			// {
			// 	primary: "3.8. International Compliance",
			// 	secondary:
			// 		"Learnly adheres to international data protection standards, including GDPR. Users can exercise their rights in accordance with regional regulations.",
			// },
		],
	},
	{
		heading: "4. Other Policies",
		entries: [
			{
				primary: "4.1. Code of Conduct",
				secondary:
					"The Learnly Code of Conduct ensures a positive environment for all users. Violations will result in appropriate measures, including possible account suspension or termination.",
			},
			{
				primary: "4.2. Dispute Resolution",
				secondary:
					"In the event of disputes between Learnly and its users, both parties are encouraged to resolve issues amicably. If necessary, disputes will be handled via binding arbitration.",
			},
			{
				primary: "4.3. Changes to Terms & Policies",
				secondary:
					"Learnly reserves the right to update its legal terms and policies periodically. Users will be notified of significant changes, which take effect immediately upon notification.",
			},
		],
	},
	{
		heading: "5. Licensing and Acknowledgments",
		entries: [
			{
				primary: "5.1. Project Licensing",
				secondary:
					"Learnly is an open-source project licensed under the MIT license, granting users permission to freely use, copy, modify, and distribute the software.",
			},
			{
				primary: "5.2. Acknowledgements",
				secondary:
					"We extend our gratitude to the open-source community for their invaluable contributions and support. Learnly incorporates several third-party libraries and frameworks, and we deeply appreciate their creators' dedication. A complete list of acknowledgments is available in the project's README file on GitHub.",
			},
			{
				primary: "5.3. Contributing",
				secondary:
					"We welcome community contributions. Learnly's repository is available on GitHub, where users can submit feature requests, report issues, and contribute through pull requests.",
			},
			{
				primary: "5.4. Code of Conduct",
				secondary:
					"All contributors are expected to follow our Code of Conduct, ensuring respectful and inclusive behavior. Violations may lead to temporary or permanent bans from contributing.",
			},
			{
				primary: "5.5. Documentation",
				secondary:
					"Learnly's documentation is comprehensive and user-friendly. Please refer to the official documentation on GitHub for setup instructions, development guidelines, and contribution policies.",
			},
			// {
			// 	primary: "5.6. Community Support",
			// 	secondary:
			// 		"Users and contributors can join Learnly's community forums or Slack channel for support and discussion. We encourage sharing knowledge, providing feedback, and building a thriving learning environment.",
			// },
			{
				primary: "5.6. Attribution",
				secondary:
					"Images used on this website are sourced from Vecteezy and Storyset on Freepik. We appreciate the talented designers, photographers and artists who share their work with the world.",
			},
		],
	},
	{
		heading: "6. Security Best Practices",
		entries: [
			{
				primary: "6.1. Password Management",
				secondary:
					"Use strong, unique passwords and update them regularly. Avoid sharing your password with others or using it across multiple platforms.",
			},
			{
				primary: "6.2. Secure Connections",
				secondary:
					"Only access Learnly over secure networks and avoid using public Wi-Fi for sensitive activities. Verify the platform's URL to avoid phishing.",
			},
			// {
			// 	primary: "6.3. Two-Factor Authentication",
			// 	secondary:
			// 		"Enable two-factor authentication for an extra layer of security. This feature will require a secondary verification code for logins.",
			// },
		],
	},
	{
		heading: "7. Contact Information",
		entries: [
			{
				primary: "7.1. Support",
				secondary:
					"For support or queries, you can contact Learnly via any any of the methods provided on this platform or consult our support page. Our team will assist you with any concerns promptly.",
			},
			{
				primary: "7.2. Legal Inquiries",
				secondary:
					"Legal inquiries can be directed to us via any any of the methods provided on this platform. We are committed to addressing all legitimate requests promptly.",
				// "Legal inquiries can be directed to our legal team via legal@learnly.com. We are committed to addressing all legitimate requests promptly.",
			},
		],
	},
];

export default legalAndPrivacy;
