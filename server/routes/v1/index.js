import { Router } from "express";
import userRouter from "./user.js";
import docsRouter from "./docs.js"

const V1Router = Router();

V1Router.use("/user", userRouter);
V1Router.use("/docs", docsRouter);

export default V1Router;