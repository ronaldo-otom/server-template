import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils/constants.js";

export default async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (authHeader && authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const decoded = await jwt.verify(token, TOKEN_SECRET);
      if (decoded) {
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
};
