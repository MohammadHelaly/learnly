import { useState, useEffect, useContext } from "react";
import { Button, Box, Stack, TextField, Container } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { io, Socket } from "socket.io-client";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import AnimatedPage from "./AnimatedPage";
import MessageBubble from "../components/ChannelPage/MessageBubble";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";

const ENDPOINT = "http://localhost:5000";

interface Msg {
	value: string;
	sender_id: string;
	sender_name: string;
	roomName: string;
	date: string;
}
const roomname = "1";

const ChannelPage = () => {
	const { courseId, channelId } = useParams();

	const authContext = useContext(AuthContext);
	const { id, name, photo } = authContext.user ?? {};
	const user: Pick<User, "id" | "name" | "photo"> | null =
		id && name ? { id, name, photo } : null; // TODO: look into just passing {...user} as props instead of this

	const [textFieldValue, setTextFieldValue] = useState("");
	const [socket, setSocket] = useState<Socket | null>(null);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [msg, setMessage] = useState<Msg | null>(null);
	const [allMessages, setAllMessages] = useState<Msg[]>([]);

	// TODO: Integrate Socket.io with Database Persistence

	// TODO: Refactor, use React Hook Form and AuthContext

	// TODO: Use React Query to fetch the channel

	// TODO: Use React Query to mutate the messages

	// TODO: Add window scroll to bottom on new message

	useEffect(() => {
		const newSocket: Socket = io(ENDPOINT);
		setSocket(newSocket);
		newSocket.emit("setup", user);
		newSocket.on("connection", () => setSocketConnected(true));
		newSocket.emit("join chat", "1");

		return () => {
			newSocket.close();
		};
	}, []);

	useEffect(() => {
		if (!socket) return;
		const messageReceived = (message: Msg) => {
			console.log("new msg:", message.value);
			setAllMessages((prevMessages) => [...prevMessages, message]);
		};
		socket.on("message received", messageReceived);
		return () => {
			socket.off("message received", messageReceived);
		};
	}, [socket]);

	const sendMessage = (e: any) => {
		if (msg !== null) {
			setAllMessages((prevMessages) => [...prevMessages, msg]);
			if (socket) {
				socket.emit("newMessage", msg); // Assuming `content` should be `msg.value`
				setMessage(null); // Now correctly typed
				setTextFieldValue("");
			}
		}
	};

	return (
		<AnimatedPage>
			<PageWrapper
				sx={{
					backgroundColor: "#f5f5f5",
				}}>
				<SectionWrapper sx={{ pb: 8 }}>
					<Container maxWidth="lg">
						<SectionHeader
							heading=" Chat Room"
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
							sx={{
								minHeight: "100vh",
								overflowY: "scroll",
								scrollbarWidth: "none",
							}}>
							{allMessages.map((m, index) => (
								<MessageBubble msg={m} user={user} />
							))}
						</Stack>
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
						<form
							// onSubmit={handleSubmit(onSubmit)}
							autoComplete="off"
							noValidate>
							<Stack
								direction="row"
								justifyContent="center"
								spacing={2}>
								<TextField
									size="small"
									fullWidth
									multiline
									sx={{
										maxWidth:
											window.innerWidth > 600 ? 550 : 265,
										backgroundColor: "transparent",
									}}
									id="Text-Field"
									placeholder="Send a message..."
									InputProps={{
										sx: {
											borderRadius: 5,
											px: 2,
											backgroundColor: "white",
										},
									}}
									onChange={(e) => {
										setMessage({
											value: e.target.value,
											sender_id:
												user?.id == null
													? "1"
													: (user.id as string),
											sender_name:
												user?.name == null
													? "me"
													: user.name,
											roomName: roomname,
											date: new Date().toISOString(),
										});
										setTextFieldValue(e.target.value);
									}}
									value={textFieldValue}
								/>
								<Button
									variant="outlined"
									size="large"
									endIcon={<Send />}
									onClick={sendMessage}
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
	);
};

export default ChannelPage;
