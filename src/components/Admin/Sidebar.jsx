import { Link } from "react-router-dom";
import { MdDashboard, MdProductionQuantityLimits  } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const Sidebar = ({ setAuthenticated }) => {


  return (
    <div className="w-64 bg-white text-black flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold font-secondary tracking-tight border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2 ">
        <Link to="/admin/dashboard" className="flex items-center gap-2 hover:bg-black hover:text-white p-2 font-semibold rounded-2xl text-lg"><MdDashboard /> Dashboard</Link>

        <div className="space-y-1">
          <Link to="/admin/orders" className="flex items-center gap-2 hover:bg-black hover:text-white p-2 font-semibold rounded-2xl text-lg"><IoNewspaperOutline/> Orders</Link>
          <Link to="/admin/products" className="flex items-center gap-2 hover:bg-black hover:text-white p-2 font-semibold rounded-2xl text-lg">< MdProductionQuantityLimits /> Products</Link>
        </div>

        <Link to="/admin/users" className="flex items-center gap-2 hover:bg-black hover:text-white p-2 font-semibold rounded-2xl text-lg"><FaUsers/> Users</Link>
      </nav>

      <div className="px-4 py-4 border-t border-gray-700 ">
        <button className="flex items-center justify-center gap-2 text-white px-5 py-2 rounded-2xl hover:bg-brandGreen bg-black font-semibold hover:border-brandGreen cursor-pointer" onClick={() => setAuthenticated(false)}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
