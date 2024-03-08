import React from "react";
import {
	Card,
	CardContent,
	Typography,
	CardHeader,
	Avatar,
	Box,
} from "@mui/material";

interface Message {
	sender_id: string;
	sender_name: string;
	value: string;
	date: string;
}

interface ChatProps {
	msg: Message;
	user: Pick<User, "id" | "name" | "photo"> | null;
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

const Chat: React.FC<ChatProps> = ({ msg, user }) => {
	return (
		<Card
			style={{
				backgroundColor:
					msg.sender_id === user?.id ? "#00f3b6" : "#9c27b0",
				marginRight: msg.sender_id === user?.id ? "0%" : "50%",
				marginLeft: msg.sender_id === user?.id ? "50%" : "0%",
			}}
			sx={{
				borderRadius: 6,
				marginBottom: 2,
				display: "flex",
				flexDirection: "column",
				maxWidth: "100%",
				overflowWrap: "anywhere",
			}}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Avatar sx={{ marginRight: 1, bgcolor: "black" }}>
					{msg?.sender_name.slice(0, 2)}
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }} color="black">
						{user && msg?.sender_id === user.id
							? "You"
							: msg.sender_name}
					</Typography>
					<Typography color="text.secondary" sx={{ fontSize: 12 }}>
						{getTimeDifference(msg.date)}
					</Typography>
				</Box>
			</CardContent>
			<CardContent sx={{ display: "flex", flexDirection: "column" }}>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{msg.value}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Chat;
