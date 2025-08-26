import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_SECRET_KEY;

export interface customRequest extends Request {
  user: any;
}

const validateUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.headers.authorization;

  if (!jwtToken) {
    res.status(404).json({
      error: "jwt token not found",
    });
    return
  }

  const token = jwtToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token || " ", JWT_KEY || "MY SUPER SECRET KEY");
    (req as customRequest).user = decoded;
    next();
  } catch (error) {
    res.json({
      error: "user not authorized",
    });
  }
}

export default validateUser