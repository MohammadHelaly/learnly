import { Box, IconButton, Typography, Link } from "@mui/material";
import useAnimate from "../../../hooks/use-animate";

interface ContactUsCardProps {
	icon: React.ReactNode;
	title: string;
	content: string | React.ReactNode;
	link?: string;
	index: number;
}

const ContactUsCard = (props: ContactUsCardProps) => {
	const { icon, title, content, link, index } = props;
	const elementRef = useAnimate("animate", false);
	const delay = 0.5 + index * 0.2;

	return (
		<Box
			ref={elementRef}
			sx={{
				flexGrow: 1,
				width: 200,
				backgroundColor: "rgb(245, 245, 245)",
				boxShadow: "none",
				border: "solid 1px rgba(200, 200, 200, 0.8)",
				borderEndStartRadius: 70,
				borderTopRightRadius: 70,
				"&:hover": {
					borderRadius: 1,
				},
				p: 4,
				opacity: 0,
				transform: "translateX(-100%)",
				transition: `opacity 0.75s ease-in-out ${delay}s, transform 0.75s ease-in-out ${delay}s, border-radius 0.5s ease-in-out 0s`,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 1,
			}}
			textAlign="center">
			<IconButton color="primary">{icon}</IconButton>
			<Typography variant="h4" color="common.black">
				{title}
			</Typography>
			{link ? (
				<Link
					href={link}
					color="common.black"
					rel="noopener noreferrer"
					target="_blank">
					<Typography variant="h6" color="common.black">
						{content}
					</Typography>
				</Link>
			) : (
				<Typography variant="h6" color="common.black">
					{content}
				</Typography>
			)}
		</Box>
	);
};

export default ContactUsCard;
