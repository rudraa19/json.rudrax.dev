import "dotenv/config";
import express from "express";
import V1Router from "../routes/v1/index.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.status(200).send("server is running"));
app.use("/v1", V1Router);


mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));


if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

export default app;