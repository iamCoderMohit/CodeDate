import { prisma } from "../config/prisma.js";
export async function sendMessage(senderId, receiverId, content) {
    let convo = await prisma.conversation.findFirst({
        where: {
            OR: [
                { user1_id: senderId, user2_id: receiverId },
                { user1_id: receiverId, user2_id: senderId },
            ],
        },
    });
    if (!convo) {
        convo = await prisma.conversation.create({
            data: {
                user1_id: senderId,
                user2_id: receiverId,
            },
        });
    }
    const message = await prisma.message.create({
        data: {
            convoId: convo.id,
            senderId,
            content
        }
    });
    return message;
}
//# sourceMappingURL=sendMessage.js.map