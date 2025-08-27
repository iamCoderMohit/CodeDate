import { FaRocket } from "react-icons/fa";
import logo from "../assets/logo.png";
import DateButton from "./DateButton";
import Overlay from "./Overlay";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SetInfoButton from "./SetInfoButton";
import { IoIosLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { logout } from "../features/authSlice";
import { persistor } from "../store/store";

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
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const dispatch = useDispatch()
  return (
    <div className="p-4 flex justify-between px-10 items-center">
      {showOverlay ? (
        <Overlay
          setShowOverlay={setShowOverlay}
          setShowSignUp={setShowSignUp}
          setShowSignin={setShowSignin}
          setShowMobile={setMobile}
        />
      ) : null}
      <Link to={"/"} className="flex items-center gap-5">
        <img src={logo} className="w-50 cursor-pointer mx-auto" alt="" />
      </Link>
      <Link to={"/feed"} className="hidden md:block">
        <DateButton text="Find your Date" />
      </Link>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link className="hidden md:block" to={"/profile"}>
              <SetInfoButton />
            </Link>
            <button
              className="text-white hidden bg-gray-900 px-10 rounded-md py-2 md:flex items-center justify-center gap-4 cursor-pointer"
              onClick={() => (localStorage.clear(), persistor.purge(), dispatch(logout()), navigate("/"))}
            >
              <p>Logout</p>
              <IoIosLogOut />
            </button>
            <div
              className="md:hidden text-white cursor-pointer"
              onClick={() => (setMobile((prev) => !prev), setShowOverlay(true))}
            >
              <GiHamburgerMenu />
            </div>
            {mobile ? (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-xl backdrop-blur-lg p-5 flex flex-col gap-4 items-center z-50">
                <div
                  className="absolute top-5 right-5 cursor-pointer text-white"
                  onClick={() => (setMobile(false), setShowOverlay(false))}
                >
                  <ImCross />
                </div>
                <Link className="" to={"/profile"}>
                  <SetInfoButton />
                </Link>
                <button
                  className="text-white bg-gray-900 px-10 rounded-md py-2 items-center justify-center gap-4 cursor-pointer"
                  onClick={() => (localStorage.clear(), persistor.purge(), dispatch(logout()), navigate("/"))}
                >
                  <p>Logout</p>
                  <IoIosLogOut />
                </button>
                <Link to={"/feed"} className="">
                  <DateButton text="Find your Date" />
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            className="text-white bg-gray-900 md:px-10 rounded-md py-2 px-2 ml-5 flex items-center justify-center gap-4 cursor-pointer"
            onClick={() => (
              setShowSignUp((prev) => !prev), setShowOverlay((prev) => !prev)
            )}
          >
            <FaRocket />
            <p>Join the Community</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
