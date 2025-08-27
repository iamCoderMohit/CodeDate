import { useState } from "react";
import AuthButton from "./AuthButton";
import { useAuth } from "../hooks/useAuth";
import AuthLoader from "./AuthLoader";

interface signinInput {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Signin({ setShowSignup, setShowOverlay, setShowSignin }: signinInput) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signin, loading} = useAuth()

  async function handleSignin() {
    await signin(email, password);
  }

  return (
    <div className="h-fit w-100 rounded-md bg-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white p-4 flex items-center flex-col justify-center">
      <h1 className="text-center text-2xl font-semibold ">
        Sign in to your account
      </h1>
      <h1 className="mb-10">
        don't have an account{" "}
        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => (
            setShowSignup(true), setShowOverlay(true), setShowSignin(false)
          )}
        >
          Sign up
        </button>{" "}
      </h1>

      <div className="flex flex-col justify-center items-center gap-5">
        <input
          type="email"
          placeholder="enter your email"
          className="border border-gray-500 rounded-md py-1 px-4 text-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          className="border border-gray-500 rounded-md py-1 px-4 text-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? <div className="w-20"> 
            <AuthLoader />
        </div> : <div onClick={handleSignin}>
            <AuthButton text="Sign in" />
        </div> }
      </div>
    </div>
  );
}

export default Signin;
