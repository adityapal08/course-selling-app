import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const Purchases = () => {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);

  console.log("Purchases:", purchases);

  //token
  useEffect(() => {
    const token = localStorage.getItem("user");
    console.log(localStorage.getItem("user"));

    //console.log("Home page: ", token);
    //setIsLoggedIn(!!token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //logout
  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log("user: ", user);
    const token = user?.token;
    console.log("Frontend token: ", token);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("enetr handle");
      localStorage.removeItem("user");
      toast.success(response.data.message);
      setIsLoggedIn(false);
      //window.location.reload();
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error("Error in logging out");
    }
  };
  //fetch data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const fetchPurchases = async () => {
      if (!token) {
        setErrorMessage("Please login to purchase the courses");
        return;
      }
      try {
        //setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPurchase(response.data.courseData);
      } catch (error) {
        setErrorMessage("Failed to purchase");
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="flex h-screen">
      {/*sidebar*/}
      <div className="w-64 bg-gray-100 p-5">
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" />
                Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" />
                Courses
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center  text-blue-500">
                <FaDownload className="mr-2" />
                Purchases
              </a>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {/*main section*/}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-xl font-semibold mb-6">My Purchases</h2>

        {/*Error message*/}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/*render purchases*/}
        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchases.map((purchase, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                <div className="flex flex-col items-center space-y-4">
                  <img
                    className="rounded-lg w-full h-48 object-cover"
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200"
                    }
                    alt={purchase.title}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{purchase.title}</h3>
                    <p className="text-gray-500">
                      {purchase.description.length > 100
                        ? `${purchase.description.slice(0, 100)}...`
                        : purchase.description}
                    </p>
                    <span className="text-green-700 font-semibold text-sm">
                      ${purchase.price} only
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no purchases yet.</p>
        )}
      </div>
    </div>
  );
};

export default Purchases;
