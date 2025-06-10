
// ************all import data************
import React, { useState } from "react";
import regis from "../assets/auth/regis.png";
import { registrationInput } from "../library/lib";
import { toast, Bounce } from "react-toastify";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
// import { Triangle } from 'react-loader-spinner'
import { Link, useNavigate } from "react-router";
import { successToast } from "../library/toast";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

// ************all import data************

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate(); //react router DOM hook
  // const data = lib.registrationInput();
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [loadding, setLoadding] = useState(false);

  const item = registrationInput();
  // console.log(item);

  // error state

  const [emailError, setemailError] = useState("");
  const [fullNameError, setfullNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [eye, setEye] = useState(false);

  /*
   * todo: handleInput function implement
   * @param ({event})
   * return: null
   */

  const handleInput = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    if (name === "email") {
      setEmail(value);
    } else if (name == "fullName") {
      setfullName(value);
    } else {
      setPassword(value);
    }
  };

  // console.log("email", email);

  /**
   * todo: handleSignUp function implement
   * @params: ()
   * motive:
   * return: null
   */
  const handleSignUp = () => {
    // alert("sign up");
    if (!email) {
      setemailError("Email missing!");
      setfullNameError("FullName missing!");
      setpasswordError("Password missing!");
    } else if (!fullName) {
      setemailError("");
      setfullNameError("FullName missing!");
      setpasswordError("Password missing!");
    } else if (!password) {
      setemailError("");
      setfullNameError("");
      setpasswordError("Password missing!");
    } else {
      setLoadding(true);
      setemailError("");
      setfullNameError("");
      setpasswordError("");
      // alert("fine");
      // console.log(email, fullName, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          updateProfile(auth.currentUser, {
            displayName: fullName || "chatApp",
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          });
          // console.log("user created succesfully ", userInfo);
        })
        .then(() => {
          successToast(`🦄 ${fullName} Registration successfull `);
          return sendEmailVerification(auth.currentUser);
        }) 
        .then((mailinfo) => {
          // **********to create a unique id, using push Firebase function (realtime data id) data write (CRUD operation)***************
          let useRef = push(ref(db, "users/"));
          set(useRef, {
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture: `https://images.pexels.com/photos/31854805/pexels-photo-31854805/free-photo-of-hand-reaching-for-cherry-blossom-flowers-in-spring.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`,
            userUid: auth.currentUser.uid,
          });
          console.log(`email send `, mailinfo);
          // console.log(auth.currentUser)
          sendEmailVerification(auth.currentUser)
          // setLoadding(false);
          navigate("/SignIn");
        })
        // **********to create a unique id, using push Firebase function (realtime data id) data write (CRUD operation)***************
        .catch((error) => {
          console.log(
            ` error from  createUserWithEmailAndPassword ${error.code}`
            // setLoadding(false);
          );
        })
        .finally(() => {
          setLoadding(false);
          console.log("fdsfgd");
          setEmail("");
          setfullName("");
          setPassword("");
        });
    }
  };
  // console.log(auth.currentUser.displayName);

  // handleEye

  const handleEye = () => {
    // setEye(true)
    setEye(!eye);
  };
  // console.log(fullNameError, passwordError, emailError);
  // console.log(auth.currentUser);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-1/2 h-screen flex justify-center items-center">
          <div>
            <h1 className="font-nunito font-bold text-[34.4px] text-[#11175D] mb-[13px]">
              Get started with easily register
            </h1>
            <p className="mb-10 font-nunito font-normal text-[20.64px] text-[#d7d7d7]">
              Free register and you can enjoy it
            </p>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              {item?.map(({ id, name, required }) => (
                <div
                  className="flex flex-col gap-y-1 items-start mb-4 relative"
                  key={id}
                >
                  <label htmlFor="#">
                    {`Enter your ${name} `}
                    {/* {item.required ? (
                      <span className=" text-red-500">*</span>
                    ) : (
                      <span className=" text-red-500">*</span>
                    )} */}
                    {required && <span className=" text-red-500">*</span>}
                  </label>
                  <input
                    type={
                      name.toLowerCase() == "email".toLowerCase()
                        ? "email"
                        : name == "fullName"
                        ? "text"
                        : eye
                        ? "text"
                        : "password"
                    }
                    // value={email}

                    placeholder={` ${name}`}
                    className="border outline-0 border-gray-500 py-1 px-2 rounded"
                    name={name}
                    onChange={handleInput}
                  />

                  {name == "email" && email == "" ? (
                    <span className="text-red-500">{emailError}</span>
                  ) : name == "fullName" && fullName == "" ? (
                    <span className="text-red-500">{fullNameError}</span>
                  ) : name == "password" && password == "" ? (
                    <span className="text-red-500">{passwordError}</span>
                  ) : (
                    ""
                  )}
                  {/* <span
                    className="absolute  bottom-[33.3%] left-[19.5%] cursor-pointer"
                    onClick={handleEye}
                  >
                    {eye ? <IoEye /> : <IoEyeOffSharp />}
                  </span> */}
                </div>
              ))}
              <span
                className="absolute  bottom-[33.3%] left-[19.5%] cursor-pointer"
                onClick={handleEye}
              >
                {eye ? <IoEye /> : <IoEyeOffSharp />}
              </span>
              <div>
                {loadding ? (
                  <button className="px-18 py-2 bg-blue_color rounded-3xl text-white text-lg cursor-pointer mt-5">
                    lodding....
                  </button>
                ) : (
                  <button
                    onClick={handleSignUp}
                    className="px-18 py-2 bg-blue_color rounded-3xl text-white text-lg cursor-pointer mt-5"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
            <p className="mt-5 text-[#03014C] font-open text-[13.3px] text-font-normal">
              Already have an account ?
              <Link
                to={"/SignIn"}
                className="font-bold  hover:underline text-[#EA6C00] ml-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="w-1/2 h-svh bg-green-400">
          <img src={regis} alt={regis} />
        </div>
      </div>
    </div>
  );
};

export default Registration;
