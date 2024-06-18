import { useState, useEffect, useContext } from "react";
import {
	Button,
	Box,
	Stack,
	TextField,
	Container,
	Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useQuery, useMutation } from "@tanstack/react-query";
import AuthContext from "../../store/auth-context";
import { io, Socket } from "socket.io-client";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import MessageBubble from "../ChannelPage/MessageBubble";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import api from "../../api";
import { Controller, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import CircularProgress from "@mui/material/CircularProgress";
import Popup from "../Popup/Popup";
const schema = z.object({
	content: z
		.string()
		.min(1, "Message must not be empty")
		.max(4000, "Message must not exceed 4000 characters"),
});

type MessageSchemaType = z.infer<typeof schema>;

interface ChannelProps {
	courseId: string | number;
	channelId: string | number;
}

const ENDPOINT =
	process.env.NODE_ENV === "development"
		? (process.env.REACT_APP_DEVELOPMENT_END_POINT as string)
		: (process.env.REACT_APP_END_POINT as string);

const Channel = (props: ChannelProps) => {
	const { courseId, channelId } = props;

	const authContext = useContext(AuthContext);
	const user = authContext.user;

	const [socket, setSocket] = useState<Socket | null>(null);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [allMessages, setAllMessages] = useState<Message[]>([]);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<MessageSchemaType>({
		mode: "onBlur",
		resolver: zodResolver(schema),
		defaultValues: {
			content: "",
		},
	});

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
		data: messages,
		error: messagesError,
		isError: ismessagesError,
		status: messagesLoading,
		fetchNextPage: fetchNextPageMessages,
		isFetchingNextPage: isFetchingNextPageMessages,
	} = useInfiniteQuery({
		queryKey: ["channelmessages", { channelId }],
		queryFn: async ({ pageParam = 0 }) => {
			const response = await api.get(`/channels/${channelId}/messages`, {
				params: {
					channel: channelId,
					page: pageParam,
					limit: 15,
					sort: "-createdAt",
				},
			});
			return response.data.data.data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < 15) return undefined;
			return allPages.length + 1;
		},
	});

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView) {
			fetchNextPageMessages();
		}
	}, [fetchNextPageMessages, inView]);

	const {
		mutate: sendMessage,
		isPending: sendMessagePending,
		isError: sendMessageError,
	} = useMutation({
		mutationFn: async (data: MessageSchemaType) =>
			await api.post(`/channels/${channelId}/messages`, {
				...data,
			}),
		onSuccess: (data) => {
			const newMessage: Message = data.data.data.data;

			newMessage.sender = {
				id: user?.id as string,
				name: user?.name as string,
				photo: user?.photo,
			};

			setAllMessages((prevMessages) => [...prevMessages, newMessage]);

			socket?.emit("newMessage", newMessage);
		},
		onError: (error) => {
			console.error("Error sending message", error);
		},
	});

	useEffect(() => {
		if (!user || !channelId) return;

		const newSocket: Socket = io(ENDPOINT);
		setSocket(newSocket);
		newSocket.emit("setup", user.id);
		newSocket.on("connection", () => setSocketConnected(true));
		newSocket.emit("join chat", channelId);

		return () => {
			newSocket.close();
		};
	}, [user, channelId]);

	useEffect(() => {
		if (!socket) return;

		const receiveEditedMessage = (newContent: Message) => {
			const updatedMessages = allMessages?.map((message) => {
				if (message._id === newContent._id) {
					return newContent;
				} else {
					return message;
				}
			});
			setAllMessages(updatedMessages);
		};
		socket.on("new edited message", receiveEditedMessage);

		const messageReceived = (newMessage: Message) => {
			setAllMessages((prevMessages) => [...prevMessages, newMessage]);
		};
		socket.on("message received", messageReceived);

		return () => {
			socket.off("message received", messageReceived);
		};
	}, [socket, allMessages]);

	useEffect(() => {
		if (messages) {
			const newMessages =
				messages?.pages?.[messages?.pages?.length - 1].reverse();
			const msgs = [...newMessages, ...allMessages];
			setAllMessages(msgs);
		}
	}, [messages]);

	const editMessage = (message: Partial<Message>) => {
		const updatedMessages = allMessages?.map((existingMessage) => {
			if (existingMessage._id === message._id) {
				const updatedMessage = { ...existingMessage, ...message };
				socket?.emit("EditedMessage", updatedMessage);
				return updatedMessage;
			} else {
				return existingMessage;
			}
		});
		setAllMessages(updatedMessages);
	};

	const onSubmit = (data: MessageSchemaType) => {
		sendMessage(data);
		reset();
	};

	const [isAtBottom, setIsAtBottom] = useState(true);

	const handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		setIsAtBottom(bottom);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isAtBottom && allMessages.length > 0) {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [allMessages, isAtBottom]);

	return (
		<PageWrapper
			sx={{
				backgroundColor: "#f5f5f5",
			}}>
			<SectionWrapper sx={{ pb: 8 }}>
				<Container maxWidth="lg">
					{messagesLoading === "pending" || channelLoading ? (
						<>
							<Stack
								direction="column"
								justifyContent="flex-start"
								sx={{
									minHeight: "100vh",
									overflowY: "scroll",
									scrollbarWidth: "none",
								}}></Stack>
						</>
					) : messagesLoading === "error" ||
					  channelError ||
					  !channel ||
					  messagesError ||
					  !messages ? (
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
							<Box ref={ref} />
							<Stack
								direction="column"
								justifyContent="flex-start"
								spacing={2}
								sx={{
									minHeight: "100vh",
									overflowY: "scroll",
									scrollbarWidth: "none",
									display: "flex",
								}}>
								{isFetchingNextPageMessages && (
									<Box
										sx={{
											width: "100%",
											alignItems: "center",
											display: "flex",
											justifyContent: "center",
											justifyItems: "center",
											py: 2,
										}}>
										<CircularProgress color="primary" />
									</Box>
								)}
								{allMessages?.map((message) => (
									<MessageBubble
										key={message._id}
										message={message}
										editMessage={editMessage}
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
											channelLoading || channelError
										}
										defaultValue=""
										sx={{
											maxWidth:
												window.innerWidth > 600
													? 550
													: 265,
											backgroundColor: "transparent",
										}}
										placeholder="Send a message..."
										InputProps={{
											sx: {
												borderRadius: 5,
												px: 2,
												backgroundColor: "white",
											},
										}}
										error={!!errors.content}
										helperText={errors?.content?.message}
									/>
								)}
							/>
							<Button
								type="submit"
								variant="outlined"
								size="large"
								disabled={channelLoading || channelError}
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
					<Popup
						heading="Something went wrong..."
						content="A problem occurred while processing your request. Please try again."
						error={true}
						buttonText="Close"
						openPopup={
							sendMessageError || channelError || ismessagesError
						}
						popupFunction={() => {}}
					/>
				</Container>
			</Box>
		</PageWrapper>
	);
};

export default Channel;
