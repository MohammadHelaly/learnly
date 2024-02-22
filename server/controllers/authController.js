const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const Email = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id);

	// 1) Set cookie options
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: true,
		sameSite: "none",
	};

	// 2) Send cookie
	res.cookie("jwt", token, cookieOptions);

	// 3) Remove password from output
	user.password = undefined;

	// 4) Send response
	res.status(statusCode).json({
		status: "success",
		token: token,
		data: {
			user: user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	// 1) Get user input
	const { name, email, password, passwordConfirm } = req.body;

	// 2) Create new user
	const user = await User.create({
		name: name,
		email: email,
		password: password,
		passwordConfirm: passwordConfirm,
	});

	// 3) Create and send token
	createSendToken(user, 201, req, res);

	// 4) Send welcome email
	try {
		const url = `http://localhost:3000/catalog`; // const url = process.env.FRONTEND_URL //	const url = `${req.protocol}://${req.get("host")}/me`;  // const url = `${process.env.PROTOCOL}://${process.env.HOST}/me`;
		await new Email(user, url).sendWelcome();
	} catch (err) {
		return next(
			new AppError(
				"There was an error sending the email. Try again later!",
				500
			)
		);
	}
});

exports.login = catchAsync(async (req, res, next) => {
	// 1) Get user input
	const { email, password } = req.body;

	// 2) Check if email and password exist
	if (!email || !password) {
		return next(new AppError("Please provide email and password"));
	}

	// 3) Check if user exists && password is correct
	const user = await User.findOne({ email: email }).select("+password");

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401));
	}

	// 4) If everything is ok, send token to client
	createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Get token and check if it exists
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
		console.log("header " + token);
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
		console.log("cookie " + token);
	}

	if (!token) {
		return next(
			new AppError(
				"You are not logged in! Please log in to get access.",
				401
			)
		);
	}

	// 2) Verify token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	console.log(decoded);

	// 3) Check if user still exists
	const user = await User.findById(decoded.id);
	if (!user) {
		return next(
			new AppError(
				"The user belonging to this token does no longer exist.",
				401
			)
		);
	}

	// 4) Check if user changed password after the token was issued
	if (user.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError(
				"User recently changed password! Please log in again.",
				401
			)
		);
	}

	// 5) Grant access to protected route
	req.user = user;
	next();
});

exports.isLoggedIn = async (req, res, next) => {
	// 1) Get token and check if it exists
	if (req.cookies.jwt) {
		try {
			// 2) Verify token
			const decoded = await promisify(jwt.verify)(
				req.cookies.jwt,
				process.env.JWT_SECRET
			);
			console.log(decoded);

			// 3) Check if user still exists
			const user = await User.findById(decoded.id);
			if (!user) {
				// return next();
				res.status(200).json({
					status: "success",
					data: {
						user: null,
					},
				});
			}

			// 4) Check if user changed password after the token was issued
			if (user.changedPasswordAfter(decoded.iat)) {
				// return next();
				res.status(200).json({
					status: "success",
					data: {
						user: null,
					},
				});
			}

			// 6) There is a logged in user, so we pass the user data to the frontend (except the password)
			// res.locals.user = user;
			// return next();
			user.password = undefined;

			res.status(200).json({
				status: "success",
				data: {
					user: user,
				},
			});
		} catch (err) {
			return next(
				new AppError("There was an error. Please try again later.", 500)
			);
			// return next();
		}
	}
	// next();
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// Check if user role is included in the roles array, if not, return error
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(
					"You do not have permission to perform this action",
					403
				)
			);
		}
		next();
	};
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on POSTed email
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(
			new AppError("There is no user with that email address", 404)
		);
	}

	// 2) Generate random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3) Send it to user's email
	const resetURL = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/users/resetPassword/${resetToken}`;

	try {
		await new Email(user, resetURL).sendPasswordReset();

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(
			new AppError(
				"There was an error sending the email. Try again later!",
				500
			)
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on the token
	const encryptedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: encryptedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(new AppError("Token is invalid or has expired", 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3) Update changedPasswordAt property for the user (done in userModel.js using pre middleware)

	// 4) Log the user in, send JWT
	createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1) Get user from collection
	const user = await User.findById(req.user.id).select("+password");

	// 2) Check if POSTed current password is correct
	if (
		!user ||
		!(await user.correctPassword(req.body.passwordCurrent, user.password))
	) {
		return next(new AppError("Your current password is incorrect", 401));
	}

	// 3) If so, update password
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordChangedAt = Date.now();
	await user.save();

	// 4) Log user in, send JWT
	createSendToken(user, 200, req, res);
});
