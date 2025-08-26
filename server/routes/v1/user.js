import { Router } from "express";
import UserModel from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUND = parseInt(process.env.SALT_ROUND);
const JWT_SECRET = process.env.JWT_SECRET;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const userExists = await UserModel.findOne({
            $or: [{ username }, { email }]
        });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists!" });
        }

        const newPassword = await bcrypt.hash(password, SALT_ROUND);

        await UserModel.create({
            email,
            username,
            password: newPassword
        });

        return res.status(201).json({ msg: "User created successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error!" });
    }
});

userRouter.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "Please signup first!" });
        }

        const passwordMatch = bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ msg: "Wrong username or Password!" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        return res.status(200).json({
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error!" });
    }
})

export default userRouter;