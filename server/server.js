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
    : process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

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
