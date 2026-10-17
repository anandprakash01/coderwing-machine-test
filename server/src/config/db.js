import mongoose from "mongoose";

import env from "./env.js";

mongoose.connection.on("disconnected", () => {
  console.log(
    `[WARN ] [DB] mongoDB cluster disconnected at ${new Date().toLocaleString()}, attempting to reconnect...`,
  );
});

mongoose.connection.on("reconnected", () => {
  console.log(
    `[INFO ] [DB] mongoDB cluster re-connected at ${new Date().toLocaleString()}.`,
  );
});
mongoose.connection.on("error", err => {
  console.log(`[INFO ] [DB] mongoDB cluster connected ${conn.connection.host}`);
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`[INFO ] [DB] mongoDB cluster connected ${conn.connection.host}`);
  } catch (err) {
    console.log(
      `[FATAL] [DB] mongoDB initial connection failed, shutting down`,
      err.message,
    );
    process.exit(1);
  }
};

export default connectDB;
