import { useState } from "react";

interface cardInput {
  name: string;
  logo: string;
  setAdded?: React.Dispatch<React.SetStateAction<number>>;
  setSkill?: React.Dispatch<
    React.SetStateAction<{ name: string; logo: string }[]>
  >;
  skill?: Array<{ name: string; logo: string }>;
  index?: number;
}

function OptionCard({
  name,
  logo,
  setAdded = () => {},
  setSkill = () => {},
  skill = [],
  index,
}: cardInput) {
  const [add, setAdd] = useState(false);
  return (
    <div className="w-50 h-40 bg-gray-900 rounded-md p-2 flex flex-col justify-center items-center gap-2 mt-5">
      <img src={logo} className="w-25" alt="" />
      <div className="flex justify-between gap-5">
        <h1 className="text-white">{name}</h1>
        {index === -1 ? null : <button
          className="bg-green-500 px-2 text-black cursor-pointer"
          onClick={() => setAdd((prev) => !prev)}
        >
          {add ? (
            <div
              onClick={() => (
                setAdded((prev) => prev - 1),
                setSkill(skill.filter((_, i) => i !== index))
              )}
            >
              Remove
            </div>
          ) : (
            <div
              onClick={() => (
                setAdded((prev) => prev + 1),
                setSkill([...skill, { name: name, logo: logo }])
              )}
            >
              Add Skill
            </div>
          )}
        </button>}
      </div>
    </div>
  );
}

export default OptionCard;
