import React, { useEffect, useState } from "react";
import { Page, Home } from "./Pages";
import logo from "/assets/Scribble.png";

import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useSignOutAccount } from "../lib/react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate()
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const [activeTab, setActiveTab] = useState("All Blogs");

  useEffect(() => {
    if (isSuccess){
      console.log("success");
      navigate(0);
    }

  }, [isSuccess]);

  const tabItems = [
    { label: "All Blogs", content: <Page /> },
    { label: "Private Blogs", content: <Home /> },
  ];

  const changeTab = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="w-full h-screen bg-black">
      <div className="flex justify-around items-center mb-3 bg-primary">
        <div className="border-2 p-2 rounded-full">
          <UserOutlined style={{ fontSize: "1.8vw", color: "#fff" }} />
        </div>

        <img className="w-40 m-12" src={logo} alt="" />
        <div className="cursor-pointer" onClick={() => signOut()}>
          <LogoutOutlined style={{ fontSize: "3vw", color: "#fff" }} />
        </div>
      </div>

      <div className="w-full mx-auto">
        <div className="flex border-b border-white">
          {tabItems.map(({ label }) => (
            <button
              key={label}
              className={`py-2 flex-grow text-white ${
                activeTab === label ? "border-b-2 border-blue-800" : ""
              }`}
              onClick={() => changeTab(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="pt-4">
          {tabItems.find((item) => item.label === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
