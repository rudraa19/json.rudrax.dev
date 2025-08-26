import express from "express";

const app = new express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));