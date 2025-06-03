import React from "react";

const UserSkeleton = () => {
  return (
    <div>
      <div>
        {[...new Array(4)].map((_, index) => (
          <div
            key={index}
            className={
              4 - 1 === index
                ? "flex justify-between items-center mt-3 pb-2"
                : "flex justify-between items-center mt-3 pb-2 border-b border-b-gray-800"
            }
          >
            {/* avater skeleton */}
            <div className="w-[50px] h-[50px] rounded-full bg-gray-700 animate-pulse "></div>
            {/* text skeleton */}
            <div className="flex flex-col gap-2 w-1/2">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className=" h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>

              {/* <p className="font-semibold font-sans text-[12px] text-[#4D4D4DBF]">
                Dinner?
              </p> */}
            </div>
            {/* button skeleton */}
            <button className="w-[40px] h-[40px] rounded-lg bg-gray-700 animate-pulse "></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSkeleton;
