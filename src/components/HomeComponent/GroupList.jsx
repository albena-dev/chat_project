import React, { useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import { RiSearchLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Avatar from "../../assets/homeassets/avatar_animation.gif";

const GroupList = () => {
  const [totalNumber, setTotalnumber] = useState(6);
  return (
    <div>
      <div className="w-[385px] bg-blue-300  p-2">
        <div>
          <div className="relative pt-2 mx-auto text-gray-600  px-0 flex justify-between items-center">
            <button
              type="submit"
              className="absolute left-0 top-0 mt-5 mr-4 px-2"
            >
              <span>
                <RiSearchLine />
              </span>
            </button>
            <input
              type="search"
              name="search"
              placeholder="search"
              className="border-2 border-gray-300 bg-white h-10 px-8 pr-40 rounded-lg text-sm focus:outline-none"
            />

            <button type="submit" className="absolute right-2 top-0 mt-5 mr-4">
              <span>
                <IoEllipsisVerticalSharp />
              </span>
            </button>
          </div>
          {/* group list=========== */}

          <div className="flex justify-between items-center pr-6 mt-2">
            <h1 className="relative font-semibold font-sans text-[18px]">
              Groups List
              <span className="absolute left-24 top-0 w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
                {totalNumber}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* group list=========== */}

          {/* group heading =========== */}
          <div className="h-[337px] overflow-y-scroll p-4">
            {[...new Array(totalNumber)].map((_, index) => (
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
                      src={Avatar}
                      alt={Avatar}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </picture>
                </div>
                <div>
                  <h3 className="font-semibold font-sans text-[15px]">
                    Friends Reunion
                  </h3>
                  <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                    Hi Guys, Wassup!
                  </p>
                </div>
                <button className="bg-[#5F35F5] px-2 text-white text-[14px] rounded cursor-pointer font-sans">
                  Join
                </button>
              </div>
            ))}
          </div>

          {/* group heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
