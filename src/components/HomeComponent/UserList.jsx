import React, { useEffect, useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import { RiSearchLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Avatar from "../../assets/homeassets/avatar_animation.gif";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push, off } from "firebase/database";
import UserSkeleton from "../../Skeleon/UserSkeleton";
import { getAuth } from "firebase/auth";
import { successToast } from "../../library/toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const UserList = () => {
  // const [totalNumber, setTotalnumber] = useState(6);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedUser, setloggedUser] = useState({});
  const [realtime, setRealtime] = useState(false);
  const [frndRqstList, setFrndRqstList] = useState([]);
  const [requestSend, setRequestSend] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  dayjs.extend(relativeTime); //plugin for dayjs
  const getTime = () => {
    return dayjs().format("MM DD YYYY, h:mm:ss a");
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const userRef = ref(db, "users/"); //fetching data by this function from external network
      const unsubscribe = onValue(userRef, (snapshot) => {
        let userblankList = [];
        // const data = snapshot.val();
        snapshot.forEach((item) => {
          if (item.val().userUid !== auth.currentUser.uid) {
            // to hide currentUser in userlist
            userblankList.push({ ...item.val(), userKey: item.key });
          } else {
            let user = Object.assign({ ...item.val(), userKey: item.key });
            setloggedUser(user);
          }
        });
        setUserList(userblankList);
        setLoading(false);
      });
    };
    fetchData();
    // ********** clean up function*****   (network requesting and when leave the page, off the connection)*********
    return () => {
      const userRef = ref(db, "users/");
      off(userRef); //closing the data fetch from external network using clean up function
    };
    // or other way-----(network requesting and when leave the page, off the connection)
    // return () => {
    //   const userRef = ref(db, "users/"); //fetching data by this function from external network
    //   off(userRef); //or //closing the data fetch from external network
    //   off(unsubscribe);  //closing the data fetch from external network
    // };
    // ********** clean up function*********
  }, [realtime]); //keeping a state variable(realtime) to rerender the bellow jsx and show the impect to the button
  // console.log(loggedUser);

  //**********fetching /saving friendRequest data(firebase storage)******
  useEffect(() => {
    const fetchFriendRequest = () => {
      const userRef = ref(db, "friendRequest/"); //fetching data by this function from external network
      onValue(userRef, (snapshot) => {
        let userFrndRqstList = [];
        // const data = snapshot.val();
        snapshot.forEach((item) => {
          if (
            loggedUser?.userUid ||
            auth.currentUser.uid == item.val().senderUid
          ) {
            // console.log(item.val()); //to see the data from firabase data
            userFrndRqstList.push(
              auth?.currentUser?.uid?.concat(item.val().receiverUid) //one from local storage and one from server dada store
            );
          }
        });
        setRequestSend(userFrndRqstList);
        setLoading(false);
      });
    };
    fetchFriendRequest();
    // **********clean up function************
    return () => {
      const userRef = ref(db, "friendRequest/");
      off(userRef);
    };
    // **********clean up function************
  }, []);
  // console.log(frndRqstList);
  // console.log(requestSend);

  //**********fetching /saving friendRequest data(firebase storage)******

  if (loading) {
    return <UserSkeleton />;
  }
  // console.log(userList);
  // console.log(loading);
  // console.log(auth.currentUser.uid);

  //**********  handleFrndRqstSend *********
  const handleFrndRqstSend = (item = {}) => {
    //item ={}---- default parameter
    // console.log("hi", item);
    // let userInfo = {
    //   name: "chat",
    //   id: 6768,
    // };
    // ************converting object to JSON data using stringify function*****************
    // localStorage.setItem("information", JSON.stringify(userInfo)); //to convert JSON format function
    // return;
    // ************converting object to JSON data using stringify function*****************
    // ***************creating a database(local) to store data for sending frnd rqst(firebase write operation)**********
    set(push(ref(db, "friendRequest/")), {
      senderUid: loggedUser.userUid || auth.currentUser.uid,
      senderEmail: loggedUser.email,
      senderProfile_picture: loggedUser.profile_picture,
      senderUserKey: loggedUser.userKey,
      senderUsername: loggedUser.username,

      // senderUid: senderUid.userUid || auth.currentUser.uid,
      // senderEmail: senderEmail.email,
      // senderProfile_picture: senderprofile_picture.profile_picture,
      // senderUserKey: senderUserKey.userKey,
      // senderUsername: senderUsername.username,

      receiverUid: item.userUid,
      receiverEmail: item.email,
      receiverProfile_picture: item.profile_picture,
      receiverUserKey: item.userKey,
      receiverUsername: item.username,
      createdAt: new Date(),
    })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${loggedUser.username} send a friend request`,
          senderProfile_picture: loggedUser.profile_picture,
        });
      })
      .then(() => {
        successToast(
          `${loggedUser.username} send a friend request`,
          "top-center"
        );
      })
      .then(() => {
        let userInfo = {
          //taking an object named userInfo
          FriendRqstId: loggedUser.userUid + item.userUid, //in the userInfo property = key(FriendRqstId) and value(sender + receiver)
        };
        // saving the info to localstorage
        localStorage.setItem("senderReceiverId", JSON.stringify(userInfo)); //converting into JSON format
        setRealtime(true); //to show in realtime
      })
      .catch((error) => {
        console.error("error from sending friend request", error);
      });
    // ***************creating a database(local) to store data for sending frnd rqst(firebase write operation)**********
  };

  // ********** handleFrndRqstSend *********

  // ************getting senderReceiverId from localstorage**********
  const senderReceiverId = JSON.parse(localStorage.getItem("senderReceiverId")); //to conver JSON to object function using parse
  // console.log(senderReceiverId?.FriendRqstId);
  // ***********getting senderReceiverId from localstorage**********

  return (
    <div>
      <div className=" bg-gray-200 shadow-2xl p-2 rounded-2xl mb-2">
        <div>
          {/* User list=========== */}

          <div className="flex justify-between items-center pr-6 mt-2">
            <h1 className="relative font-semibold font-sans text-[18px]">
              UserList
              <span className="absolute left-17 top-0 w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
                {userList?.length}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* User list=========== */}

          {/* User heading =========== */}
          <div className="h-[35dvh] overflow-y-scroll p-4 ">
            {userList?.map((item, index) => (
              <div
                key={item.userUid}
                // key={index}
                className={
                  userList?.length == index + 1
                    ? "flex justify-between items-center pr-6 pb-2 pt-2 cursor-pointer"
                    : "flex justify-between items-center pr-6 pb-2 pt-2 border-b-2 border-gray-400 cursor-pointer"
                }
              >
                <div className="w-[50px] h-[50px] rounded-full">
                  <picture>
                    <img
                      src={item.profile_picture}
                      alt={Avatar}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </picture>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold font-sans text-[15px]">
                    {item.username}
                    {/* key={index} */}
                  </h3>
                  <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                    {item.createdAt
                      ? dayjs(item.createdAt).fromNow()
                      : "Just now"}
                   
                  </p>
                </div>
                {/* to show frndrqst button +(plus) or -(minus) */}
                {/* // *************condition for if it is match with localStoragedata and userInfo, that means frndRqst send, will show minus button ************ */}
                {/* {senderReceiverId?.FriendRqstId == loggedUser.userUid + item.userUid ? FriendRqstId == loggedUser.userUid + item.userUid ? */}
                {requestSend.includes(
                  auth.currentUser.uid.concat(item.userUid)
                ) ? ( //to find any arry available or not using includes method
                  <button
                    className="bg-[#5F35F5] px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans"
                    type="button"
                    // onClick={() => handleFrndRqstSend(item)}
                    // no need to click after sending frndrqst, it will remain minus button and if localstorage data will deleted then it will back to plus button, to stop it(realtime changes) we need to do rerender it
                  >
                    <FaMinus />
                  </button>
                ) : (
                  <button
                    className="bg-[#5F35F5] px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans"
                    type="button"
                    onClick={() => handleFrndRqstSend(item)}
                  >
                    <FaPlus />
                  </button>
                  // *************condition for if it is match with localStoragedata and userInfo, that means frndRqst send *************
                )}
              </div>
            ))}
          </div>

          {/* User heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default UserList;
