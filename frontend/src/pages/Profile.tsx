import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useInterest } from "../hooks/useInterest";
import FeedLoader from "../components/FeedLoader";
import OptionCard from "../components/OptionCard";
import { interestOptions } from "../data/options";
import { useInfo } from "../hooks/useInfo";

function Profile() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const [edit, setEdit] = useState(false);
  const { getAllInterest, loading, postInterest } = useInterest();
  const [added, setAdded] = useState(0);
  const [skills, setSkills] = useState<{ name: string; logo: string }[]>([]);
  const [editInterests, setEditInterests] = useState(false);
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const {editUser} = useInfo()
  const [flag, setFlag] = useState(false)

  async function handleEdit() {
    await editUser(name, bio)
    setEdit(false)
  }

  async function handlePost() {
    await postInterest(skills);
    setFlag(prev => !prev)
    setAdded(0)
    setSkills([])
    setEditInterests(false)
  }

  useEffect(() => {
    async function fetchInterests() {
      await getAllInterest();
    }
    fetchInterests();
  }, [flag]);

  const userInterests = useSelector(
    (state: any) => state.interest.userInterests
  );
  return (
    <div className="text-white flex flex-col min-h-screen">
      <Navbar />

      <h1 className="text-3xl text-center font-bold mt-5">
        Tell the world who you are (no one cares btw)
      </h1>
      <div className="flex-1 md:flex gap-5 items-stretch p-5">
        <div className="bg-gray-800 md:w-1/4 rounded-md p-5">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-lg font-bold">Personal Info</h1>
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-900 hover:rounded-md hover:px-3 px-3 bg-gray-950 rounded-md"
              onClick={() => setEdit((prev) => !prev)}
            >
              <h1>{edit ? "Cancel" : "Edit"}</h1>
              <MdOutlineEdit />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5">
            <h1 className="text-xl font-semibold">
              Username : {userInfo.username}
            </h1>
            <h1 className="text-xl font-semibold">
              Email : {userInfo.email}
            </h1>
            <div className="text-xl font-semibold">
              Name :{" "}
              {edit ? (
                <input
                  type="text"
                  placeholder="new name"
                  className="border border-gray-900 rounded-md px-3 py-1"
                  defaultValue={userInfo.name ? userInfo.name : null}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                userInfo.name ? userInfo.name : "not set yet"
              )}
            </div>
            <div className="text-xl font-semibold">
              Bio :{" "}
              {edit ? (
                <textarea
                  placeholder="new bio"
                  rows={8}
                  className="border border-gray-900 rounded-md px-3 py-1"
                  onChange={(e) => setBio(e.target.value)}
                  defaultValue={userInfo.bio ? userInfo.bio : null}
                ></textarea>
              ) : (
               userInfo.bio ? userInfo.bio : "not set yet"
              )}
            </div>
            {edit ? (
              <button className="flex items-center gap-1 cursor-pointer hover:bg-gray-900 hover:rounded-md hover:px-3 px-3 self-end bg-gray-950 rounded-md"
              onClick={handleEdit}
              >
                Save
              </button>
            ) : null}
          </div>
        </div>
        <div className="bg-gray-800 mt-5 md:w-3/4 rounded-md p-5">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">Interests</h1>
            {editInterests ? (
              <div className="flex md:flex-row flex-col gap-2 md:gap-5">
                <div className="bg-blue-600 rounded-md px-2 py-1">
                  {added} skills added
                </div>
                <div
                  className="bg-blue-600 rounded-md px-2 py-1 cursor-pointer"
                  onClick={handlePost}
                >
                  {" "}
                  Proceed
                </div>
                <button
                  className="bg-gray-900 rounded-md px-4 py-1 cursor-pointer"
                  onClick={() => setEditInterests(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-900 rounded-md px-4 py-1 cursor-pointer"
                onClick={() => setEditInterests(true)}
              >
                Edit
              </button>
            )}
          </div>
          {loading ? (
            <FeedLoader />
          ) : editInterests === false ? (
            <div className="flex flex-wrap justify-around">
              {userInterests.map((item: any) => (
              <OptionCard name={item.interest} logo={item.logo} index={-1} />
            ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-around gap-5">
              {interestOptions.map((item, index) => (
                <OptionCard
                  name={item.name}
                  logo={item.logo}
                  setAdded={setAdded}
                  setSkill={setSkills}
                  skill={skills}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
