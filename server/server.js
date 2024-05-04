const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
	console.log(err.name, err.message);
	console.log("Uncaught exception. Shutting down...");
	process.exit(1);
});

const app = require("./app");

const db =
	process.env.NODE_ENV === "development"
		? process.env.DATABASE_LOCAL
		: process.env.DATABASE.replace(
				"<password>",
				process.env.DATABASE_PASSWORD
		  );

mongoose
	.connect(db)
	.then(() => {
		console.log("Database connection successful");
	})
	.catch((err) => {
		console.log(err);
	});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(
		`Server is up and running on port ${port} - ${process.env.NODE_ENV}`
	);
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	console.log("Unhandled rejection. Shutting down...");
	server.close(() => {
		process.exit(1);
	});
});

process.on("SIGTERM", () => {
	console.log("SIGTERM RECEIVED. Shutting down gracefully.");
	server.close(() => {
		console.log("Process terminated.");
	});
});

const io = require("socket.io")(server, {
	pingTimeout: 60 * 1000,
	cors: {
		origin:
			process.env.NODE_ENV === "development"
				? process.env.FRONTEND_URL_LOCAL
				: process.env.FRONTEND_URL,
	},
});

io.on("connection", (socket) => {
	console.log("connected to socket.io");

	socket.on("setup", (userId) => {
		socket.join(userId);
		console.log("joined", userId);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("joined chat", room);
	});

	socket.on("newMessage", (newMessage) => {
		if (newMessage && newMessage.channel) {
			socket.in(newMessage.channel).emit("message received", newMessage);
		} else {
			console.error(newMessage);
			console.error("Invalid message format:", newMessage);
		}
	});

	socket.on("EditedMessage", (newContent) => {
		if (newContent && newContent.channel) {
			socket
				.in(newContent.channel)
				.emit("new edited message", newContent);
		}
	});

	
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId);
		socket.to(roomId).emit('user-connected', userId);
	
		socket.on('disconnect', () => {
			socket.to(roomId).emit('user-disconnected', userId);
		});
	});

	
	socket.on('get-room-size', (roomId, callback) => {
		const room = io.sockets.adapter.rooms.get(roomId);
		const count = room ? room.size : 0;
		callback(count);
	});

	socket.on('join-live-chat',(roomId)=>{
		//join chat room of live meeting
		socket.join(roomId)
	})

	socket.on('send-live-chat-msg',(payload)=>{
		console.log(payload.msg.text,payload.msg.sender,payload.room)
		socket.broadcast.to(100).emit('receive-msg', payload.msg);
	})

});
