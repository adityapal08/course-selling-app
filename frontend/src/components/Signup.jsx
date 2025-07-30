import React, { useState } from "react";
import logo from "../image/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState();

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(email, firstName, lastName, password);

    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/user/signup",
        {
          firstname,
          lastname,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup succesfull", response.data);
      toast.success(response.data.message);
      Navigate("/login");
    } catch (error) {
      if (error.response) {
        //alert(error.response.data.errors);
        setErrorMessage("signup failed");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="min-h-screen text-white container mx-auto px-20">
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold transform transition-transform duration-300 hover:scale-110">
              CodeLearner
            </h1>
          </div>
          <div className="space-x-4">
            <Link
              to={"/login"}
              className="bg-transparent text-white py-2 px-6 border border-white rounded-full"
            >
              Login
            </Link>
            <Link
              to={"/courses"}
              className="bg-orange-500 text-white py-2 px-6 hover:bg-red-600 duration-300 rounded-full"
            >
              Join us
            </Link>
          </div>
        </header>

        {/*signup form*/}
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-blue-950">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
            <h2 className="text-2xl text-center font-bold text-white">
              Welcome to <span className="text-orange-500">CourseHaven</span>
            </h2>
            <p className="text-center text-gray-400 text-sm">
              Just Signup To Join Us!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white mb-1">
                    Firstname
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your firstname"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-1">
                    Lastname
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your lastname"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              {errorMessage && (
                <div className="mb-4 text-red-500 text-center">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition duration-300"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
