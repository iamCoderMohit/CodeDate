import express from "express";
import { sendMessage } from "../utils/sendMessage.js";
import validateUser from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";
const messageRouter = express.Router();
messageRouter.use(validateUser);
messageRouter.post("/send", async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId, content } = req.body;
        if (!receiverId || !content) {
            return res.status(400).json({
                error: "reciever id and content are required",
            });
        }
        const message = await sendMessage(senderId, receiverId, content);
        res.json({ message });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
});
messageRouter.get("/all", async (req, res) => {
    try {
        const receiverId = req.query.receiverId?.toString();
        if (!receiverId) {
            return res.status(404).json({
                "error": "please provide a valid receiver id"
            });
        }
        const senderId = req.user.id;
        const convo = await prisma.conversation.findFirst({
            where: {
                OR: [
                    { user1_id: senderId, user2_id: receiverId },
                    { user1_id: receiverId, user2_id: senderId },
                ],
            },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                    include: {
                        sender: { select: { id: true, username: true } },
                    },
                },
            },
        });
        if (!convo) {
            return res.json({
                messages: [],
            });
        }
        res.json({
            messages: convo.messages,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
});
export default messageRouter;
//was adding messagin feature, i have to pass the reciever id in the query params
//# sourceMappingURL=message.route.js.map