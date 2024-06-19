import React, { useState, ChangeEvent, useEffect } from "react"; // Import ChangeEvent here
import { TextField, Button, Box, Stack } from "@mui/material";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

type Msg = {
	text: string;
	sender: string;
	name: string;
};

const ENDPOINT =
	process.env.NODE_ENV === "development"
		? (process.env.REACT_APP_BACKEND_URL_LOCAL as string)
		: (process.env.REACT_APP_BACKEND_URL as string);
const socket = io(ENDPOINT);

const Livechat: React.FC = () => {
	const roomNumber = useParams().roomId + "chat";
	const [email, setEmail] = useState<string>();
	const [name, setName] = useState<string>();
	const [msg, setMsg] = useState<Msg | undefined>(undefined);
	const [Allmsg, setAllMsg] = useState<Msg[]>([]);

	useEffect(() => {
		const socket = io(ENDPOINT);
		socket.emit("join-live-chat", roomNumber);

		const userInfo = localStorage.getItem("user");
		if (userInfo) {
			const userObject = JSON.parse(userInfo);
			if (userObject.email) {
				setEmail(userObject.email);
			}
			if (userObject.name) {
				setName(userObject.name);
			}
		}

		const handleReceiveMessage = (message: Msg) => {
			console.log("Message received:", message);
			setAllMsg((prevMessages) => [...prevMessages, message]);
		};

		socket.on("receive-msg", handleReceiveMessage);

		return () => {
			socket.off("receive-msg", handleReceiveMessage);
			socket.close();
		};
	}, [email, name]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMsg({
			text: e.target.value,
			sender: email || "no-email",
			name: name || "anonymous",
		}); // Example setting sender statically
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (msg) {
			sendData(msg);
			setMsg(undefined);
		}
	};

	return (
		<Box
			component="form"
			sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}>
			<Stack
				direction="column"
				display="flex"
				justifyContent="space-between"
				spacing={2}>
				<div>
					{Allmsg.map((msg, index) => (
						<div
							key={index}
							style={{
								background: "white",
								margin: "10px auto", // Center the cards horizontally
								padding: "10px",
								boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
								borderRadius: "5px",
								width: "100%", // Adjust width here
								maxWidth: "600px", // Optional max width
							}}>
							<p>
								{msg.name}: {msg.text}
							</p>
						</div>
					))}
				</div>
				<Stack
					direction="row"
					spacing={3}
					sx={{
						width: "100%",
						position: "fixed",
						bottom: 0,
						left: 1138,
						backgroundColor: "#f5f5f5",
						border: 1,
						borderTop: 1,
						borderColor: "divider",
						padding: "16px",

						overflow: "hidden",
						boxShadow: "none !important",
					}}>
					<TextField
						label="Message"
						variant="outlined"
						value={msg?.text || ""}
						onChange={handleChange}
						required
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ width: "5%" }}>
						Send
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
	function sendData(data: Msg) {
		//add to allmsgs
		socket.emit("send-live-chat-msg", { msg: data, room: roomNumber });
	}
};

// Function to simulate data sending

export default Livechat;
