import express from "express";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();
const JWT_KEY = process.env.JWT_SECRET_KEY;

interface signupInputs {
  email: string;
  username: string;
  password: string;
}

userRouter.post("/signup", async (req, res) => {
  const { email, username, password }: signupInputs = req.body;

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userExists) {
      return res.status(500).json({ error: "user already exists" });
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_KEY || "MY OTHER SUPER SECRET"
    );

    return res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(500).json({
        error: "user doesnt exist",
      });
    }

    const token = jwt.sign(
      { id: user?.id, email: user?.email },
      JWT_KEY || "MY OTHER SUPER SECRET"
    );

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

export default userRouter;
