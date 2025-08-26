import { Router } from "express";
import authUser from "../../middlewares/authUser.js";
import { DocsModel } from "../../models/index.js";
import jsonlint from "jsonlint";
import mongoose from "mongoose";

const docsRouter = Router();

docsRouter.post("/", authUser, async (req, res) => {
    try {
        const { docName } = req.body;

        if (!docName) {
            return res.status(400).json({ msg: "Document name is required!" });
        }

        const newDoc = await DocsModel.create({
            name: docName,
            content: "",
            userId: req.userId
        });

        return res.status(201).json({ docId: newDoc._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error!" });
    }
})

docsRouter.patch("/:id", authUser, async (req, res) => {
    try {
        const { docName, content } = req.body;
        const { id: docId } = req.params;

        if (!docId || !docName || content === undefined) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        try {
            jsonlint.parse(content);
        } catch (e) {
            return res.status(400).json({
                msg: "JSON data is invalid!",
                error: e.message
            });
        }

        const doc = await DocsModel.findOneAndUpdate(
            { _id: docId },
            { docName, content },
            { new: true, runValidators: true }
        );

        if (!doc) {
            return res.status(404).json({ msg: "Document not found!" });
        }

        return res.status(200).json({ msg: "Content updated successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error!" });
    }
})

docsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid document ID!" });
        }

        const doc = await DocsModel.findOne({ _id: id });

        if (!doc) {
            return res.status(404).json({ msg: "Doc not found!" });
        }

        return res.status(200).json(doc.content);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error!" });
    }
})

export default docsRouter;
