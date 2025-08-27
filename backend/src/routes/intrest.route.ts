import express from "express";
import validateUser, { type customRequest } from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";

const intrestRouter = express.Router();

intrestRouter.use(validateUser);

intrestRouter.post("/", async (req, res) => {
  const user = (req as customRequest).user;
  const { intrest } = req.body;

  try {
    await prisma.interest.createMany({
      data: intrest.map((i: any) => ({
        userId: user.id,
        interest: i.name,
        logo: i.logo
      })),
    });

    res.json({
      msg: "done",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});


intrestRouter.get('/all', async (req, res) => {
    try {
        const userId = (req as customRequest).user.id

        const intrests = await prisma.interest.findMany({
            where: {userId}
        })

        res.json({
            intrests
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})
export default intrestRouter;
