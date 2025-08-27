import { useState } from "react"
import DateButton from "../components/DateButton"
import Navbar from "../components/Navbar"
import Signup from "../components/Signup"
import Signin from "../components/Signin"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Home() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignin, setShowSignin] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)
  const navigate = useNavigate()

  return (
    <div className=" ">
      
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-25 bg-gradient-to-t from-blue-500/40 to-transparent blur-2xl"></div>
        <Navbar setShowSignUp={setShowSignUp} setShowSignin={setShowSignin} showOverlay={showOverlay} setShowOverlay={setShowOverlay} />

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white flex flex-col gap-4">
          <h1 className="text-white font-bold text-6xl/snug text-center">Helping Developers Find Their First Date</h1>
         <div>
           <h1 className="text-center text-xl font-semibold text-gray-700">We know you can't find a partner for yourself</h1>
          <h1 className="text-center text-xl font-semibold text-gray-700">and neither can we</h1>
         </div>
          {isLoggedIn ? 
          <div className="mx-auto"
          onClick={() => (
            navigate('/feed')
          )}
          >
            <DateButton text="Let's Try" />
          </div>
          :<div className="mx-auto"
          onClick={() => (
            setShowSignUp(prev => !prev),
            setShowOverlay(true)
          )}
          >
            <DateButton text="Let's Try" />
          </div>}
        </div>

        {showSignUp ? <Signup setShowSignin={setShowSignin} setShowSignup={setShowSignUp} setShowOverlay={setShowOverlay} /> : null}
        {showSignin ? <Signin setShowSignup={setShowSignUp} setShowOverlay={setShowOverlay} setShowSignin={setShowSignin}/> : null}
    </div>
  )
}

export default Home