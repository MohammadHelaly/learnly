const express = require("express");
const morgan = require("morgan");
const courseRouter = require("./routes/courseRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const app = express();

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// GLOBAL MIDDLEWARE

// Implement CORS , allow only the frontend to access the API and allow cookies
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "development"
				? process.env.FRONTEND_URL_LOCAL
				: process.env.FRONTEND_URL,
		credentials: true,
	})
);

// Compression
app.use(compression());

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Parse data from forms
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
	hpp({
		whitelist: [
			"ratingsQuantity",
			"ratingsAverage",
			"price",
			"name",
			// TODO: Check what to whitelist
		],
	})
);

// ROUTES
// app.use("/", viewRouter); in case we have a view router to serve the frontend from the backend
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
