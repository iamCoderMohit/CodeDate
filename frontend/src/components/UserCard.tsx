import { useNavigate } from "react-router-dom";
import FeedButton from "./FeedButton";

interface userInput {
  username: string;
  intrests: Array<String>;
  name: string;
}

function UserCard({ username, intrests, name }: userInput) {
  const navigate = useNavigate();
  return (
    <div className="w-50 h-70 bg-gray-900 rounded-md p-2 flex flex-col">
      <h1 className="text-blue-600 cursor-pointer">@{username}</h1>
      <div
        className="w-20 h-20 bg-green-500/30 rounded-full flex justify-center items-center text-2xl font-bold text-white self-center cursor-pointer"
        onClick={() => navigate(`/user/${username}`)}
      >
        {name ? name[0].toUpperCase() : username[0].toUpperCase()}
      </div>
      <h1 className="text-white self-center font-semibold">
        {name ? name : "Anonymus"}
      </h1>
      <div className="overflow-auto h-[30%] bg-gray-950 rounded-md p-1 flex flex-wrap justify-around gap-1">
        {intrests.length === 0 ? (
          <h1 className="text-white font-semibold">No Skills Added</h1>
        ) : null}
        {intrests.map((intrest: any) => (
          <div>
            {intrest.logo ? (
              <img src={intrest.logo} className="w-10 h-10" alt="" />
            ) : (
              <div className="text-white bg-orange-500 w-10 h-10 rounded-full flex justify-center items-center">
                {intrest.interest[0].toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="self-center w-full mt-2"
        onClick={() => navigate(`/chat/${username}`)}
      >
        <FeedButton />
      </div>
    </div>
  );
}

export default UserCard;
