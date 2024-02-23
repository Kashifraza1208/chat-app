const app = require("./app.js");
const Connection = require("./config/database.js");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Handling uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection.`);

  process.exit(1);
});

Connection();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running successfully on Port ${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
