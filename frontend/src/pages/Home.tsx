import { useState } from "react"
import DateButton from "../components/DateButton"
import Navbar from "../components/Navbar"
import Signup from "../components/Signup"

function Home() {
  const [showSignUp, setShowSignUp] = useState(false)
  return (
    <div className=" ">
      
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-25 bg-gradient-to-t from-blue-500/40 to-transparent blur-2xl"></div>
        <Navbar setShowSignUp={setShowSignUp} />

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white flex flex-col gap-4">
          <h1 className="text-white font-bold text-6xl/snug text-center">Helping Developers Finding Their First Date</h1>
         <div>
           <h1 className="text-center text-xl font-semibold text-gray-700">We know you can't find a partner for yourself</h1>
          <h1 className="text-center text-xl font-semibold text-gray-700">and neither can we</h1>
         </div>
          <div className="mx-auto"
          onClick={() => setShowSignUp(prev => !prev)}
          >
            <DateButton text="Let's Try" />
          </div>
        </div>

        {showSignUp ? <Signup /> : null}
    </div>
  )
}

export default Home