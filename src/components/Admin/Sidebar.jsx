import { Link } from "react-router-dom";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaIdeal } from "react-icons/fa";


const Sidebar = ({ setAuthenticated }) => {
  return (
    <div className="w-48 h-screen bg-white border-r border-gray-200 text-black flex flex-col shadow-md">
      <div className="px-6 py-5 text-2xl font-bold font-secondary tracking-tight border-b">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-5 space-y-3 text-gray-800">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-black hover:text-white transition font-medium text-base"
        >
          <MdDashboard size={20} /> Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-black hover:text-white transition font-medium text-base"
        >
          <IoNewspaperOutline size={20} /> Orders
        </Link>

        <Link
          to="products"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-black hover:text-white transition font-medium text-base"
        >
          <MdProductionQuantityLimits size={20} /> Products
        </Link>

        <Link
          to="/admin/deals"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-black hover:text-white transition font-medium text-base"
        >
          <FaIdeal size={20} /> Deals
        </Link>

        <Link
          to="/admin/brands"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-black hover:text-white transition font-medium text-base"
        >
          <FaUsers size={20} /> Brands
        </Link>

        <Link
          to="/admin/categories"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-black hover:text-white transition font-medium text-base"
        >
          <FaUsers size={20} /> Categories
        </Link>
      </nav>

      <div className="px-4 py-4 border-t">
        <button
          onClick={() => setAuthenticated(false)}
          className="w-full flex items-center justify-center gap-2 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-900 font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
