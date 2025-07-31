import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.webp";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const handleLogOut = async () => {
    //const user = JSON.parse(localStorage.getItem("user"));
    //const token = user?.token;
    try {
      //const admin = JSON.parse(localStorage.getItem("admin"));
      //const token = user?.admin;
      // console.log("Token: ", token);

      const response = await axios.get(
        "http://localhost:4001/api/v1/admin/logout",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("enter handle");
      localStorage.removeItem("user");
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
          <img src={logo} alt="Profile" className="rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded transform hover:scale-105 transition duration-200">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/course-create">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded transform hover:scale-105 transition duration-200">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transform hover:scale-105 transition duration-200">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogOut}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transform hover:scale-105 transition duration-200"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%]">
        Welcome!!!
      </div>
    </div>
  );
};

export default Dashboard;
