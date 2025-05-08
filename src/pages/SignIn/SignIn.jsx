import React, { useState } from "react";
import { Link } from "react-router";
// import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { successToast } from "../../library/toast";

const SignIn = () => {
  const auth = getAuth();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginInfoError, setLoginInfoError] = useState({
    emailError: "",
    passwordError: "",
  });

  //handleInput function ===========

  const handleInput = (event) => {
    const { id, value } = event.target;
    // console.log(`input name is ${id} and value is ${value}`);
    setLoginInfo({
      ...loginInfo,
      [id]: value,
    });
    // console.log(loginInfo)
    //  console.log(loginInfo["password"]) //we can use notation instead of dot to access the property value/nested object value
  };

  //handleInput function ===========

  //error handle and handleSignin function ========

  // let error = {};
  const handleSignin = () => {
    const { email, password } = loginInfo;
    if (!email) {
      setLoginInfoError({
        ...loginInfoError,
        emailError: "Email missing!",
        passwordError: "Password missing!",
      });
    } else if (!password) {
      setLoginInfoError({
        ...loginInfoError,
        emailError: "",
        passwordError: "Password missing!",
      });
    } else {
      setLoginInfoError({
        emailError: "",
        passwordError: "",
      });
      // alert("ok")
      //using firebase authentication=========

      const { email, password } = loginInfo;
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          successToast("Login successful");
          console.log(userinfo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //using firebase authentication=========

  //error handle and handleSignin function ========

  //loginWithGoogle function===========
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userinfo) => {
        console.log(userinfo);
      })
      .catch((error) => {
        console.log("error form loginWithGoogle function", error);
      });
  };

  //loginWithGoogle function===========

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 h-screen bg-green-300 flex justify-center items-center">
          <div>
            <h1 className="font-sans font-bold text-[33.34px] text-[#03014C] mb-5">
              Login to your account!
            </h1>
            <div className="flex gap-3 border border-opacity-30 px-5 py-4 rounded mb-4 justify-center">
              {/* <FcGoogle /> */}
              <img
                src="/src/assets/auth/google.png "
                className="w-[20px] h-[20-px]"
                alt="google.png"
              />
              <p
                onClick={loginWithGoogle}
                className="font-sans font-semibold text-[13.34px] text[#03014C] focus:outline-green-500 cursor-pointer"
              >
                Login with Google
              </p>
            </div>
            <div className="">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col items-start gap-2 ">
                  <label htmlFor="email" className=" text-gray-500">
                    Email Addres
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    id="email"
                    placeholder="Youraddres@email.com"
                    className=" text-[20px] text-start py-1 px-3 border-b border-[#03014C] border-opacity-10 outline-0"
                  />
                  {loginInfoError.emailError && (
                    <span className="text-red-500">
                      {loginInfoError.emailError}
                    </span>
                  )}

                  <label htmlFor="password" className=" text-gray-500">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    id="password"
                    placeholder="Your password"
                    className=" text-[20px] text-start py-1 px-3 border-b border-[#03014C] border-opacity-10 outline-0"
                  />
                  {loginInfoError.passwordError && (
                    <span className="text-red-500">
                      {loginInfoError.passwordError}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSignin}
                  className="px-18 py-2 bg-blue_color rounded text-white text-lg cursor-pointer mt-10"
                >
                  Login to Continue
                </button>
              </form>
              <p className="mt-5 text-[#03014C] font-open text-[13.3px] text-font-normal">
                Don’t have an account ?
                <Link
                  to={"/Registration"}
                  className="font-bold  hover:underline text-[#EA6C00] ml-2"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-blue-300">
          <img src="/src/assets/auth/loginImg.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
