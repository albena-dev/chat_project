import React from "react";
import Sidebar from "../HomeComponent/Sidebar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <div className=" flex justify-between gap-x-5 p-3">
        <div>
          <Sidebar />
        </div>
        <div className=" w-full h-[96dvh] rounded-2xl bg-green-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
