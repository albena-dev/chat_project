// ************all import data************
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import { RiSearchLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Avatar from "../../assets/homeassets/avatar_animation.gif";
import { FaPlus } from "react-icons/fa";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  off,
  remove,
} from "firebase/database";
import UserSkeleton from "../../Skeleon/UserSkeleton";
import { getAuth } from "firebase/auth";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// ************all import data************
const Friends = () => {
  const [totalNumber, setTotalnumber] = useState(6);
  const [loading, setLoading] = useState(false);
  const [frndList, setFrndList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  dayjs.extend(relativeTime); //plugin for dayjs
  const getTime = () => {
    // return dayjs().format("MM DD YYYY, h:mm:ss a");
    return dayjs();
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const userRef = ref(db, "friends/"); //fetching data by this function from external network
      onValue(userRef, (snapshot) => {
        let frndblankList = [];
        snapshot.forEach((item) => {
          if (auth?.currentUser?.uid !== item.val().senderUid) //condition to hide sender uid/info from the friendlist when accept the friendrqst, and if not match it will show the both info (sender and receiver info/uid)
            frndblankList.push({
              ...item.val(),
              friendkey: item.key,
              sentAt: new Date(),
            });

          // console.log(item.val());
        });
        setFrndList(frndblankList);
        setLoading(false);
      });
    };
    fetchData();
    // ********** clean up function*****   (network requesting and when leave the page, off the connection)*********
    return () => {
      const userRef = ref(db, "friends/");
      off(userRef); //closing the data fetch from external network using clean up function
    };

    // ********** clean up function*********
  }, []);
  // console.log(frndList);

  return (
    <div>
      <div className=" bg-gray-200 shadow-2xl p-2 rounded-2xl mb-2">
        <div>
          {/* Friends list=========== */}

          <div className="flex justify-between items-center pr-6 mt-2">
            <h1 className="relative font-semibold font-sans text-[18px]">
              Friends
              <span className="absolute left-17 top-0 w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
                {frndList.length}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* Friends list=========== */}

          {/* Friends heading =========== */}
          <div className="h-[35dvh] overflow-y-scroll p-4">
            {frndList?.length == 0 ? ( //to show alert msg using the condition(ternary operator)
              //"nei" //we can show a pop up/alert msg instead of nei
              //tailwind design from flowbite.com to show a alert msg when friends list will be empty
              <div
                className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Info alert!</span> Change a few
                  things up and try submitting again.
                </div>
              </div>
            ) : (
              //tailwind UI design from flowbite.com to show a alert msg when friends list will be empty
              frndList?.map((friend, index) => (
                <div
                  className={
                    totalNumber == index + 1
                      ? "flex justify-between items-center pr-6 pb-2 pt-2 cursor-pointer"
                      : "flex justify-between items-center pr-6 pb-2 pt-2 border-b-2 border-gray-400 cursor-pointer"
                  }
                  key={index}
                >
                  <div className="w-[50px] h-[50px] rounded-full ">
                    <picture>
                      <img
                        src={friend.senderProfile_picture || Avatar}
                        alt={Avatar}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </picture>
                  </div>

                  <div className="flex flex-col px-2">
                    <h3 className="font-semibold font-sans text-[15px]">
                      {friend.senderUsername}
                    </h3>
                    <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                      Hello?
                    </p>
                  </div>
                  <p className=" text-gray-500 text-[14px] font-sans ">
                    {dayjs(friend.sentAt).fromNow()}
                  </p>

                  <button
                    // onClick={() => handleRejectFR(item)}
                    className="bg-[#f5353fe9]  px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans"
                  >
                    Block
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Friends heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default Friends;
