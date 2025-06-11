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
    return dayjs().format("MM DD YYYY, h:mm:ss a");
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const userRef = ref(db, "friends/"); //fetching data by this function from external network
      onValue(userRef, (snapshot) => {
        let frndblankList = [];
        snapshot.forEach((item) => {
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
  console.log(frndList);

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
            {frndList?.map((friend, index) => (
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
                <p className=" px-2 text-gray-500 text-[14px] font-sans ">
                  {dayjs(friend.sentAt).fromNow()}
                </p>
              </div>
            ))}
          </div>

          {/* Friends heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default Friends;
