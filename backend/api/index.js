import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Pre-flight requests
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});