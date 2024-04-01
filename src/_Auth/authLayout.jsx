import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import sideImg from "/assets/diaryImg.jpg";
import logo from "/assets/Scribble.png";
import { useUserContext } from "../context/AuthContext";

export default function AuthLayout() {
  const {isAuthenticated} = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/Home" />
      ) : (
        <>
          <img
            src={sideImg}
            alt="sideImg"
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat bg-[#1b1b1b]"
          />

          <section className="flex flex-1 justify-center items-center flex-col py-10 bg-[#1b1b1b]">
            <img className="w-36 m-12" src={logo} alt="" />
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}
