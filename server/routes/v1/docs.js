import { Router } from "express";
import authUser from "../../middlewares/authUser.js";
import DocsModel from "../../models/docs.js";

const docsRouter = Router();

docsRouter.post("/new", authUser, async (req, res) => {
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

        return res.status(201).json({
            docId: newDoc._id
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error!" });
    }
})
export default docsRouter;