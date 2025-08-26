import express from "express";
import type { customRequest } from "../middleware/auth.js";
import { sendMessage } from "../utils/sendMessage.js";
import validateUser from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";

const messageRouter = express.Router();

messageRouter.use(validateUser);

messageRouter.post("/send", async (req, res) => {
  try {
    const senderId = (req as customRequest).user.id;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        error: "reciever id and content are required",
      });
    }

    const message = await sendMessage(senderId, receiverId, content);

    res.json({ message });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

messageRouter.get("/all", async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = (req as customRequest).user.id;

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
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

export default messageRouter;
