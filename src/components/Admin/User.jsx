import React, { useEffect, useState } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/auth/users/${id}`, {
        method: "DELETE"
      });
      setUsers(users.filter((u) => u._id !== id));
        setSuccessMsg("User Deleted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/users/${selectedUserId}/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword })
      });

      if (res.ok) {
        setSuccessMsg("Password updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
        setShowModal(false);
        setNewPassword("");
      }
    } catch (err) {
      console.error("Password reset failed:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
      {successMsg && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
          {successMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="mb-4 md:mb-0 p-3 border border-gray-300 rounded-lg w-full md:w-1/3"
        />
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((item) =>
                search.toLowerCase() === ""
                  ? true
                  : item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)
              )
              .map((user) => (
                <tr
                  key={user._id}
                  className="bg-white hover:bg-indigo-50 transition-transform duration-300 shadow-sm rounded-lg hover:shadow-md transform hover:scale-[1.02]"
                >
                  <td className="px-6 py-4 font-medium text-black">{user.name}</td>
                  <td className="px-6 py-4 font-medium text-black">{user.email}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setShowModal(true);
                      }}
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Password Reset Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
