import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const checkErrors =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ status: "error", msg: errorMessages });
      } else {
        return res
          .status(500)
          .json({ status: "error", msg: "unknown internal server error" });
      }
    }
  };

export default checkErrors;
