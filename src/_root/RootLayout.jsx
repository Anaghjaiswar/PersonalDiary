import React, { useState } from "react";
import Home from "./Pages/Home";
import logo from "/assets/Scribble.png";

const RootLayout = () => {
  const [activeTab, setActiveTab] = useState("All Blogs");

  const tabItems = [
    { label: "All Blogs", content: "Private Blogs" },
    { label: "Private Blogs", content: <Home /> }
  ];

  const changeTab = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="w-full h-screen bg-black">
      <div className="flex justify-center items-center mb-3 bg-primary">
        <img className="w-36 m-12" src={logo} alt="" />
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
