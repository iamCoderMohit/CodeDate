import { FaRocket } from "react-icons/fa";
import logo from "../assets/logo.png";
import DateButton from "./DateButton";
import Overlay from "./Overlay";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetInfoButton from "./SetInfoButton";
import { IoIosLogOut } from "react-icons/io";

interface navbarInputs {
  setShowSignUp?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignin?: React.Dispatch<React.SetStateAction<boolean>>;
  showOverlay?: boolean;
  setShowOverlay?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({
  setShowSignUp = () => {},
  setShowSignin = () => {},
  showOverlay,
  setShowOverlay = () => {},
}: navbarInputs) {


  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)
  return (
    <div className="p-4 flex justify-between px-10 items-center">
      {showOverlay ? (
        <Overlay
          setShowOverlay={setShowOverlay}
          setShowSignUp={setShowSignUp}
          setShowSignin={setShowSignin}
        />
      ) : null}
      <Link to={'/'} className="flex items-center gap-5">
        <img src={logo} className="w-50 cursor-pointer" alt="" />
      </Link>
      <Link to={"/feed"}>
        <DateButton text="Find your Date" />
      </Link>
      <div className="flex items-center gap-4">
        {isLoggedIn ? <div className="flex items-center gap-4">
          <Link to={'/profile'}><SetInfoButton /></Link>
          <button
          className="text-white bg-gray-900 px-10 rounded-md py-2 flex items-center justify-center gap-4 cursor-pointer"
          onClick={() => (
            setShowSignUp((prev) => !prev), setShowOverlay((prev) => !prev)
          )}
        >
          <p>Logout</p>
          <IoIosLogOut />
        </button>
        </div> : 
        <button
          className="text-white bg-gray-900 px-10 rounded-md py-2 flex items-center justify-center gap-4 cursor-pointer"
          onClick={() => (
            setShowSignUp((prev) => !prev), setShowOverlay((prev) => !prev)
          )}
        >
          <FaRocket />
          <p>Join the Community</p>
        </button>}
      </div> 
    </div>
  );
}

export default Navbar;
