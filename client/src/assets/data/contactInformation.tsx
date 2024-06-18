import {
	Email,
	Phone,
	LocationOn,
	Facebook,
	Instagram,
	LinkedIn,
	ConnectWithoutContact,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

const contactInformation = [
	{
		icon: <Email sx={{ height: 52, width: 52 }} />,
		title: "Email",
		// content: "info@learnly.com",
		content: "mohammad.helaly@gmail.com",
		// link: "mailto:info@learnly.com",
		link: "mailto:mohammad.helaly@gmail.com",
	},
	// {
	// 	icon: <Phone sx={{ height: 52, width: 52 }} />,
	// 	title: "Phone",
	// 	content: "+1 (123) 456-7890",
	// 	link: "tel:+11234567890",
	// },
	// {
	// 	icon: <LocationOn sx={{ height: 52, width: 52 }} />,
	// 	title: "Address",
	// 	content: "123 Main Street, New York, NY 10001",
	// },
	{
		icon: <ConnectWithoutContact sx={{ height: 52, width: 52 }} />,
		title: "Social Media",
		content: (
			<Stack direction="row" spacing={0}>
				<IconButton
					// href="https://www.facebook.com/"
					// target="_blank"
					// rel="noopener noreferrer"
					sx={{ color: "black" }}>
					<Facebook fontSize="large" />
				</IconButton>
				<IconButton
					// href="https://www.facebook.com/"
					// target="_blank"
					// rel="noopener noreferrer"
					sx={{ color: "black" }}>
					<Instagram fontSize="large" />
				</IconButton>
				<IconButton
					// href="https://www.facebook.com/"
					// target="_blank"
					// rel="noopener noreferrer"
					sx={{ color: "black" }}>
					<LinkedIn fontSize="large" />
				</IconButton>
			</Stack>
		),
	},
];

export default contactInformation;
