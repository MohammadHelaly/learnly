import { useState, useEffect, useContext } from "react";
import { Button, Box, Stack, TextField, Container } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../store/auth-context";
import { io, Socket } from "socket.io-client";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import AnimatedPage from "./AnimatedPage";
import MessageBubble from "../components/ChannelPage/MessageBubble";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import api from "../api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorWarning from "../components/UI/Messages/ErrorWarning";
import NavigationGuard from "../components/Navigation/NavigationGuard";

const schema = z.object({
	content: z
		.string()
		.min(1, "Message must not be empty")
		.max(4000, "Message must not exceed 4000 characters"),
});

type MessageSchemaType = z.infer<typeof schema>;

const ENDPOINT = "http://localhost:5000";

const ChannelPage = () => {
	const { courseId, channelId } = useParams();

	const authContext = useContext(AuthContext);
	const user = authContext.user;

	const [socket, setSocket] = useState<Socket | null>(null);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [message, setMessage] = useState<Partial<Message> | null>(null);
	const [allMessages, setAllMessages] = useState<Partial<Message>[]>([]);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<MessageSchemaType>({
		mode: "onBlur",
		resolver: zodResolver(schema),
		defaultValues: {
			content: "",
		},
	});

	const queryClient = useQueryClient();

	const {
		data: channel,
		isLoading: channelLoading,
		isError: channelError,
	} = useQuery({
		queryKey: ["channel", { courseId, channelId }],
		queryFn: async () => await api.get(`/channels/${channelId}`),
		select: (response) => response.data.data.data,
	});

	const {
		mutate,
		isPending: sendMessagePending,
		isError: sendMessageError,
	} = useMutation({
		mutationFn: async (data: MessageSchemaType) =>
			await api.post(`/channels/${channelId}/messages`, {
				...data,
			}),
		onSuccess: (data) => {
			console.log("Message sent successfully", data);
			queryClient.invalidateQueries({
				queryKey: ["channel", { courseId, channelId }],
			});
		},
		onError: (error) => {
			console.error("Error sending message", error);
			alert("Error sending message. Please try again later.");
		},
	});

	useEffect(() => {
		if (!channelId) return;
		const newSocket: Socket = io(ENDPOINT);
		setSocket(newSocket);
		newSocket.emit("setup", user?.id);
		newSocket.on("connection", () => setSocketConnected(true));
		newSocket.emit("join chat", channelId);

		return () => {
			newSocket.close();
		};
	}, []);

	useEffect(() => {
		if (!socket) return;
		const messageReceived = (newMessage: Message) => {
			console.log("new message:", newMessage.content);
			setAllMessages((prevMessages) => [...prevMessages, newMessage]);
		};
		socket.on("message received", messageReceived);
		return () => {
			socket.off("message received", messageReceived);
		};
	}, [socket]);

	useEffect(() => {
		if (channel?.messages) {
			setAllMessages(channel.messages);
		}
	}, [channel]);

	useEffect(() => {
		const subscription = watch((value) => {
			if (user && channelId && value?.content) {
				setMessage({
					content: value?.content,
					sender: {
						id: user.id,
						name: user.name,
						photo: user.photo,
					},
					channel: channelId,
				});
			}
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const onSubmit = (data: MessageSchemaType) => {
		mutate(data);

		message && setAllMessages((prevMessages) => [...prevMessages, message]);

		if (socket) {
			socket.emit("newMessage", message);
		}

		reset();

		setMessage(null);
	};

	return (
		<NavigationGuard>
			<AnimatedPage>
				<PageWrapper
					sx={{
						backgroundColor: "#f5f5f5",
					}}>
					<SectionWrapper sx={{ pb: 8 }}>
						<Container maxWidth="lg">
							{channelLoading ? (
								<Stack
									direction="column"
									justifyContent="flex-start"
									sx={{
										minHeight: "100vh",
										overflowY: "scroll",
										scrollbarWidth: "none",
									}}></Stack>
							) : channelError || !channel ? (
								<ErrorWarning />
							) : (
								<>
									<SectionHeader
										heading={channel?.name}
										headingAlignment="left"
										sx={{
											pb: 1,
											borderBottom: 1,
											borderColor: "divider",
										}}
									/>
									<Stack
										direction="column"
										justifyContent="flex-start"
										spacing={2}
										sx={{
											minHeight: "100vh",
											overflowY: "scroll",
											scrollbarWidth: "none",
										}}>
										{allMessages.map((message, index) => (
											<MessageBubble
												key={index}
												message={message}
											/>
										))}
									</Stack>
								</>
							)}
						</Container>
					</SectionWrapper>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						position="fixed"
						sx={{
							position: "fixed",
							bottom: 0,
							width: "100vw",
							backgroundColor: "white",
							py: 2,
							boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.25)",
							transition: "all 0.5s ease-in-out",
							zIndex: 2,
						}}>
						<Container maxWidth="lg">
							<form onSubmit={handleSubmit(onSubmit)} noValidate>
								<Stack
									direction="row"
									justifyContent="center"
									spacing={2}>
									<Controller
										name="content"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												size="small"
												fullWidth
												multiline
												disabled={
													channelLoading ||
													channelError
												}
												defaultValue=""
												sx={{
													maxWidth:
														window.innerWidth > 600
															? 550
															: 265,
													backgroundColor:
														"transparent",
												}}
												placeholder="Send a message..."
												InputProps={{
													sx: {
														borderRadius: 5,
														px: 2,
														backgroundColor:
															"white",
													},
												}}
												error={!!errors.content}
												helperText={
													errors?.content?.message
												}
											/>
										)}
									/>
									<Button
										type="submit"
										variant="outlined"
										size="large"
										disabled={
											channelLoading || channelError
										}
										disableElevation
										endIcon={<Send />}
										sx={{
											backgroundColor: "white",
											color: "primary.main",
											"&:hover": {
												backgroundColor: "primary.main",
												color: "white",
											},
										}}>
										Send
									</Button>
								</Stack>
							</form>
						</Container>
					</Box>
				</PageWrapper>
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default ChannelPage;
