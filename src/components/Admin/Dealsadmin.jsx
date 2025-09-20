import React, { useEffect, useState } from 'react';
import Toaster from '../Shared/Toaster';
import ProductMultiSelect from '../Shared/Multiselect';

function CreateDeal() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    discountType: 'percentage',
    discountValue: 0,
    products: [], 
    category: '', 
    brand: '',   
    img: ''
  });

  // Fetch deals
  const fetchDeals = () => {
    fetch('http://localhost:3000/api/deals/')
      .then(res => res.json())
      .then(data => setDeals(data));
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/category/')
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch('http://localhost:3000/api/brands/')
      .then(res => res.json())
      .then(data => setBrands(data));

    fetch('http://localhost:3000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetchDeals();
  }, []);


const showToast = (message, type) => {
  setToast({ message, type });
  setTimeout(() => setToast({ message: '', type: '' }), 3000);
}

const handleChange = (e) => {
  const { name, value, selectedOptions } = e.target;

  if (name === 'products') {
    const selectedIds = Array.from(selectedOptions).map(opt => opt.value);
    setForm(prev => ({ ...prev, products: selectedIds }));
  } else {
    setForm(prev => ({
      ...prev,
      [name]: name === 'discountValue' ? Number(value) : value
    }));
  }
};


  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/deals/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(`Error deleting deal: ${data.error}`);
        return;
      }
      showToast('Deal deleted successfully!', 'error');
      fetchDeals();
    } catch (err) {
      console.error(err);
      alert('Something went wrong while deleting the deal.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      type: form.type,
      discountType: form.discountType,
      discountValue: form.discountValue,
      img: form.img,
      products: form.type === 'product' ? form.products : [],
      category: form.type === 'category' ? form.category : undefined,
      brand: form.type === 'brand' ? form.brand : undefined
    };

    try {
      const res = await fetch('http://localhost:3000/api/deals/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      showToast('Deal created successfully!', 'success');
      setForm({
        name: '',
        description: '',
        type: '',
        discountType: 'percentage',
        discountValue: 0,
        products: [],
        category: '',
        brand: '',
        img: ''
      });
      fetchDeals();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create deal.');
    }
  };

  return (
    <div className="max-w-9xl mx-auto mt-16 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deals Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-brandGreen transition"
        >
          {showForm ? 'Close Form' : 'Add New Deal'}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Create a New Deal</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <p className='mb-1'>Name:</p>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Deal Name" className="p-3 border w-full rounded-lg"/>
              </div>

              <div>
                <p className='mb-1'>Target Deal:</p>
                <select name="type" value={form.type} onChange={handleChange} className="p-3 border w-full rounded-lg">
                  <option value="">Choose Deal Target</option>
                  <option value="product">Product</option>
                  <option value="category">Category</option>
                  <option value="brand">Brand</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 w-full">
                  <span>Value:</span>
                  <input type="number" name="discountValue" value={form.discountValue} onChange={handleChange} placeholder="Discount" className="p-2 border rounded-lg w-full"/>
                  <span>{form.discountType === "percentage" ? "%" : "Rs"}</span>
                </label>
              </div>

              <div>
                <select name="discountType" value={form.discountType} onChange={handleChange} className="p-2 border rounded-lg w-full">
                  <option value="percentage">Percentage</option>
                  <option value="value">Value</option>
                </select>
              </div>

              <div className='col-span-2'>
                <p className='mb-1'>Deal Image:</p>
                <input type="text" name="img" value={form.img} onChange={handleChange} placeholder="Image URL..." className="p-3 border w-full rounded-lg"/>
              </div>

              <div className="col-span-2">
                <p className='mb-1'>Description:</p>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deal Description" rows="3" className="w-full p-3 border rounded-lg"/>
              </div>

           {form.type === "product" && (
  <div className="col-span-2">
    <ProductMultiSelect
      products={products}
      selected={form.products}
      setSelected={(selected) =>
        setForm(prev => ({ ...prev, products: selected }))
      }
    />
  </div>
)}
              {form.type === 'category' && (
                <select name="category" value={form.category} onChange={handleChange} className="col-span-2 p-3 border rounded-lg">
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.category}</option>
                  ))}
                </select>
              )}

              {form.type === 'brand' && (
                <select name="brand" value={form.brand} onChange={handleChange} className="col-span-2 p-3 border rounded-lg">
                  <option value="">Select Brand</option>
                  {brands.map(b => (
                    <option key={b._id} value={b._id}>{b.brand}</option>
                  ))}
                </select>
              )}

              <button type="submit" className="col-span-2 bg-black text-white hover:scale-105 p-3 rounded-lg hover:bg-brandGreen/80 cursor-pointer transition">
                Create Deal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Deals Table */}
      <div className="relative p-6 bg-gray-50">
        <div className="flex items-center mb-6 gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals..."
            className="p-3 border rounded-lg w-full md:w-1/3"
          />
        </div>

        {deals.length === 0 ? (
          <p className="text-center text-gray-500 italic py-10">No deals found</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-4">
            <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 rounded-tl-lg">Name</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Target</th>
            <th className="px-6 py-3">Discount Type</th>
            <th className="px-6 py-3">Discount Value</th>
            <th className="px-6 py-3">Product(s)</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3 rounded-tr-lg">Actions</th>
          </tr>
</thead>

              <tbody>
                {deals
                  .filter(deal => search === '' || deal.name.toLowerCase().includes(search.toLowerCase()))
                  .map(deal => (
                    <tr key={deal._id} className="bg-white hover:bg-indigo-50 transition duration-300 rounded-lg text-center">
                      <td className="px-6 py-4 font-semibold rounded-l-lg">{deal.name}</td>
                      <td className="px-6 py-4"><img src={deal.img || '/placeholder.jpg'} className="w-24 h-24 mx-auto" /></td>
                      <td className="px-6 py-4">{deal.description}</td>
                      <td className="px-6 py-4 capitalize">{deal.type}</td>
                      <td className="px-6 py-4 capitalize">{deal.discountType}</td>
                      <td className="px-6 py-4 font-bold text-brandGreen">
                        {deal.discountType === "percentage" 
                          ? `${deal.discountValue}%` 
                          : `Rs. ${deal.discountValue}`}
                      </td>
                      <td className="px-6 py-4">
                        {deal.products?.length > 0 
                          ? deal.products.map(p => p.name).join(', ') 
                          : '—'}
                      </td>
                      <td className="px-6 py-4">{deal.category?.category || '—'}</td>
                      <td className="px-6 py-4">{deal.brand?.brand || '—'}</td>

                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button type="button" onClick={() => alert("Edit not implemented yet")} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                          Edit
                        </button>
                        <button type="button" onClick={(e) => handleDelete(deal._id, e)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
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
      {toast.message && <Toaster message={toast.message} type={toast.type} />}
    </div>
  );
}

export default CreateDeal;


