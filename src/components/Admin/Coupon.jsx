import React, { useState, useEffect } from "react";

const CouponModal = ({ onClose, existingCoupon, onSaved }) => {
  const isEditMode = !!existingCoupon;

  const [coupon, setCoupon] = useState(
    existingCoupon || {
      code: "",
      discountType: "",
      value: 0,
      expiryDate: "",
    }
  );

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        isEditMode
          ? `http://localhost:3000/api/coupon/${coupon._id}`
          : `http://localhost:3000/api/coupon/add`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coupon),
        }
      );

      const data = await res.json();
      console.log(isEditMode ? "Coupon updated:" : "Coupon added:", data);
      onSaved();
      onClose();
    } catch (error) {
      console.error("Error saving coupon:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditMode ? "Edit Coupon" : "Add Coupon"}
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Code.."
            name="code"
            value={coupon.code}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <select
            name="discountType"
            value={coupon.discountType}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Discount Type</option>
            <option value="percentage">Percentage</option>
            <option value="value">Flat</option>
          </select>

          <input
            type="number"
            placeholder="Value.."
            name="value"
            value={coupon.value}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="date"
            name="expiryDate"
            value={coupon.expiryDate?.split("T")[0] || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Coupon = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);
  const [search, setSearch] = useState("");
  const [coupon, setCoupon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchCoupon = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/coupon/");
      if (!res.ok) throw new Error("Failed To Fetch Coupon");
      const data = await res.json();
      setCoupon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/coupon/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete Coupon");
      setSuccessMsg("Coupon Deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      setCoupon((prevCoupon) => prevCoupon.filter((c) => c._id !== id));
    } catch (error) {
      alert(`Error deleting Coupon: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  if (loading) return <p>Loading Coupons...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
      {successMsg && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
            {successMsg}
          </div>
        )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Coupons</h2>
        <button
          onClick={() => {
            setEditCoupon(null);
            setModalOpen(true);
          }}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-brandGreen transition"
        >
          + Add Coupon
        </button>
      </div>

      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Coupon..."
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full md:w-1/3"
      />
      <button
        onClick={fetchCoupon}
        className="px-4 py-2 ml-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
      >
        Refresh
      </button>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4 mt-4">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Coupon Code</th>
              <th className="px-6 py-3 font-semibold">Discount Type</th>
              <th className="px-6 py-3 font-semibold">Value</th>
              <th className="px-6 py-3 font-semibold">Expiry Date</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupon
              .filter((item) =>
                search.toLowerCase() === ""
                  ? item
                  : item.code.toLowerCase().includes(search)
              )
              .map((p) => (
                <tr
                  key={p._id}
                  className="bg-white hover:bg-indigo-50 transition-transform duration-300 shadow-sm rounded-lg hover:shadow-md transform hover:scale-[1.02]"
                >
                  <td className="px-6 py-4 font-medium">
                    <span className="border py-1 px-2 rounded-2xl bg-red-400 text-white">
                      {p.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{p.discountType}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className="border py-1 px-2 rounded-2xl bg-brandGreen text-white">
                      {p.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {new Date(p.expiryDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => {
                        setEditCoupon(p);
                        setModalOpen(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <CouponModal
          onClose={() => setModalOpen(false)}
          existingCoupon={editCoupon}
          onSaved={fetchCoupon}
        />
      )}
    </div>
  );
};

export default Coupon;
