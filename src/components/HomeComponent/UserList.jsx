import React, { useEffect, useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import { RiSearchLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Avatar from "../../assets/homeassets/avatar_animation.gif";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push, off } from "firebase/database";
import UserSkeleton from "../../Skeleon/UserSkeleton";
import { getAuth } from "firebase/auth";

const UserList = () => {
  // const [totalNumber, setTotalnumber] = useState(6);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedUser, setloggedUser] = useState({});
  const db = getDatabase();
  const auth = getAuth();

  //
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
    // ********** clean up function*****   (network requesting and when leave the pae off the connection)*********
    return () => {
      const userRef = ref(db, "users/"); //closing the data fetch from external network
      off(userRef);
    };
    // or other way-----(network requesting and when leave the pae off the connection)
    // return () => {
    //   const userRef = ref(db, "users/"); //fetching data by this function from external network
    //   off(userRef); //or //closing the data fetch from external network
    //   off(unsubscribe);  //closing the data fetch from external network
    // };
    // ********** clean up function*********
  }, []);
  // console.log(loggedUser);
  if (loading) {
    return <UserSkeleton />;
  }
  // console.log(userList);
  // console.log(loading);
  // console.log(auth.currentUser.uid);

  //**********  handleFrndRqstSend *********
  const handleFrndRqstSend = (item ={}) => { //item ={}---- default parameter
    console.log("hi", item);

    // ***************creating a database to store data for sending frnd rqst(firebase write operation)**********
    set(push(ref(db, "friendRequest/")), {
      senderUid: loggedUser.userUid,
      senderEmail: loggedUser.email,
      senderProfile_picture: loggedUser.profile_picture,
      senderUserKey: loggedUser.userKey,
      senderUsername: loggedUser.username,

      receiverUid: item.userUid,
      receiverEmail: item.email,
      receiverProfile_picture: item.profile_picture,
      receiverUserKey: item.userKey,
      receiverUsername: item.username,
    });
    // ***************creating a database to store data for sending frnd rqst(firebase write operation)**********
  };
  // ********** handleFrndRqstSend *********
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
                // key={item.userUid}
                className={
                  userList?.length == index + 1
                    ? "flex justify-between items-center pr-6 pb-2 pt-2 cursor-pointer"
                    : "flex justify-between items-center pr-6 pb-2 pt-2 border-b-2 border-gray-400 cursor-pointer"
                }
                key={index}
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
                  </h3>
                  <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                    Today, 8:56pm?
                  </p>
                </div>
                <button
                  className="bg-[#5F35F5] px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans"
                  type="button"
                  onClick={() => handleFrndRqstSend(item)}
                >
                  <FaPlus />
                </button>
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
