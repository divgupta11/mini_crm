import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000
  });

  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection.connection;
};

export default connectDB;
