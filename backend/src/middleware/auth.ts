import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  decoded?: { id: string };
}

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "token required" });
  }

  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (typeof decoded === "object" && "id" in decoded) {
        req.decoded = decoded as { id: string };
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return res.status(401).json({ status: "error", msg: "not authorised" });
      } else
        res
          .status(500)
          .json({ status: "error", msg: "unknown internal error" });
    }
  } else res.status(403).json({ status: "error", msg: "forbidden" });
};
