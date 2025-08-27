import express from "express";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
import validateUser, { type customRequest } from "../middleware/auth.js";

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

userRouter.get('/all', validateUser, async (req, res) => {
  try {
    const userId = (req as customRequest).user.id
    const users = await prisma.user.findMany({
      where: {id: {not: userId}},
      select: {id: true, email: true, username: true, interests: true, name: true, bio: true},
    })

    res.json({users})
  } catch (error) {
    res.status(500).json({error})
  }
})

userRouter.get('/me', validateUser, async (req, res) => {
  try {
    const userInfo = (req as customRequest).user
    const user = await prisma.user.findUnique({
      where:{
        id: userInfo.id
      },
      select: {id: true, email: true, username: true}
    })

    res.json({
      user
    })
  } catch (error) {
    res.status(500).json({error})
  }
})

userRouter.put('/edit', validateUser, async (req, res) => {
  try {
    const {name, bio} = req.body
    const userId = (req as customRequest).user.id

    const user = await prisma.user.update({
      where: {
        id: userId
      }, 
      data: {
        name: name,
        bio: bio
      }
    })

    res.json({user})
  } catch (error) {
    res.status(500).json({error})
  }
})

userRouter.get('/info', validateUser, async (req, res) => {
  try {
    const username = req.query.username

    if(!username){
      res.status(404).json({
        "error": "please provide a valid username"
      })
    }
    
    const user = await prisma.user.findUnique({
      //@ts-ignore
      where: {username},
      select: {id: true, username: true, name: true, bio: true, interests: true}
    })

    res.json({user})
  } catch (error) {
    res.status(500).json({error})
  }
})

export default userRouter;
