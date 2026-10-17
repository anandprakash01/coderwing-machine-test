import http from "http";

import {addDummyProductsToDB} from "./utils/addDummyData.js";

import "./utils/crashHandler.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  addDummyProductsToDB(); // add the dummy data to db

  server.listen(env.PORT, () => {
    console.log(
      `[INFO ] [SERVER] ${env.NODE_ENV} mode server started on port ${env.PORT}`,
    );
  });
};

startServer();

process.on("unhandledRejection", err => {
  console.log(`[FATAL] [PROCESS] unhandled rejection, shutting down...`);
  console.log(err.message);
  if (server.listening) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
