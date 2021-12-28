import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import dotenv from "dotenv-defaults";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  dotenv.config();

  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO URL");
    process.exit(1);
  }
  mongoose.connect(
    'mongodb+srv://enginekevin:kevin777@cluster0.kemnp.mongodb.net/hack3?retryWrites=true&w=majority',
    // process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const db = mongoose.connection;

  db.on("error", (error) => {
    throw new Error("DB connection error: " + error);
  });
  db.once('open', () => {
    console.log('MongoDB connected!')
    dataInit()
  });
}

export default { connect };