import { useNavigate, useParams } from "react-router-dom";
import { useInfo } from "../hooks/useInfo";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import FeedLoader from "../components/FeedLoader";
import OptionCard from "../components/OptionCard";
import FeedButton from "../components/FeedButton";

function UserProfile() {
  const { username } = useParams();
  const { getUser, userInfo, loading } = useInfo();
  const navigate = useNavigate()

  if (!username) return;

  useEffect(() => {
    console.log("mounted");
    async function fetchUser() {
      if (username) await getUser(username || "");
    }
    fetchUser();
  }, [username]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <FeedLoader />
      ) : (
        <div className="md:flex">
          <div className="md:w-1/3 p-5">
            <div className="flex items-center gap-10">
            <div className="w-20 h-20 bg-green-500/30 rounded-full flex justify-center items-center text-2xl font-bold text-white self-center cursor-pointer">
            {userInfo.name
              ? userInfo.name[0].toUpperCase()
              : userInfo.username[0].toUpperCase()}
          </div>

          <div>
            <h1 className="text-lg font-semibold text-blue-600">
            @{userInfo.username}
          </h1>
          <h1 className="text-xl font-semibold text-white">
            {userInfo.name ? userInfo.name : "Anonymus"}
          </h1>
          </div>
          </div>

          <h1 className="text-xl text-white font-semibold mt-10">Bio : {userInfo.bio ? userInfo.bio : "chilling out (default)"} </h1>
          <div className="mt-10"
          onClick={() => navigate(`/chat/${userInfo.username}`)}
          >
            <FeedButton />
          </div>
          </div>
          <div className="md:w-2/3 p-5">
                {userInfo.interests.length > 0 ? 
                <div className="flex justify-around flex-wrap">
                    {userInfo.interests.map((item) => (
                        <OptionCard name={item.name ? item.name : item.interest} logo={item.logo ? item.logo : null} index={-1} />
                    ))}
                </div>
                : <h1 className="text-white font-bold text-2xl text-center">Bro has no interests</h1> }
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
