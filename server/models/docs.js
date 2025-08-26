import mongoose, { model, Schema } from "mongoose";

const docsSchema = new Schema({
    name: String,
    content: String,
    userId: { type: mongoose.Types.ObjectId, ref: "user" }
})

const DocsModel = model("docs", docsSchema);

export default DocsModel;