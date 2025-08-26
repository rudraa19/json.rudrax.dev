import { Router } from "express";
import userRouter from "./user.js";

const V1Router = Router();

V1Router.use("/user", userRouter);

export default V1Router;