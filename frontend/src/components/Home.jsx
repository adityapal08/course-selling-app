import React, { useEffect, useState } from "react";
import logo from "../image/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
//import cors from "cors";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogOut = async () => {
    //const user = JSON.parse(localStorage.getItem("user"));
    //const token = user?.token;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      console.log("Token: ", token);

      const response = await axios.get(
        "http://localhost:4001/api/v1/user/logout",
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
      setIsLoggedIn(false);
      //window.location.reload();
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/course/courses",
          { withCredentials: true }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error in fetchCourses", error);
      }
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="min-h-screen text-white container mx-auto px-20">
        {/*Header*/}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold transform transition-transform duration-300 hover:scale-110">
              CodeLearner
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="bg-transparent text-white py-2 px-4 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white py-2 px-4 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white py-2 px-4 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/*Main section*/}
        <section className="text-center py-20">
          <h1 className="text-4xl font-bold text-orange-500 transform transition-transform duration-300 hover:scale-160">
            CodeLearner
          </h1>
          <br />

          <p className="text-gray-500">
            Sharpen yoyr skills with courses crafted by experts!
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white rounded py-3 px-6 font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore Courses
            </Link>
            <Link
              to={"https://www.linkedin.com/in/aditya-pal-5b376332a/"}
              className="bg-green-500 text-white rounded py-3 px-6 font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Courses Videos
            </Link>
          </div>
        </section>
        <section className="pb-20">
          {/*<h2 className="text-3xl text-center font-bold text-white mb-10 underline underline-offset-3 hover:text-orange-700 duration-300">
            Trending Courses
          </h2>*/}
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="px-3">
                <div className="bg-gradient-to-br from-blue-900/40 to-black/30 text-white rounded-xl  shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 h-full backdrop-blur-md">
                  <img
                    src={course.image?.url}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between h-48">
                    <h3 className="text-lg font-semibold text-center truncate">
                      {course.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-2 text-center">
                      Expert-curated content to boost your skills.
                    </p>
                    <div className="mt-4 text-center">
                      <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2 px-4 rounded-full hover:from-blue-500 hover:to-purple-600 transition-colors duration-300">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr />
        {/*Footer*/}
        <footer>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-2">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="h-10 w-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold transform transition-transform duration-300 hover:scale-110">
                  CodeLearner
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-500 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-500 duration-300" />
                  </a>
                </div>
              </div>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Connect us</h3>
              <ul className="space-y-1 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Youtube -learn coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Telegram -learn coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github -learn coding
                </li>
              </ul>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                Copyrights&#169;2024
              </h3>
              <ul className="space-y-1 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
