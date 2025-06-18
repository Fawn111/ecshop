import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toaster from '../Shared/Toaster'; // Optional if you want error/success toast

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorToast, setErrorToast] = useState(false);
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
      navigate('/'); 
    } else {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-800 via-rose-600 to-pink-800 h-screen flex items-center justify-center">
      {errorToast && <Toaster message="Invalid credentials" type="error" />}

      <div>
        <h1 className="text-4xl uppercase tracking-widest font-bold text-center text-white">Login</h1>
        <form className="w-lg mt-8 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
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
            <input
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
              <a href="/signup" className="text-primary ml-2 hover:underline">Signup</a>
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
