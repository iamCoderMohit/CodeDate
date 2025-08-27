import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useInfo } from "../hooks/useInfo";
import { useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import FeedLoader from "../components/FeedLoader";

function Chat() {
  const { getUser, loading, userInfo } = useInfo();
  const { getMessages, msgLoading, sendMessage } = useChat();
  const { username } = useParams();
  const [msg, setMsg] = useState("");
  const messages = useSelector((state: any) => state.msg.messages[userInfo.id]);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      await getUser(username || "");
      setFlag(true)
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchMsg() {
      console.log(userInfo.id)
      await getMessages(userInfo.id);
      setFlag(false);
    }
    fetchMsg();
  }, [flag]);

  async function handleClick() {
    await sendMessage(userInfo.id, msg);
    setMsg("");
    setFlag(true);
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-130 h-[85vh] bg-gray-900 rounded-md self-center p-5 relative">
        <div>
          {loading ? (
            <FeedLoader />
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                {userInfo.name ? userInfo.name[0] : userInfo.username[0]}
              </div>
              <h1 className="text-white font-semibold">
                {userInfo.name ? userInfo.name : userInfo.username}
              </h1>
            </div>
          )}
        </div>

        <div className="h-[85%] mt-4 overflow-auto flex flex-col gap-2">
          {messages ? messages.map((msg: any) => (
            <h1
              className={`text-white bg-gray-800 p-2 rounded-md ${
                msg.sender?.id === user?.id ? "self-end" : "self-start"
              }`}
            >
              {msg.content}
            </h1>
          )) : null}
        </div>

        <div className="flex">
          <input
            type="text"
            className="border border-white rounded-2xl absolute bottom-5 w-3/5 py-1 pl-2 text-white"
            placeholder="say Hi..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="absolute bottom-5 right-5 w-1/4 bg-yellow-600 rounded-2xl py-1 cursor-pointer"
            onClick={handleClick}
          >
            {msgLoading ? "sending" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
