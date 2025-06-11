// ************all import data************

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import { RiDribbbleFill, RiSearchLine } from "react-icons/ri";
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
 dayjs.extend(relativeTime); //plugin for dayjs
  const getTime = () => {
    return dayjs().format("MM DD YYYY, h:mm:ss a");
  };

// ************all import data************

const FriendRequest = () => {
  const [totalNumber, setTotalnumber] = useState(9);
  const [loading, setLoading] = useState(false);
  const [frndRqstList, setFrndRqstList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const userRef = ref(db, "friendRequest/"); //fetching data by this function from external network
      onValue(userRef, (snapshot) => {
        let frndRqstblankList = [];
        snapshot.forEach((item) => {
          // if (auth.currentUser.uid == item.val().senderUid)
           if (auth.currentUser.uid == item.val().receiverUid)
             {
            frndRqstblankList.push({
              ...item.val(),
              FRkey: item.key,
              sentAt: new Date(),
            });
          }
          // console.log(item.val());
        });
        setFrndRqstList(frndRqstblankList);
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
  }, []); //keeping a state variable(realtime) to rerender the bellow jsx and show the impect to the button
  // console.log(frndRqstList);
  // console.log(auth.currentUser.displayName);

  // *************handleAcceptFR function****************
  const handleAcceptFR = (fRitem) => {
    // console.log(fRitem.FRkey);
    set(push(ref(db, "friends/")), {
      ...fRitem,
      createdAt: new Date(),
    })
      .then(() => {
        const dbref = ref(db, `friendRequest/${fRitem.FRkey}`);
        remove(dbref);
      })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${fRitem.senderUsername} Accept a friend request`,
          // senderProfile_picture: senderUsername.profile_picture,
          // senderKey: senderUsername.senderKey,
        });
      })
      .then(() => {
        successToast(
          `${fRitem.senderUsername} send a friend request`,
          "top-center"
        );
      })
      .catch((error) => {
        console.error("error from sending friend request", error);
      });
  };
  // *************handleAcceptFR function****************

  // *************handleRejectFR function****************
  const handleRejectFR = (item = {}) => {
    // taking blank object as a default parameter --> (item={})
    const confrimMsg = confirm("Do you want to reject?");
    // console.log(confrimMsg);
    if (!confrimMsg) {
      return;
    }
    // to remove
    const dbref = ref(db, `friendRequest/${item.FRkey}`);
    remove(dbref);
  };

  // *************handleRejectFR function****************
  return (
    <div>
      <div className=" bg-gray-200 shadow-2xl p-2 rounded-2xl mb-2">
        <div>
          {/* FriendRequest list=========== */}

          <div className="flex justify-between items-center pr-6 mt-2">
            <h1 className="relative font-semibold font-sans text-[18px]">
              Friend Request
              <span className="absolute left-32 top-0 w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
                {frndRqstList.length}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* FriendRequest list=========== */}

          {/* FriendRequest heading =========== */}
          <div className="h-[35dvh] overflow-y-scroll p-4">
            {frndRqstList?.map((item, index) => (
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
                      src={item.senderProfile_picture || Avatar}
                      alt={Avatar}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </picture>
                </div>
                <div className="">
                  <h3 className="font-semibold font-sans text-[15px]">
                    {item.senderUsername}
                  </h3>
                  <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                  {dayjs(item.sentAt).fromNow()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptFR(item)} //to show whom frnd rqst is accepting, calling the function handleAcceptFR
                    className="bg-[#5F35F5] px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectFR(item)}
                    className="bg-[#f535d5e9]  px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FriendRequest heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
