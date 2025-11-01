import React from "react";
import { Link } from "react-router-dom";
import ScotlandFlag from "../assets/scotland-banner.svg"; // 🏴 add your flag image here

const ScotlandWidget = () => {
  return (
    <div className="fixed inset-y-0 flex items-center justify-center z-10">
      <Link
        to="/scotland"
        data-track="scotland_branch_widget_click"
        className="flex items-center gap-3 bg-white bg-opacity-50 shadow-md border border-gray-200 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-50"
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img
          src={ScotlandFlag}
          alt="Scotland Flag"
          className="w-6 h-6 rounded-full border border-gray-300"
        />
        <span className="text-blue-700 font-semibold text-sm md:text-base">
          Scotland Branch
        </span>
      </Link>
    </div>
  );
};

export default ScotlandWidget;
