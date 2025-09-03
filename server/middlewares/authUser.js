import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function authUser(req, res, next) {
    try {
        const { token } = req.headers;
        if (!token) return res.status(401).json({ msg: "Invalid or missing token!" });
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ msg: "Invalid or missing token!" });
    }
}

export default authUser;