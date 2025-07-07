import React, { useEffect, useState } from 'react';

function CreateDeal() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
   const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'percentage',
    discountValue: 0,
    dealTarget: '',
    product: '',
    category: '',
    brand: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/category/')
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch('http://localhost:3000/brands/all')
      .then(res => res.json())
      .then(data => setBrands(data));

    fetch('http://localhost:3000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetchDeals();
  }, []);

  const fetchDeals = () => {
    fetch('http://localhost:3000/api/deals/')
      .then(res => res.json())
      .then(data => setDeals(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'discountValue' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      type: form.type,
      discountValue: form.discountValue,
      product: form.dealTarget === 'product' ? form.product : undefined,
      category: form.dealTarget === 'category' ? form.category : undefined,
      brand: form.dealTarget === 'brand' ? form.brand : undefined
    };

    const res = await fetch('http://localhost:3000/api/deals/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Deal created successfully!');
      setForm({
        name: '',
        description: '',
        type: 'percentage',
        discountValue: 0,
        dealTarget: '',
        product: '',
        category: '',
        brand: ''
      });
      fetchDeals();
      setShowForm(false);
    } else {
      alert(`Error: ${data.error}`);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto mt-16 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deals Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-brandGreen cursor-pointer transition-all duration-200"
        >
          {showForm ? 'Close Form' : 'Add New Deal'}
        </button>
      </div>

    {showForm && (
  <div className="fixed inset-0 drop-shadow-xl bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4 animate-fade-in">
    <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative border border-gray-200 ring-1 ring-gray-300 transition-all duration-300">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-red-500 text-2xl font-bold transition"
        title="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Deal</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Deal Name"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
        />
        <input
          type="number"
          name="discountValue"
          value={form.discountValue}
          onChange={handleChange}
          placeholder="Discount Value"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deal Description"
          rows="3"
          className="col-span-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
        >
          <option value="percentage">Percentage</option>
          <option value="value">Fixed Value</option>
        </select>

        <select
          name="dealTarget"
          value={form.dealTarget}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
        >
          <option value="">Choose Deal Target</option>
          <option value="product">Product</option>
          <option value="category">Category</option>
          <option value="brand">Brand</option>
        </select>

        {form.dealTarget === 'product' && (
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        )}

        {form.dealTarget === 'category' && (
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c.category}>{c.category}</option>
            ))}
          </select>
        )}

        {form.dealTarget === 'brand' && (
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-0"
          >
            <option value="">Select Brand</option>
            {brands.map(b => (
              <option key={b._id} value={b.brand}>{b.brand}</option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="col-span-2 bg-black text-white p-3 rounded-lg font-medium hover:bg-brandGreen cursor-pointer transition-all"
        >
          🚀 Create Deal
        </button>
      </form>
    </div>
  </div>
)}



   <div className="relative p-6 bg-gray-50 min-h-screen">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold">All Deals</h2>
  </div>

  {/* Search input and button */}
  <div className="flex items-center mb-6 gap-3">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search deals..."
      className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-brandGreen"
    />
  </div>

  {deals.length === 0 ? (
    <p className="text-center text-gray-500 italic py-10">🚫 No deals found</p>
  ) : (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-4">
      <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 rounded-tl-lg">Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Value</th>
            <th className="px-6 py-3">Applied On</th>
            <th className="px-6 py-3 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals
            .filter(deal => 
              search === '' || deal.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(deal => (
              <tr
                key={deal._id}
                className="bg-white hover:bg-indigo-50 transition-transform duration-300 shadow-md rounded-lg hover:shadow-lg transform hover:scale-[1.02] text-center"
              >
                <td className="px-6 py-4 font-semibold rounded-l-lg">{deal.name}</td>
                <td className="px-6 py-4">{deal.description}</td>
                <td className="px-6 py-4 capitalize">{deal.type}</td>
                <td className="px-6 py-4 font-bold text-brandGreen text-lg">
                  {deal.type === "percentage" ? `${deal.discountValue}%` : `Rs. ${deal.discountValue}`}
                </td>
                <td className="px-6 py-4">
                  {deal.product?.name || deal.category || deal.brand || <span className="text-gray-400">N/A</span>}
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(deal._id)} // implement this function
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition duration-300 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(deal._id)} // implement this function
                    className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-red-700 transition duration-300 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
</div>

  );
}

export default CreateDeal;
