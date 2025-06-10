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

// ************all import data************
const Friends = () => {
  const [totalNumber, setTotalnumber] = useState(6);
  const [loading, setLoading] = useState(false);
  const [frndList, setFrndList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

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
            // sentAt: NewDate(),
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
      const userRef = ref(db, "friendRequest/");
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
                {totalNumber}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* Friends list=========== */}

          {/* Friends heading =========== */}
          <div className="h-[35dvh] overflow-y-scroll p-4">
            {frndList.map((friend, index) => (
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
                <div>
                  <h3 className="font-semibold font-sans text-[15px]">
                    Raghav
                  </h3>
                  <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                    Dinner?
                  </p>
                </div>
                <p className=" px-2 text-gray-500 text-[14px] font-sans">
                  Today, 8:56pm
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
