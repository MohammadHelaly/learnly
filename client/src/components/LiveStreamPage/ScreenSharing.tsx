import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer, { MediaConnection } from "peerjs";
import {
	IconButton,
	Box,
	Container,
	Drawer,
	Button,
	Menu,
} from "@mui/material";
import {
	Mic,
	MicOff,
	Videocam,
	VideocamOff,
	FiberManualRecord,
	Stop,
} from "@mui/icons-material";

interface PeersRecord {
	[userId: string]: { call: MediaConnection; video: HTMLVideoElement };
}

const ScreenSharing: React.FC = () => {
	const ENDPOINT =
		process.env.NODE_ENV === "development"
			? (process.env.REACT_APP_BACKEND_URL_LOCAL as string)
			: (process.env.REACT_APP_BACKEND_URL as string);
	const roomNumber = 123;
	const videoGrid = useRef<HTMLDivElement>(null);
	const myVideo = useRef<HTMLVideoElement>(document.createElement("video"));
	const [peers, setPeers] = useState<PeersRecord>({});
	const [muted, setMuted] = useState<boolean>(false);
	const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
	const [isInitiator, setIsInitiator] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	const [recording, setRecording] = useState<boolean>(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
			});
			mediaStreamRef.current = stream;

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;

			const chunks: BlobPart[] = [];
			mediaRecorder.ondataavailable = (event) => {
				chunks.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const blob = new Blob(chunks, { type: "video/webm" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				document.body.appendChild(a);
				a.style.display = "none";
				a.href = url;
				a.download = "screen-recording.webm";
				a.click();
				window.URL.revokeObjectURL(url);
			};

			mediaRecorder.start();
			setRecording(true);
		} catch (error) {
			console.error("Error starting screen recording:", error);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && mediaStreamRef.current) {
			mediaRecorderRef.current.stop();
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
			setRecording(false);
		}
	};

	useEffect(() => {
		const socket = io(ENDPOINT);
		myVideo.current.muted = true;

		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: false,
			})
			.then((stream) => {
				if (videoGrid.current) {
					addVideoStream(myVideo.current, stream);
				}

				const myPeer = new Peer("", {
					host: "/",
					port: 3001,
				});

				myPeer.on("open", (id) => {
					socket.emit(
						"get-room-size",
						roomNumber,
						(count: number) => {
							setIsInitiator(count === 0);
							socket.emit("join-room", roomNumber, id);

							if (count === 0) {
								addVideoStream(myVideo.current, stream);
							}
						}
					);
				});

				socket.on("user-connected", (userId) => {
					if (isInitiator && !peers[userId]) {
						connectToNewUser(userId, stream, myPeer);
					}
				});

				socket.on("user-disconnected", (userId) => {
					if (peers[userId]) {
						peers[userId].video.remove();
						peers[userId].call.close();
						setPeers((prevPeers) => {
							const newPeers = { ...prevPeers };
							delete newPeers[userId];
							return newPeers;
						});
					}
				});

				myPeer.on("call", (call) => {
					call.answer(stream);
					const video = document.createElement("video");
					call.on("stream", (userVideoStream) => {
						if (!isInitiator) {
							addVideoStream(video, userVideoStream);
						}
					});
				});
			});

		return () => {
			socket.close();
			Object.values(peers).forEach((peer) => {
				peer.call.close();
				peer.video.remove();
			});
		};
	}, [isInitiator]); // Depend on isInitiator to react to its changes

	function connectToNewUser(
		userId: string,
		stream: MediaStream,
		myPeer: Peer
	) {
		const call = myPeer.call(userId, stream);
		const video = document.createElement("video");
		call.on("stream", (userVideoStream) => {
			addVideoStream(video, userVideoStream);
		});

		call.on("close", () => {
			video.remove();
		});

		call.on("error", (error: any) => {
			console.error("Call error with", userId, error);
		});

		setPeers((prevPeers) => ({
			...prevPeers,
			[userId]: { call, video },
		}));
	}

	function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
		video.srcObject = stream;
		video.addEventListener("loadedmetadata", () => {
			video.play();
		});
		video.style.width = "100%"; // Ensures video fills the cell
		video.style.height = "100%"; // Ensures video fills the cell
		if (videoGrid.current) {
			videoGrid.current.append(video);
		}
	}

	const toggleMute = () => {
		if (myVideo.current) {
			myVideo.current.muted = !myVideo.current.muted;
			setMuted(myVideo.current.muted);
		}
	};

	const toggleCamera = () => {
		if (myVideo.current.srcObject) {
			const tracks = (
				myVideo.current.srcObject as MediaStream
			).getVideoTracks();
			tracks.forEach((track) => {
				track.enabled = !track.enabled;
			});
			setCameraEnabled((prev) => !prev);
		}
	};

	return (
		<>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: "flex",
						flexDirection: "row", // Ensure elements are laid out horizontally
						justifyContent: "flex-end", // Align elements to the far right
						height: "100%",
						mt: window.innerWidth > 600 ? 8 : 7,
					}}>
					<Box
						sx={{
							width: "100%", // This controls the width of the video grid container
							maxWidth: "80%", // Add a maxWidth to ensure it does not expand unexpectedly
						}}>
						<div
							ref={videoGrid}
							id="video-grid"
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(auto-fill, minmax(400px, 1fr))",
								gridAutoRows: "400px",
								gap: "20px",
								justifyContent: "start",
								padding: "10px",
							}}
						/>
					</Box>
				</Box>
			</Container>
			<Box
				sx={{
					zIndex: 10,
					mx: "auto",
					py: 4,
					bottom: 0,
					position: "fixed",
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
					alignContent: "center",
					justifyItems: "center",
				}}>
				<IconButton
					onClick={toggleMute}
					color="primary"
					sx={{ backgroundColor: "white", borderRadius: "100%" }}>
					{muted ? <MicOff /> : <Mic />}
				</IconButton>
				<IconButton
					onClick={toggleCamera}
					color="primary"
					sx={{ backgroundColor: "white", borderRadius: "100%" }}>
					{cameraEnabled ? <VideocamOff /> : <Videocam />}
				</IconButton>
				<IconButton
					onClick={recording ? stopRecording : startRecording}
					color="primary"
					sx={{ backgroundColor: "white", borderRadius: "100%" }}>
					{recording ? <Stop /> : <FiberManualRecord />}
				</IconButton>
			</Box>
		</>
	);
};

export default ScreenSharing;
