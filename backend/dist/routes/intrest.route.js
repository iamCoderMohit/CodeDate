import express from "express";
import validateUser, {} from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";
const intrestRouter = express.Router();
intrestRouter.use(validateUser);
intrestRouter.post("/", async (req, res) => {
    const user = req.user;
    const { intrest } = req.body;
    try {
        await prisma.interest.createMany({
            data: intrest.map((i) => ({
                userId: user.id,
                interest: i,
            })),
        });
        res.json({
            msg: "done",
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
});
intrestRouter.get('/all', async (req, res) => {
    try {
        const userId = req.user.id;
        const intrests = await prisma.interest.findMany({
            where: { userId }
        });
        res.json({
            intrests
        });
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
export default intrestRouter;
//# sourceMappingURL=intrest.route.js.map