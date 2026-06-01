import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const validateEnvironment = () => {
  const missing = ["MONGO_URI", "JWT_SECRET"].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(
        ", "
      )}. Add them in your deployment environment variables and redeploy.`
    );
  }
};

const startServer = async () => {
  try {
    validateEnvironment();
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    console.error(
      "Deployment setup checklist: set MONGO_URI to your MongoDB Atlas URI, set JWT_SECRET, and allow deployment access in MongoDB Atlas Network Access."
    );
    process.exit(1);
  }
};

startServer();
