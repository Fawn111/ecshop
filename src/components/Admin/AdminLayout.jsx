import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toaster from "../Shared/Toaster";

const AdminLayout = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  const ADMIN_PASSWORD = "admin123";

  // const handleLogin = () => {
  //   if (inputPassword === ADMIN_PASSWORD) {
  //     setAuthenticated(true);
  //     setInputPassword("");
  //     navigate("/admin/dashboard"); // ✅ Corrected navigation
  //   } else {
  //     setWarning(true);
  //     setTimeout(() => setWarning(false), 2000);
  //   }
  // };

  // if (!authenticated) {
  //   return (
  //     <>
  //       {warning && <Toaster message="Incorrect Password!" type="error" />}
  //       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  //         <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
  //           <h2 className="text-xl font-bold mb-4">Admin Login</h2>
  //           <input
  //             type="password"
  //             placeholder="Enter admin password"
  //             value={inputPassword}
  //             onChange={(e) => setInputPassword(e.target.value)}
  //             className="w-full p-2 border rounded mb-4"
  //           />
  //           <button
  //             onClick={handleLogin}
  //             className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
  //           >
  //             Access Admin Panel
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className="flex h-screen">
      <Sidebar setAuthenticated={setAuthenticated} />
      <div className="flex flex-col flex-1 bg-gray-100">
        <Topbar />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
