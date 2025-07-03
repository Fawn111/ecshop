import React, { useEffect, useState } from "react";

const AddProductModal = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    stock: 0,
    desc: "",
    category: "",
    brand: "",
    price: "",
    sku: "",
    img: ""
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:3000/category/all")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    // Fetch brands
    fetch("http://localhost:3000/brands/all")
      .then((res) => res.json())
      .then(setBrands)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      console.log("Product added:", data);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50 px-4 py-10 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-fade-in mt-46">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h3>
        <form className="" onSubmit={handleSubmit}>
          <p className="font-semibold mt-3">Product Name:</p>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
           <p className="font-semibold mt-3">Stock:</p>
          <input
            type="text"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Description:</p>
          <textarea
            name="desc"
            placeholder="Description"
            value={product.desc}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Category:</p>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
          <p className="font-semibold mt-3">Brand:</p>
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b.brand}>
                {b.brand}
              </option>
            ))}
          </select>
           <p className="font-semibold mt-3">Price:</p>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">SKU Code:</p>
          <input
            type="text"
            name="sku"
            placeholder="SKU (Unique Code)"
            value={product.sku}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Image URL:</p>
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={product.img}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/products/all');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete product');
    
    setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    
  } catch (error) {
    alert(`Error deleting product: ${error.message}`);
  }
};

const toggleIsNew = async (id, currentIsNew) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/mark-new/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  isNewProduct: !currentIsNew }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update product");

    // Update local state after toggle:
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product,  isNewProduct: !currentIsNew } : product
      )
    );
  } catch (error) {
    alert(error.message);
  }
};

const toggleIsHot = async (id, currentIsNew) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/mark-hot/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({   isHotSelling: !currentIsNew }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update product");

    // Update local state after toggle:
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product,   isHotSelling: !currentIsNew } : product
      )
    );
  } catch (error) {
    alert(error.message);
  }
};

  

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

 

  return (
     <div className="relative p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-brandGreen cursor-pointer transition-all duration-200">
  <span className="text-lg">+</span>
  <span className="font-semibold">Add Product</span>
</button>
      </div>

      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-brandGreen" />
         <button
            onClick={fetchProducts}
            className="px-4 py-2 ml-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Refresh
          </button>

  {products.length === 0 ? (
  <p>No Products Found</p>
) : (
  <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-4">
    <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
        <tr>
          <th className="px-6 py-3 rounded-tl-lg">Image</th>
          <th className="px-6 py-3 rounded-tl-lg">Product Name</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Stock</th>
          <th className="px-6 py-3">Category</th>
          <th className="px-6 py-3">Brand</th>
          <th className="px-6 py-3 rounded-tl-lg">SKU</th>
          <th className="px-6 py-3 rounded-tr-lg">Actions</th>
          <th className="px-6 py-3 rounded-tr-lg">New Arrival</th>
          <th className="px-6 py-3 rounded-tr-lg">Hot Sellings</th>
        </tr>
      </thead>
      <tbody>
        {products
          .filter((item) => {
            return search.toLowerCase() === ''
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((p) => (
            <tr  key={p._id}  className="bg-white hover:bg-indigo-50 transition-transform duration-300 shadow-md rounded-lg hover:shadow-lg transform hover:scale-[1.02] text-center">
              <td className="px-6 py-4"><img src={p.img} alt={p.name} className="w-[150px] h-[80px] object-cover rounded-md mx-auto" /></td>
              <td className="px-6 py-4 font-semibold rounded-l-lg">{p.name}</td>
              <td className="px-6 py-4 text-brandGreen font-bold text-xl">{p.price}</td>
              <td className="px-6 py-4">{p.stock}</td>
              <td className="px-6 py-4">{p.category}</td>
              <td className="px-6 py-4">{p.brand}</td>
              <td className="px-6 py-4 font-semibold rounded-l-lg">{p.sku}</td>
              <td className="px-6 py-4 flex gap-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition duration-300 font-semibold">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-red-700 transition duration-300 font-semibold"
                >
                  Delete
                </button>
              </td>
              <td>
                 <button
    onClick={() => toggleIsNew(p._id, p. isNewProduct)} className={`px-3 py-1 rounded-lg font-semibold transition ${p. isNewProduct ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}>
                {p. isNewProduct ? "Yes" : "No"}
            </button>
              </td>
               <td>
                 <button
    onClick={() => toggleIsHot(p._id, p.  isHotSelling)} className={`px-3 py-1 rounded-lg font-semibold transition ${p.  isHotSelling ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}>
                {p.  isHotSelling ? "Yes" : "No"}
            </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}

      


      {showModal && <AddProductModal onClose={() => setShowModal(false)}/>}
    </div>
  );
};

export default Products;
