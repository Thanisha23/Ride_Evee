import express from "express";
import cookieParser from "cookie-parser";
import router from "../src/routes/index.js";
import cors from "cors"
const app = express();
import dotenv from "dotenv"

dotenv.config();
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials:true
    }
))

app.use(cookieParser());
app.use(express.json());



app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});