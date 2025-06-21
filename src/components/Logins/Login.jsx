import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toaster from '../Shared/Toaster';
import { IoMdReturnLeft } from "react-icons/io";
import { Link, Navigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorToast, setErrorToast] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('user')) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
       setIsOpen2(true);
        setTimeout(() => {
            setIsOpen2(false);
            navigate("/");
        }, 2000);
    } else {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 3000);
    }
  };

  return (
    <div className="bg-black/90 h-screen flex items-center justify-center">
      {errorToast && <Toaster message="Invalid credentials" type="error" />}
    {
        isOpen2 && ( <Toaster message="Login Successful!" type="success" />)
    }

      <div>
        <Link to="/" className="absolute sm:top-4 top-4 left-2 sm:left-4 text-white font-bold border rounded-lg px-3 py-2 z-10 cursor-pointer bg-black/90 flex text-center items-center justify-center gap-2 border-black hover:scale-105 transition-all duration-300"><IoMdReturnLeft className='text-lg'/> Return To Homepage</Link>
        <h1 className="text-4xl uppercase tracking-widest font-bold text-center text-white">Login</h1>
        
        <form className="sm:w-lg w-sm mt-8 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <motion.input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required focus:border-0
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <motion.input
              type="password"
              name="password"
              value={password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required focus:border-0
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center text-sm">
              Don't have an account?
              <a href="/signup" className="text-red-600 ml-2 hover:underline">Signup</a>
            </span>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-200"
          >
            Login
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Login;
