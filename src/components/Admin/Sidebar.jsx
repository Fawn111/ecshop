import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          📊 Dashboard
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 p-2 text-sm font-medium text-gray-300">
            🔽 News
          </div>

          <Link
            to="/admin/orders"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            🧾 Orders
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
          >
            🛒 Products
          </Link>
        </div>

        <Link
          to="/admin/users"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          👥 Users
        </Link>
      </nav>

      <div className="px-4 py-4 border-t border-gray-700">
        <button className="flex items-center gap-2 text-red-400 hover:text-red-200">
          🔓 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
