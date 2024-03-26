import React, { useEffect, useState } from "react";
import Logo from "assets/netflix_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import UserProfile from "./UserProfile";
import MobileMenu from "./MobileMenu";
import userIcon from "assets/userIcon.jpg";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "utils/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "utils/firebase";

const TOP_OFFSET = 65;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <main className="fixed w-full z-50 mx-auto">
      <div
        className={`px-3 sm:px-16 py-1 flex flex-row items-center transition duration-500 gap-10 ${
          showBackground ? "bg-zinc-700 bg-opacity-90" : ""
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="logo" className="h-9 sm:h-12" />
        </Link>

        <div className="flex-row gap-7 hidden md:flex text-white text-sm sm:text-bas">
          <p className="cursor-pointer hover:text-gray-300 transition">Home</p>
          <p className="cursor-pointer hover:text-gray-300 transition">
            TV Shows
          </p>
          <p className="cursor-pointer hover:text-gray-300 transition">
            Movies
          </p>
          <p className="cursor-pointer hover:text-gray-300 transition">
            Latest
          </p>
          <p className="cursor-pointer hover:text-gray-300 transition">
            My List
          </p>
          <p className="cursor-pointer hover:text-gray-300 transition">
            Browse by Language
          </p>
        </div>

        <div
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className="lg:hidden hidden flex flex-row justify-end items-center gap-1 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-xs">Browse</p>
          <BsChevronDown
            size={10}
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          {showMobileMenu && <MobileMenu />}
        </div>

        {/* Profile Menu */}
        <div className="flex flex-row ml-auto gap-5 items-center pr-2">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch size={18} />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell size={19} />
          </div>
          <div
            className="flex flex-row items-center gap-1 cursor-pointer relative"
            onClick={() => setShowUserProfile((prev) => !prev)}
          >
            <div className="w-6 h-6 p-1 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={userIcon} alt="user_icon" />
            </div>
            <BsChevronDown
              size={10}
              className={`text-white transition ${
                showUserProfile ? "rotate-180" : "rotate-0"
              }`}
            />
            {showUserProfile && <UserProfile />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
