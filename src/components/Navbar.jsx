import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Travel", icon: "fa-plane" },
    { name: "Explore", icon: "fa-compass" },
    { name: "Flights", icon: "fa-ticket-alt" },
    { name: "Hotels", icon: "fa-hotel" },
    { name: "Vacation rentals", icon: "fa-home" },
  ];

  return (
    <nav
      className={` border-b border-gray-200 ${
        theme === "dark" && "bg-black text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-2">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-xl focus:outline-none md:hidden"
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="text-xl font-bold flex items-center ml-3">
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Logo"
              className="h-6"
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          {navItems.map((navItem, index) => (
            <div
              key={index}
              className={`px-4 py-2 border border-gray-400 rounded-full flex items-center space-x-2 ${
                navItem.name === "Flights" && "bg-blue-50 border-none"
              }`}
            >
              <i className={`text-blue-500 fa ${navItem.icon}`}></i>
              <span
                className={`font-normal ${
                  navItem.name === "Flights" && "text-blue-500"
                }`}
              >
                {navItem.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <i className={`fas fa-${theme === "light" ? "moon" : "sun"}`}></i>
          </button>
          <i className="text-xl fas fa-user-circle"></i>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out ${
          theme === "dark" && "bg-gray-800 text-white"
        } shadow-lg z-50`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-2xl p-4 focus:outline-none"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col space-y-4 px-4 mt-4">
          {navItems.map((navItem, index) => (
            <Link
              key={index}
              to={`/${navItem.name.toLowerCase()}`}
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <i className={`fa ${navItem.icon}`}></i>
              <span>{navItem.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
