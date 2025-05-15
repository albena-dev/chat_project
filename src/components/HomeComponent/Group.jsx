import React, { useState } from "react";
import Sidebar from "../../components/HomeComponent/Sidebar";
import { RiSearchLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Avatar from "../../assets/homeassets/avatar_animation.gif";
import { FaPlus } from "react-icons/fa";

const Group = () => {
  const [totalNumber, setTotalnumber] = useState(5);
  return (
    <div>
      <div className=" bg-gray-200 shadow-2xl p-2 rounded-2xl mb-2">
        <div>
          
          {/* User list=========== */}

          <div className="flex justify-between items-center pr-6 mt-2">
            <h1 className="relative font-semibold font-sans text-[18px]">
          Group
              <span className="absolute left-14 top-0 w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
                {totalNumber}
              </span>
            </h1>
            <span>
              <IoEllipsisVerticalSharp />
            </span>
          </div>
          {/* Group list=========== */}

          {/* Group heading =========== */}
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
                <div className="flex flex-col justify-center item-center ">
                  <h3 className="font-semibold font-sans text-[15px] ">
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

          {/* Group heading =========== */}
        </div>
      </div>
    </div>
  );
};

export default Group;
