import "dotenv/config"
import express from "express";
import V1Router from "../routes/v1/index.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.status(200).send("server is running"));

app.use("/v1", V1Router);

async function main() {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
}

main();