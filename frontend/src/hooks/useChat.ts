import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessages } from "../features/msgSlice";

export function useChat() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [msgLoading, setMsgLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const sendMessage = async (receiverId: string, content: string) => {
    try {
      await axios.post(
        `${BACKEND_URL}/message/send`,
        {
          receiverId,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      setError("error sending message");
    } finally {
      setMsgLoading(false);
    }
  };

  const getMessages = async (receiverId: string) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/message/all?receiverId=${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(setMessages({
        receiverId,
        messages: res.data.messages
      }))
    } catch (error) {
      setError("error fetching messages");
    } finally {
      setMsgLoading(false);
    }
  };

  return {
    sendMessage,
    getMessages,
    msgLoading,
    error,
  };
}
