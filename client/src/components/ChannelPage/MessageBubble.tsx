import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import {
	Card,
	CardContent,
	Typography,
	Avatar,
	Box,
	Button,
	TextField,
	IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import formatDate from "../../utils/formatDate";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	content: z
		.string()
		.min(1, "Message must not be empty")
		.max(4000, "Message must not exceed 4000 characters"),
});

type MessageSchemaType = z.infer<typeof schema>;

interface MessageBubbleProps {
	message: Message;
	editMessage: (message: Partial<Message>) => void;
}

const MessageBubble = (props: MessageBubbleProps) => {
	const { message, editMessage } = props;

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<MessageSchemaType>({
		mode: "onBlur",
		resolver: zodResolver(schema),
		defaultValues: {
			content: message.content,
		},
	});

	const authContext = useContext(AuthContext);
	const user = authContext.user;

	const [isEditing, setIsEditing] = useState(false);

	const isCurrentUserMessage = message.sender?.id === user?.id;
	const isDeleted = message.deleted;

	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	const { mutate, isPending, isError } = useMutation({
		mutationFn: async (data: any) => {
			api.patch(`/channels/${message.channel}/messages/${message._id}`, {
				...data,
			});
		},
		onError: (error) => {
			console.error("Error editing message", error);
			alert("Error editing message. Please try again later.");
		},
	});

	const handleEdit = (data: Partial<Message>) => {
		if (!data.deleted && !data.content) return;
		mutate(data);
		editMessage({ ...message, ...data });
		setIsEditing(false);
	};

	const onSubmit = (data: MessageSchemaType) => {
		handleEdit({ ...data, edited: true });
	};

	const deleteMessage = () => {
		handleEdit({ deleted: true, content: "Deleted message." });
	};

	const renderActions = () => {
		if (isDeleted || !isCurrentUserMessage || message._id == undefined)
			return null;
		return (
			<Box sx={{ marginLeft: "auto", display: "flex" }}>
				<IconButton onClick={toggleEdit}>
					<Edit sx={{ color: "white" }} />
				</IconButton>
				<IconButton onClick={deleteMessage}>
					<Delete sx={{ color: "white" }} />
				</IconButton>
			</Box>
		);
	};

	return (
		<Box
			sx={{
				gap: 1,
				display: "flex",
				flexDirection: "column",
				alignSelf: isCurrentUserMessage ? "flex-end" : "flex-start",
				width: window.innerWidth > 600 ? "50%" : "80%",
			}}>
			<Card
				sx={{
					borderRadius: 6,
					display: "flex",
					flexDirection: "column",
					overflowWrap: "anywhere",
					backgroundColor: isDeleted
						? "lightgrey"
						: isCurrentUserMessage
						? "primary.dark"
						: "white",
					boxShadow: "none",
				}}>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Avatar
						src={message.sender?.photo?.url}
						sx={{
							marginRight: 1,
							backgroundColor: isDeleted
								? "black"
								: isCurrentUserMessage
								? "white"
								: "#B5C0D0",
							color: isDeleted
								? "white"
								: isCurrentUserMessage
								? "primary.dark"
								: "white",
						}}>
						{message.sender?.name?.slice(0, 1)}
					</Avatar>
					<Box>
						<Typography
							sx={{
								fontWeight: "bold",
								color:
									!isCurrentUserMessage || isDeleted
										? "black"
										: "white",
							}}>
							{isCurrentUserMessage
								? "You"
								: message.sender?.name}
						</Typography>
						<Typography
							sx={{
								fontSize: 12,
								color:
									!isCurrentUserMessage || isDeleted
										? "black"
										: "white",
							}}>
							{formatDate(message.createdAt as string)}{" "}
							{message.edited && !message.deleted && "(edited)"}
						</Typography>
					</Box>
					{renderActions()}
				</CardContent>
				<CardContent sx={{ display: "flex", flexDirection: "column" }}>
					<Typography
						variant="h6"
						sx={{
							color:
								isDeleted || !isCurrentUserMessage
									? "black"
									: "white",
						}}>
						{isDeleted ? "Deleted message." : message.content}
					</Typography>
				</CardContent>
			</Card>
			{isEditing && (
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 2,
						}}>
						<Controller
							name="content"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									size="small"
									multiline
									defaultValue={message.content}
									sx={{
										backgroundColor: "transparent",
										flexGrow: 1,
									}}
									placeholder="Edit your message..."
									InputProps={{
										sx: { borderRadius: 5, px: 2 },
									}}
								/>
							)}
						/>
						<Button
							type="submit"
							color="primary"
							variant="outlined"
							size="large"
							endIcon={<Edit />}>
							Edit
						</Button>
					</Box>
				</form>
			)}
		</Box>
	);
};

export default MessageBubble;
