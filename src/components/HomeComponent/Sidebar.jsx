import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { GrHome } from "react-icons/gr";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { PiGearBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationIcons = [
    {
      id: 1,
      path: "/",
      icon: <GrHome />,
    },
    {
      id: 2,
      path: "massage",
      icon: <LuMessageCircleMore />,
    },
    {
      id: 3,
      path: "notification",
      icon: <FaRegBell />,
    },
    {
      id: 4,
      path: "settings",
      icon: <PiGearBold />,
    },
    {
      id: 5,
      path: "/",
      icon: <FiLogOut />,
    },
  ];
//   console.log(location.pathname);
  //   handleNavigationItem============
  const handleNavigationItem = (path = "/") => {
    // alert("ghhjgj")
    // console.log(path);
    navigate(path);
  };
  //   handleNavigationItem============
  return (
    <div>
      <div className="bg-[#5F35F5] w-[130px] h-[96vh] rounded-2xl">
        <div className="flex justify-center">
          <div className="w-[100px] h-[100px] rounded-full relative cursor-pointer group mt-10">
            <picture>
              <img
                src="https://images.pexels.com/photos/7862484/pexels-photo-7862484.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile picture"
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute left-1/4 top-1/2 -translate-y-1/2 text-white text-5xl hidden group-hover:block">
                <BiCloudUpload />
              </span>
            </picture>
          </div>
        </div>
        {/* navigation icons========== */}
        <div className="flex flex-col justify-center items-center mt-8 gap-y-10">
          {navigationIcons?.map((item, index) =>
            navigationIcons.length - 1 == index ? (
              <div
                 className= "text-[40px] text-white"
                key={item.id}
                onClick={() => handleNavigationItem(item.path)}
              >
                {item.icon}
              </div>
            ) : (
              <div
                className={
                  (location.pathname == item.path
                    ? "active text-[40px] text-white"
                    : "text-[40px] text-white")
                }
                key={item.id}
                onClick={() => handleNavigationItem(item.path)}
              >
                {item.icon}
              </div>
            )
          )}
        </div>
        {/* navigation icons========== */}
      </div>
    </div>
  );
};

export default Sidebar;
