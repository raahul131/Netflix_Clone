import React, { useEffect, useRef, useState } from "react";
import Logo from "assets/netflix_logo.png";
import userIcon from "assets/userIcon.jpg";
import { checkValidData } from "utils/Validate";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "utils/firebase.ts";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "utils/userSlice";

const Authentication: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

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
    return () => unsubscribe();
  }, []);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    let validationError;
    let emailValue = "";
    let passwordValue = "";

    if (email.current && password.current) {
      emailValue = email.current.value;
      passwordValue = password.current.value;
      validationError = checkValidData(emailValue, passwordValue);
      setErrorMessage(validationError);
    }
    if (validationError) return;

    setLoading(true);

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current?.value,
            photoURL: userIcon,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser!;
              dispatch(
                addUser({
                  uid: uid!,
                  email: email!,
                  displayName: displayName!,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error);
            });
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          setLoading(false);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          setLoading(false);
        });
    }
  };

  return (
    <main className="w-screen h-screen bg-cover bg-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/fa4669e0-a18f-48e4-8bc2-9566d7f56eef/NP-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]">
      <div className="h-screen flex justify-center items-center">
        <div className="bg-black opacity-60 absolute inset-0"></div>
        <figure>
          <img
            src={Logo}
            alt="logo"
            className="w-32 absolute top-3 sm:left-20 left-5"
          />
        </figure>
        <div className="relative z-10 bg-black/80 rounded-md sm:p-12 p-8 text-white">
          <h1 className=" pb-3 text-lg sm:text-2xl font-bold tracking-wide leading-">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex-col flex space-y-3"
          >
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full name"
                className="bg-neutral-800 placeholder:text-gray-400 placeholder:text-xs px-3 py-2 rounded outline-none"
              />
            )}

            <input
              ref={email}
              type="text"
              required
              placeholder="Email or phone number"
              className="bg-neutral-800 placeholder:text-gray-400 placeholder:text-xs px-3 py-2 rounded outline-none"
            />

            <input
              ref={password}
              required
              type="password"
              placeholder="Password"
              className="bg-neutral-800 placeholder:text-gray-400 placeholder:text-xs px-3 py-2 rounded outline-none"
            />
            <p className="text-xs text-netflix_red-0">{errorMessage}</p>
            <div className="pt-3">
              <button
                className="bg-netflix_red-0 py-2 rounded w-full"
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <VscLoading className="animate-spin" />
                  </div>
                ) : isSignInForm ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between w-full pt-2 text-xs text-gray-500">
            <div className="flex space-x-2">
              <input type="checkbox" defaultChecked={true} className="w-3" />
              <p>Remember me</p>
            </div>
            <p className="text-xs">Need help?</p>
          </div>

          <div className="pt-4">
            <p className="text-gray-500 text-sm">
              {isSignInForm ? "New to Netflix?" : "Already registered?"}{" "}
              <button
                className="text-white hover:text-gray-400
            transition duration-150 text-base"
                onClick={toggleForm}
              >
                {isSignInForm ? "Sign up now" : "Sign in now"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Authentication;
