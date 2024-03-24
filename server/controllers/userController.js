const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerFactory = require("./handlerFactory");
const multer = require("multer");
const request = require("request");
// const sharp = require("sharp");

// Multer configuration
// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "public/img/users");
// 	},
// 	filename: (req, file, cb) => {
// 		// user-123abc123abc123abc-1234567890.jpeg
// 		const ext = file.mimetype.split("/")[1];
// 		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
// 	},
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
// 	if (!req.file) return next();

// 	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

// 	await sharp(req.file.buffer)
// 		.resize(500, 500)
// 		.toFormat("jpeg")
// 		.jpeg({ quality: 90 })
// 		.toFile(`public/img/users/${req.file.filename}`);

// 	next();
// });

exports.uploadUserPhoto = upload.single("photo");

exports.getAllUsers = handlerFactory.getAll(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 4) Send response
  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // 1) Find user by id and set active to false
  const user = await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  // 2) Send response
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.subscribeNewsletter = (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (email) {
    const data = {
      members: [
        {
          email_address: email,
          status: "pending",
        },
      ],
    };
    console.log(process.env.MAILCHIMP_API_KEY);
    console.log(process.env.MAILCHIMP_AUDIENCE);

    const dataPost = JSON.stringify(data);
    const options = {
      url: `https://us22.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE}`,
      method: "POST",
      headers: {
        Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json", // Add Content-Type header
      },
      body: dataPost,
    };

    // Make the request
    request(options, (err, response, body) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Response:", body);
        res
          .status(200)
          .json({ message: "Successfully subscribed to newsletter" });
      }
    });
  } else {
    res.status(400).json({ error: "Email address is required" });
  }
};

exports.unsubscribeNewsletter = (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (email) {
    const data = {
      members: [
        {
          email_address: email,
          status: "unsubscribed",
        },
      ],
      update_existing: true,
    };
    const dataPost = JSON.stringify(data);

    const options = {
      url: `https://us22.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE}`,
      method: "POST",
      headers: {
        Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: dataPost,
    };

    request(options, (err, response, body) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Response:", body);
        res
          .status(200)
          .json({ message: "Successfully unsubscribed from newsletter" });
      }
    });
  } else {
    res.status(400).json({ error: "Email address is required" });
  }
};

exports.getUser = handlerFactory.getOne(User);

// Do NOT update passwords with this, use updatePassword instead (see authController.js)
exports.updateUser = handlerFactory.updateOne(User);

exports.deleteUser = handlerFactory.deleteOne(User);
