import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  // instead of readyState
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected");
  } catch (error) {
    console.log("Database connection failed\n" + error);

    // if db is not connected then, don't run the application so we are doing process.exit(1)
    process.exit(1);
  }
}

export default dbConnect;
