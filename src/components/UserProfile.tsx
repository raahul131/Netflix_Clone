import { PiPencilDuotone } from "react-icons/pi";
import { TbMessage2Cog } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { IoHelpCircleOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { auth } from "utils/firebase";
import { signOut } from "firebase/auth";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  return (
    <div className="flex flex-col absolute top-11 right-0 w-48 bg-black/80 border-white/50 text-gray-300 border-[1px]">
      <div className="w-4 h-4 arrow -mt-3 right-1 absolute"></div>
      <ul className="flex flex-col p-4 gap-3 font-light ">
        <li className="cursor-pointer hover:underline flex items-center gap-2">
          <span>
            <PiPencilDuotone size={20} />
          </span>{" "}
          Manage Profile
        </li>
        <li className="cursor-pointer hover:underline flex items-center gap-2">
          <span>
            <TbMessage2Cog size={20} />
          </span>{" "}
          Transfer Profile
        </li>
        <li className="cursor-pointer hover:underline flex items-center gap-2">
          <span>
            <VscAccount size={19} />
          </span>
          Account
        </li>
        <li className="cursor-pointer hover:underline flex items-center gap-2">
          <span>
            <IoHelpCircleOutline size={22} />
          </span>{" "}
          Help Center
        </li>
      </ul>
      <div
        onClick={handleSignOut}
        className="border-t-[1px] px-4 py-3 flex items-center gap-x-2 font-normal text-lg hover:underline cursor-pointer"
      >
        <TbLogout />
        Sign out
      </div>
    </div>
  );
};

export default UserProfile;
