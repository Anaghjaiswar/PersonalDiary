import React, { useEffect, useState } from "react";
import Modal from "./Pages/Modal";
import { Page, Home } from "./Pages";
import logo from "/assets/Scribble.png";

import {
  AppstoreAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { useSignOutAccount } from "../lib/react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const [activeTab, setActiveTab] = useState("All Blogs");

  useEffect(() => {
    if (isSuccess) {
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

  const handleAddBlog = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
      <div className="absolute bottom-10 md:bottom-20 md:right-10 right-5">
        <div className="addBlog z-99 flex justify-center items-center p-7 cursor-pointer rounded-full bg-primary w-24 md:w-24 m-4" onClick={handleAddBlog}>
          <AppstoreAddOutlined style={{ fontSize: "36px", color: "#d8d8d8" }} />
        </div>
      </div>

      {showModal && <Modal onClose={closeModal} />}
    </div>
  );
};

export default RootLayout;
