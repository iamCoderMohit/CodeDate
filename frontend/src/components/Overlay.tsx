interface overlayInputs{
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>,
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>,
  setShowSignin: React.Dispatch<React.SetStateAction<boolean>>,
  setShowMobile: React.Dispatch<React.SetStateAction<boolean>>,
}

function Overlay({setShowOverlay, setShowSignUp, setShowSignin, setShowMobile}: overlayInputs) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 opacity-50"
    onClick={() => (
      setShowOverlay(false),
      setShowSignUp(false),
      setShowSignin(false),
      setShowMobile(false)
    )}
    ></div>
  )
}

export default Overlay
