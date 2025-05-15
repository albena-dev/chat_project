import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { RiSearchLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Avatar from "../../assets/homeassets/avatar_animation.gif";
import { FaPlus } from "react-icons/fa";

const BlockList = () => {
  const [totalNumber, setTotalnumber] = useState(6);
  return (
    <div>
      <div className=" bg-gray-200 shadow-2xl p-2 rounded-2xl mb-2">
        <div>
          
          {/* User list=========== */}

          <div className="flex justify-between items-center pr-6 mt-2">
            <h1 className="relative font-semibold font-sans text-[18px]">
         BlockList
              <span className="absolute left-20 top-0 w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
                {totalNumber}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* BlockList list=========== */}

          {/* BlockList heading =========== */}
          <div className="h-[35dvh] overflow-y-scroll p-4">
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
                <div className="pr-12">
                  <h3 className="font-semibold font-sans text-[15px]">
                   Raghav
                  </h3>
                  <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                    Dinner?
                  </p>
                </div>
                <button className="bg-[#5F35F5] px-1 py-1 text-white text-[14px] rounded cursor-pointer font-sans">
               Unblock
                </button>
              </div>
            ))}
          </div>

          {/* BlockList heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default BlockList;
