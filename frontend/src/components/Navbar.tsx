import { FaRocket } from 'react-icons/fa'
import logo from '../assets/logo.png'
import DateButton from './DateButton'
import { useState } from 'react'
import Overlay from './Overlay'

function Navbar({setShowSignUp}: {setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [showOverlay, setShowOverlay] = useState(false)
  return (
    <div className='p-4 flex justify-between px-10 items-center'>
      {showOverlay ? <Overlay /> : null}
        <div className='flex items-center gap-5'>
            <img src={logo} className='w-50 cursor-pointer' alt="" />
        </div>
            <DateButton text='Find your Date' />
        <div>
          <button className='text-white bg-gray-900 px-10 rounded-md py-2 flex items-center justify-center gap-4 cursor-pointer'
          onClick={() => (setShowSignUp(prev => !prev),
            setShowOverlay(prev => !prev)
          )}
          >
            <FaRocket />
            <p>Join the Community</p>
          </button>
        </div>
    </div>
  )
}

export default Navbar