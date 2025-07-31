import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../image/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { RiHome2Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("Courses:", courses);

  //token
  useEffect(() => {
    const token = localStorage.getItem("user");
    //console.log("Home page: ", token);
    //setIsLoggedIn(!!token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //logout
  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
        },
        {
          /*{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }*/
        }
      );
      console.log("enetr handle");
      localStorage.removeItem("user");
      toast.success(response.data.message);
      setIsLoggedIn(false);
      //window.location.reload();
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
  //fetch data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetchCourses", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex ">
      {/*sidebar*/}
      <aside className="w-64 bg-gray-100 h-screen p-5 fixed">
        <div className="flex items-center mb-10 space-x-2.5">
          <img src={logo} alt="Profile" className="rounded-full h-10 w-10" />
          <h1 className="text-2xl text-orange-500 font-bold transform transition-transform duration-300 hover:scale-110">
            CodeLearner
          </h1>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center">
                <span className="material-icons mr-2">
                  <RiHome2Fill />
                </span>
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <span className="material-icons mr-2">
                  <FaDiscourse />
                </span>
                Courses
              </a>
            </li>
            <li className="mb-4">
              <a href="/purchases" className="flex items-center">
                <span className="material-icons mr-2">
                  <FaDownload />
                </span>
                Purchases
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <span className="material-icons mr-2">
                  <IoMdSettings />
                </span>
                Settings
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <a
                  href="/"
                  className="flex items-center"
                  onClick={handleLogOut}
                >
                  <span className="mr-2">
                    <IoLogOut />
                  </span>
                  Logout
                </a>
              ) : (
                <>
                  <a href="/login" className="flex items-center">
                    <span className="mr-2">
                      <IoLogIn />
                    </span>
                    Login
                  </a>
                </>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/*main section*/}
      <main className="ml-[20%] w-[80%] bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-xl">Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type here to search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
              />
              <button className="border border-gray-300 h-10 rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>
            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>
        {/*vertically scrollable courses section*/}
        <div className="overflow-y-auto h-(75vh)">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">
              No courses posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded mb-4"
                  />
                  <h2 className="font-bold mb-2 text-lg">{course.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xl text-black">
                        ₹{course.price}
                      </span>
                      <span className="text-gray-500 line-through">₹5999</span>
                    </div>
                    <span className="text-green-600 text-sm sm:text-base">
                      20% off
                    </span>
                  </div>

                  {/*buy*/}
                  <Link
                    to={`/buy/${course._id}`}
                    className="bg-orange-500 w-full px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                  >
                    Buy now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
