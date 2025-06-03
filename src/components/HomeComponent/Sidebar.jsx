import React, { useEffect, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { GrHome } from "react-icons/gr";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { PiGearBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";

const Sidebar = () => {
  const navigate = useNavigate(); //react DOM hook
  const location = useLocation();
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({});
  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const navigationIcons = [
    {
      id: 1,
      path: "/",
      icon: <GrHome />,
    },
    {
      id: 2,
      path: "/massage",
      icon: <LuMessageCircleMore />,
    },
    {
      id: 3,
      path: "/notification",
      icon: <FaRegBell />,
    },
    {
      id: 4,
      path: "/settings",
      icon: <PiGearBold />,
    },
    {
      id: 5,
      path: "/",
      icon: <FiLogOut />,
    },
  ];
  //   console.log(location.pathname);
  //   ************handleNavigationItem*****************
  const handleNavigationItem = (path = "/") => {
    // alert("ghhjgj")
    // console.log(path);
    navigate(path);
  };
  //   ************handleNavigationItem*****************

  //   *************handleUploadImg***************

  const handleUploadImg = () => {
    // alert("fhhgk");
    //*******taking 2 params (1.object, 1.callback function)in openUploadWidget function**********  */
    cloudinary.openUploadWidget(
      {
        cloudName: "drzjxio95",
        uploadPreset: "chatApp",
        sources: [
          "local",
          "url",
          "image_search",
          "unsplash",
          "google_drive",
          "istock",
        ],
        // googleApiKey: "AIrFcR8hKiRo",
        googleApiKey: googleApiKey, //original api key
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },

      (error, result) => {
        if (error) {
          throw new Error("failed to upload profile picture");
        }
        // console.log(result.info.secure_url);
        // ***********upadating cloudinary picture**********
        // let updateValue = {
        //   profile_picture: result?.info?.secure_url,
        // };
        // update(ref(db), updateValue);

        // or
        update(ref(db, `users/${userData.userKey}`), {
          profile_picture: result?.info?.secure_url,
        });

        // ***********upadating cloudinary picture**********
      }
    );
  };

  //   *************handleUploadImg***************

  //  ****************handleLogOut function**************

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // alert("hi")
        console.log("Sign-out successful.");
        navigate("/SignIn");
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  };
  //  console.log(auth.currentUser)
  //  ****************handleLogOut function**************

  // **********fetching data from firebase profile picture(cloudynary),username, matching uid& key ******************

  // **************initialising cloudinary to the project*************
  useEffect(() => {
    const script = document.createElement("script"); //doing dom manupulation, creating script tag to html
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js"; //asigning script tag to src attribute
    script.async = true; //doing script
    document.body.appendChild(script); //doing appendchild to body
  }, []);
  // console.log(window.cloudinary);
  // ***********initialising cloudinary to the project************

  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let userblankinfo = null;
        // const data = snapshot.val();
        snapshot.forEach((item) => {
          // conditional logic for identify unique id holder user or currentuser**********
          if (item.val().userUid === auth.currentUser.uid) {
            userblankinfo = { ...item.val(), userKey: item.key };
          }
          // conditional logic for identify unique id holder user or currentuser***********
        });
        setUserData(userblankinfo);
      });
    };
    fetchData();
  }, []);
  console.log(userData);
  // console.log(auth.currentUser.uid);

  //**********fetching data from firebase profile picture(cloudynary),username, matching uid& key****************
  return (
    <div>
      <div className="bg-[#5F35F5] w-[130px] h-[96vh] rounded-2xl">
        <div className="flex justify-center">
          <div className="w-[100px] h-[100px] rounded-full relative cursor-pointer group mt-10">
            <picture>
              <img
                src={
                  userData
                    ? userData.profile_picture
                    : "https://images.pexels.com/photos/7862484/pexels-photo-7862484.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt="Profile picture"
                className="w-full h-full object-cover rounded-full"
              />
              <span
                onClick={handleUploadImg}
                className="absolute left-1/4 top-1/2 -translate-y-1/2 text-white text-5xl hidden group-hover:block"
              >
                <BiCloudUpload />
              </span>
            </picture>
          </div>
        </div>
        {/* *************navigation icons**************/}
        <div className="flex flex-col justify-center items-center mt-8 gap-y-10">
          <div>
            <h1 className="text-emerald-200">
              {userData ? userData.username : "Name missing"}
            </h1>
          </div>
          {navigationIcons?.map((item, index) =>
            navigationIcons.length - 1 == index ? (
              <div
                className="text-[40px] text-green-300 cursor-pointer"
                key={item.id}
                onClick={handleLogOut}
              >
                {item.icon}
              </div>
            ) : (
              <div
                className={
                  location.pathname == item.path
                    ? "active text-[40px]  text-green-300 cursor-pointer"
                    : "text-[40px]  text-green-300 cursor-pointer"
                }
                key={item.id}
                onClick={() => handleNavigationItem(item.path)}
              >
                {item.icon}
              </div>
            )
          )}
        </div>
        {/************** navigation icon************* */}
      </div>
    </div>
  );
};

export default Sidebar;
