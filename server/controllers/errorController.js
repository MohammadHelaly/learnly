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
	return res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res) => {
	// Operational, trusted error: send message to client
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	// Programming or other unknown error: don't leak error details
	console.error("ERROR", err);

	return res.status(500).json({
		status: "error",
		message: "Something went very wrong!",
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
