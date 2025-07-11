import React from 'react'
import Toaster from '../Shared/Toaster';
import { IoMdReturnLeft } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user.name || !user.email || !user.password) {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setIsOpen2(true);
    setTimeout(() => {
      setIsOpen2(false);
      navigate("/login");
    }, 2000);
  } catch (err) {
    setIsOpen(true);
    console.error("Signup Error:", err.message);
  }
};
    return (
        <>
            {isOpen && <Toaster message="Please Fill All Fields" type="error" />}
            {isOpen2 && <Toaster message="Signup Successful! Redirecting to Login..." type="success" />}

            <div className='bg-black/90 h-screen flex items-center justify-center'>
                <div>
                    <Link to="/" className="absolute sm:top-4 top-4 left-2 sm:left-4 text-white font-bold border rounded-lg px-3 py-2 z-10 cursor-pointer bg-black/90 flex text-center items-center justify-center gap-2 border-black hover:scale-105 transition-all duration-300">
                        <IoMdReturnLeft className='text-lg' /> Return To Homepage
                    </Link>
                    <h1 className="text-4xl font-bold text-center text-white uppercase tracking-widest">Signup</h1>
                    <form className="sm:w-xl w-sm mt-8 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input type="text" name='name' onChange={handleInput} placeholder="Enter your name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-0" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name='email' onChange={handleInput} placeholder="Enter your email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-0" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type="password" name='password' onChange={handleInput} placeholder='Enter Your Password' className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-0" />
                        </div>
                        <div className='mb-4 flex justify-between items-center'>
                            <label className="inline-flex items-center text-sm">
                                Already have an account? <Link to="/login" className="text-red-600 ml-1 hover:underline">Login</Link>
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-200">Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
