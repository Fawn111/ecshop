import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toaster from '../Shared/Toaster';
import { IoMdReturnLeft } from "react-icons/io";
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorToast, setErrorToast] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log('Login response status:', res.status);
    console.log('Login response body:', data);

    if (!res.ok) {
      setErrorToast(data.message || 'Login failed');
      setTimeout(() => setErrorToast(''), 3000);
      return;
    }

    // ─── SUCCESS ─────────────────────────────────────────────────────────────
    // 1) Store token & user
    localStorage.setItem('token', data.token);
    localStorage.setItem('loggedInUser', JSON.stringify(data.user));
    localStorage.setItem('isLoggedIn', 'true');

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      navigate('/');
    }, 2000);

  } catch (err) {
    console.error('Fetch error:', err);
    setErrorToast('Server error. Try again later.');
    setTimeout(() => setErrorToast(''), 3000);
  }
};



  return (
    <div className="bg-black/90 h-screen flex items-center justify-center">
      {errorToast && <Toaster message={errorToast} type="error" />}
      {successToast && <Toaster message="Login Successful!" type="success" />}

      <div>
        <Link to="/" className="absolute sm:top-4 top-4 left-2 sm:left-4 text-white font-bold border rounded-lg px-3 py-2 z-10 cursor-pointer bg-black/90 flex text-center items-center justify-center gap-2 border-black hover:scale-105 transition-all duration-300">
          <IoMdReturnLeft className='text-lg' /> Return To Homepage
        </Link>
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
              required
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
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center text-sm">
              Don't have an account?
              <Link to="/signup" className="text-red-600 ml-2 hover:underline">Signup</Link>
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
