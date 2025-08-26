import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: String,
    username: String,
    password: String
})

const UserModel = model("user", userSchema);

export default UserModel;