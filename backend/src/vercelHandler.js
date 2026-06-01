import app from "./app.js";
import connectDB from "./config/db.js";

let connectionPromise;

const validateEnvironment = () => {
  const missing = ["MONGO_URI", "JWT_SECRET"].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missing.join(", ")}`);
  }
};

const handler = async (req, res) => {
  try {
    validateEnvironment();

    if (!connectionPromise) {
      connectionPromise = connectDB().catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
    }

    await connectionPromise;
    return app(req, res);
  } catch (error) {
    console.error("API startup failed:", error.message);
    return res.status(500).json({
      message: "Server configuration error. Check MONGO_URI and JWT_SECRET."
    });
  }
};

export default handler;
