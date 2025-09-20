import React, { useEffect, useState } from 'react';

const Tax = () => {
  const [tax, setTax] = useState(null);
  const [taxInput, setTaxInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTax = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/tax/");
      if (!res.ok) throw new Error("No tax found");
      const data = await res.json();
      setTax(data);
    } catch (err) {
      setTax(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tax/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taxValue: taxInput }),
      });
      const data = await res.json();
      setTax(data);
      setMessage("✅ Tax created successfully");
    } catch (err) {
      setMessage("❌ Failed to create tax");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tax/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taxValue: taxInput }),
      });
      const data = await res.json();
      setTax(data);
      setMessage("✅ Tax updated successfully");
    } catch (err) {
      setMessage("❌ Failed to update tax");
    }
  };

  const handleDelete = async () => {
    try {
      await fetch('http://localhost:3000/api/tax/delete', {
        method: 'DELETE',
      });
      setTax(null);
      setTaxInput('');
      setMessage("🗑️ Tax deleted");
    } catch (err) {
      setMessage("❌ Failed to delete tax");
    }
  };

  useEffect(() => {
    fetchTax();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🧾 Tax Management</h2>

      {message && (
        <div className="mb-4 text-sm px-4 py-2 bg-blue-50 border border-blue-200 text-blue-800 rounded">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading tax info...</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <label className="text-gray-700 font-medium">Tax Value (%):</label>
            <input
              type="number"
              value={taxInput}
              onChange={(e) => setTaxInput(e.target.value)}
              placeholder="Enter tax value"
              className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 w-full sm:w-64"
            />
          </div>

          {tax ? (
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
              >
                ✏️ Edit Tax
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                🗑️ Delete Tax
              </button>
            </div>
          ) : (
            <button
              onClick={handleCreate}
              disabled={!taxInput}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              ➕ Create Tax
            </button>
          )}

          <div className="mt-6">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border px-4 py-2">Tax Value</th>
                  <th className="border px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {tax ? (
                  <tr className="text-center">
                    <td className="border px-4 py-2">{tax.taxValue}%</td>
                    <td className="border px-4 py-2">
                      {new Date(tax.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-4 text-gray-500">
                      No tax record found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Tax;
