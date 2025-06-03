import React, { useEffect, useState } from "react";
import Sidebar from "../HomeComponent/Sidebar";
import { Outlet, useNavigate } from "react-router";
import VellidationError from "../../pages/Error/VellidationError";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Use Firebase services with `app` here
import { successToast } from "../../library/toast";
import app from "../../../Database/Firebase.config";
//  const navigate = useNavigate(); //react-DOM hook

const RootLayout = () => {
  // function for verified email using firebase observer and conditional logic using useEffect hook=======
  const navigate = useNavigate(); //react-DOM hook
  const auth = getAuth();
  const [isuserVerified, setIsuserVerified] = useState(false); //react hook
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setIsuserVerified(user.emailVerified);
      } else {
        navigate("/SignIn");
        successToast("Please verify your email");
      }
    });
  }, []);
  console.log(isuserVerified);

  // function for verified email using firebase observer and conditional logic using useEffect hook======
  return (
    <div>
      {isuserVerified ? (
        <div className=" flex justify-between gap-x-5 p-3">
          <div>
            <Sidebar />
          </div>
          <div className=" w-full h-[96dvh] rounded-2xl bg-green-300">
            <Outlet />
          </div>
        </div>
      ) : (
        <VellidationError />
      )}
    </div>
  );
};

export default RootLayout;
