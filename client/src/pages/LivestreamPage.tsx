import React, { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import Peer, { MediaConnection } from "peerjs";
import {
	IconButton,
	Box,
	Container,
	Drawer,
	Button,
	Menu,
	Stack,
} from "@mui/material";
import {
	Mic,
	MicOff,
	Videocam,
	VideocamOff,
	FiberManualRecord,
	Stop,
} from "@mui/icons-material";
import Livechat from "../components/LiveStreamPage/Livechat";
import DrawerList from "../components/LiveStreamPage/DrawerList";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import SectionWrapper from "../components/UI/PageLayout/SectionWrapper";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import PhoneEnabledRoundedIcon from "@mui/icons-material/PhoneEnabledRounded";
import { CardMedia } from "@mui/material";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import AuthContext from "../store/auth-context";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface PeersRecord {
	[userId: string]: { call: MediaConnection; video: HTMLVideoElement };
}

const LivestreamPage: React.FC = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [roomCount, setRoomCount] = useState<number>(0); // Room count variable

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const ENDPOINT =
		process.env.NODE_ENV === "development"
			? (process.env.REACT_APP_BACKEND_URL_LOCAL as string)
			: (process.env.REACT_APP_BACKEND_URL as string);
	const roomNumber = useParams().roomId;

	const {
		data, //: course,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["courses", { roomNumber }],
		queryFn: async () => await api.get(`/courses/${roomNumber}`),
		select: (response) => response.data.data.data,
	});
	const course = data;
	const authContext = useContext(AuthContext);

	const {
		mutate: setInstructorLive,
		isError: setInstructorLiveError,
		isPending: setInstructorLivePending,
		isSuccess: setInstructorLiveSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.patch(`/courses/${roomNumber}`, {
				livestream: true,
			});
		},
		onSuccess: (response) => {},
		onError: (error) => {},
	});

	const {
		mutate: setInstructorOffline,
		isError: setInstructorOfflineError,
		isPending: setInstructorOfflinePending,
		isSuccess: setInstructorOfflineSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.patch(`/courses/${roomNumber}`, {
				livestream: false,
			});
		},
		onSuccess: (response) => {},
		onError: (error) => {},
	});

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

		const myPeer = new Peer("", {
			host: "/",
			port: Number(process.env.REACT_APP_PEERJS_PORT as string),
		});

		myPeer.on("open", (id) => {
			socket.emit("get-room-size", roomNumber, (count: number) => {
				// setIsInitiator(count === 0);
				// if (count === 0) {
				// 	setInstructorLive();
				// }
				if (authContext.user?.id) {
					if (authContext.user?.id === course?.instructors[0]._id) {
						setIsInitiator(true);
						setInstructorLive();
					}
				}
				setRoomCount(count + 1); // Increment count for the joining user
				console.log("Room count", count);
				socket.emit("join-room", roomNumber, id);
			});
		});

		if (isInitiator) {
			navigator.mediaDevices
				.getUserMedia({
					video: true,
					audio: true,
				})
				.then((stream) => {
					if (videoGrid.current) {
						addVideoStream(myVideo.current, stream);
					}

					socket.on("user-connected", (userId) => {
						connectToNewUser(userId, stream, myPeer);
						setRoomCount((prev) => prev + 1); // Increment room count
					});
				});
		} else {
			socket.on("user-connected", (userId) => {
				setRoomCount((prev) => prev + 1); // Increment room count
			});
		}

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
			setRoomCount((prev) => prev - 1); // Decrement room count
		});

		myPeer.on("call", (call) => {
			call.answer(); // Answer the call with an empty stream since non-initiators don't share video
			const video = document.createElement("video");
			call.on("stream", (userVideoStream) => {
				addVideoStream(video, userVideoStream);
			});

			call.on("close", () => {
				video.remove();
			});

			call.on("error", (error: any) => {
				console.error("Call error:", error);
			});
		});

		return () => {
			socket.close();
			Object.values(peers).forEach((peer) => {
				peer.call.close();
				peer.video.remove();
			});
		};
	}, [isInitiator, course, authContext.user?.id]);

	function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
		video.srcObject = stream;
		video.addEventListener("loadedmetadata", () => {
			video.play().catch((error) => {
				console.error("Failed to play video:", error);
			});
		});
		video.style.width = "100%";
		video.style.height = "100%";
		video.style.borderRadius = "20px";
		video.style.objectFit = "cover";

		if (videoGrid.current && videoGrid.current.children.length === 0) {
			// Only add video if none is displayed
			videoGrid.current.append(video);
		}
	}

	function connectToNewUser(
		userId: string,
		stream: MediaStream,
		myPeer: Peer
	) {
		const call = myPeer.call(userId, stream);
		const video = document.createElement("video");
		call.on("stream", (userVideoStream) => {
			if (!peers[userId]) {
				// Prevent adding if already there
				addVideoStream(video, userVideoStream);
			}
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
			<DrawerList toggleDrawerFlag={openDrawer} />
			<PageWrapper
				sx={{
					backdropFilter: "blur(8px)",
					backgroundColor: "transparent",
					color: "transparent",
					maxHeight: "100vh",
					mt: 0,
					mb: 0,
				}}
			>
				<Stack
					direction="column"
					spacing={0.1}
					display="flex"
					justifyContent="flex-start"
					sx={{ mt: 8, mb: 0, pb: 0 }}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center", // Center the entire grid
							height: "100%",
							mt: window.innerWidth > 600 ? 8 : 7,
						}}
					>
						<Box
							sx={{
								overflowX: "auto", // Allows horizontal scrolling
								width: "100%", // Occupy full width
								maxWidth: "90%", // Prevents grid from stretching fully
								display: "flex",
								justifyContent: "center", // Center grid content
								height: "100%",
							}}
						>
							<div
								ref={videoGrid}
								id="video-grid"
								style={{
									display: "grid",
									gridTemplateColumns:
										roomCount >= 2
											? "repeat(1, 1fr)" // Adjust columns count
											: "repeat(1, 1fr)",
									gridAutoRows:
										roomCount >= 2 ? "560px" : "560px",
									gap: "20px",
									padding: "0 20px", // Padding to ensure grid is centered
									justifyItems: "center", // Center individual items in the grid
								}}
							/>
						</Box>
					</Box>

					<Box
						sx={{
							zIndex: 10,
							mx: "auto",
							pt: 3,
							bottom: 0,
							width: "100%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							gap: 2,
							alignContent: "center",
							justifyItems: "center",
						}}
					>
						{isInitiator && (
							<>
								<IconButton
									onClick={toggleMute}
									color="primary"
									sx={{
										backgroundColor: "white",
										borderRadius: "100%",
									}}
								>
									{muted ? <MicOff /> : <Mic />}
								</IconButton>
								<IconButton
									onClick={toggleCamera}
									color="primary"
									sx={{
										backgroundColor: "white",
										borderRadius: "100%",
									}}
								>
									{cameraEnabled ? (
										<Videocam />
									) : (
										<VideocamOff />
									)}
								</IconButton>
							</>
						)}

						{isInitiator && (
							<>
								<IconButton
									onClick={
										recording
											? stopRecording
											: startRecording
									}
									color="primary"
									sx={{
										backgroundColor: "white",
										borderRadius: "100%",
									}}
								>
									{recording ? (
										<Stop />
									) : (
										<FiberManualRecord />
									)}
								</IconButton>
							</>
						)}
						<IconButton
							color="primary"
							sx={{
								backgroundColor: "white",
								borderRadius: "100%",
							}}
							onClick={toggleDrawer}
						>
							<ChatRoundedIcon />
						</IconButton>
						<IconButton
							// component={NavLink}
							// to={
							// 	isInitiator
							// 		? `/dashboard/teach/courses/${roomNumber}`
							// 		: `/dashboard/learn/courses/${roomNumber}`
							// }
							sx={{
								color: "white",
								backgroundColor: "red",
								borderRadius: "100%",
								"&:hover": {
									backgroundColor: "red",
									color: "white",
								},
							}}
							onClick={() => {
								if (isInitiator) {
									setInstructorOffline();
									while (setInstructorLivePending) {
										console.log(
											"Waiting for instructor to go offline"
										);
									}

									window.location.href = `/dashboard/teach/courses/${roomNumber}`;
								} else {
									window.location.href = `/dashboard/learn/courses/${roomNumber}`;
								}
							}}
						>
							<CallEndRoundedIcon />
						</IconButton>
						{!isInitiator && (
							<IconButton
								onClick={() => {
									if (
										videoGrid.current &&
										videoGrid.current.children.length > 0
									) {
										(
											videoGrid.current
												.children[0] as HTMLVideoElement
										).play();
									}
								}}
								color="primary"
								sx={{
									backgroundColor: "white",
									borderRadius: "100%",
								}}
							>
								<Videocam />
							</IconButton>
						)}
					</Box>
				</Stack>
			</PageWrapper>
		</>
	);
};

export default LivestreamPage;
