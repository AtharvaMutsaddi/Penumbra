import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <div
        className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full cursor-pointer z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden transition-all duration-300 z-10`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>
        <div className="flex flex-col space-y-4 mt-6">
          <Link
            to="/"
            className="p-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Twitter
          </Link>
          <Link
            to="/youtube"
            className="p-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            YouTube
          </Link>
          <Link
            to="/instagram"
            className="p-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

