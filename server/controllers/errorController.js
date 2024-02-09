const AppError = require("../utils/appError");

const handleDBCastError = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDBDuplicateError = (err) => {
	const message = `Duplicate field value: ${err.keyValue.name}. Please use another value.`;
	return new AppError(message, 400);
};

const handleDBValidationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
};

const handleJWTError = (err) => {
	return new AppError("Invalid token. Please log in again.", 401);
};

const sendErrorDev = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith("/api")) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}

	// B) RENDERED WEBSITE
	console.error("ERROR 💥", err);
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: err.message,
	});
};

const sendErrorProd = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith("/api")) {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		}
		// B) Programming or other unknown error: don't leak error details
		// 1) Log error
		console.error("ERROR", err);
		// 2) Send generic message
		return res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}

	// B) RENDERED WEBSITE
	// A) Operational, trusted error: send message to client
	if (err.isOperational) {
		console.log(err);
		return res.status(err.statusCode).render("error", {
			title: "Something went wrong!",
			msg: err.message,
		});
	}
	// B) Programming or other unknown error: don't leak error details
	// 1) Log error
	console.error("ERROR", err);
	// 2) Send generic message
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: "Please try again later.",
	});
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		error.message = err.message;

		if (error.name === "CastError") error = handleDBCastError(error);
		if (error.code === 11000) error = handleDBDuplicateError(error);
		if (error.name === "ValidationError")
			error = handleDBValidationError(error);
		if (error.name === "JsonWebTokenError") error = handleJWTError(error);
		if (error.name === "TokenExpiredError") error = handleJWTError(error);

		// Can add more error types here if needed (e.g. JWT errors) and create a handler for them above
		sendErrorProd(error, req, res);
	}
};
