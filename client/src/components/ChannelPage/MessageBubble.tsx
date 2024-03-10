import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

interface MessageBubbleProps {
	message: Partial<Message>;
}

function getTimeDifference(dateString: string): string {
	const inputDate = new Date(dateString);
	const currentDate = new Date();
	const timeDifference = currentDate.getTime() - inputDate.getTime();
	const minutesDifference = Math.floor(timeDifference / (1000 * 60));
	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

	if (minutesDifference < 1) {
		return "just now";
	} else if (minutesDifference < 60) {
		return `${minutesDifference} minutes ago`;
	} else {
		return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
	}
}

const MessageBubble = (props: MessageBubbleProps) => {
	const { message } = props;
	const authContext = useContext(AuthContext);
	const user = authContext.user;

	return (
		<Card
			sx={{
				borderRadius: 6,
				display: "flex",
				flexDirection: "column",
				overflowWrap: "anywhere",
				backgroundColor:
					message?.sender?.id === user?.id ? "#00f3b6" : "#9c27b0",
				alignSelf:
					message?.sender?.id === user?.id
						? "flex-end"
						: "flex-start",
				width: window.innerWidth > 600 ? "50%" : "80%",
				boxShadow: "none",
			}}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Avatar
					src={message?.sender?.photo?.url}
					sx={{ marginRight: 1, bgcolor: "black" }}>
					{message?.sender?.name.slice(0, 1)}
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }} color="black">
						{message?.sender?.id === user?.id
							? "You"
							: message?.sender?.name}
					</Typography>
					<Typography color="text.secondary" sx={{ fontSize: 12 }}>
						{getTimeDifference(message.createdAt as string)}
					</Typography>
				</Box>
			</CardContent>
			<CardContent sx={{ display: "flex", flexDirection: "column" }}>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{message.content}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default MessageBubble;
