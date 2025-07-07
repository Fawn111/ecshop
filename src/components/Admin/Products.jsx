import React, { useEffect, useState } from "react";

const AddProductModal = ({ onClose, onProductAdded }) => {
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
    fetch("http://localhost:3000/api/category/")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    // Fetch brands
    fetch("http://localhost:3000/api/brands/")
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
      onProductAdded(data); // notify parent
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50 px-4 py-10 overflow-y-auto">
    
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-fade-in mt-46">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h3>
        <form onSubmit={handleSubmit}>
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
            type="number"
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
            type="number"
            step="0.01"
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


const EditProductModal = ({ productData, onClose, onProductUpdated }) => {
  const [product, setProduct] = useState(productData);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:3000/api/category/")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    // Fetch brands
    fetch("http://localhost:3000/api/brands/")
      .then((res) => res.json())
      .then(setBrands)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setProduct(productData); // update local state if productData changes
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      console.log("Product updated:", data);
      onProductUpdated(data);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return null;

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50 px-4 py-10 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-fade-in mt-46">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <p className="font-semibold mt-3">Product Name:</p>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name || ""}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Stock:</p>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock || 0}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Description:</p>
          <textarea
            name="desc"
            placeholder="Description"
            value={product.desc || ""}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Category:</p>
          <select
            name="category"
            value={product.category || ""}
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
            value={product.brand || ""}
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
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={product.price || ""}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">SKU Code:</p>
          <input
            type="text"
            name="sku"
            placeholder="SKU (Unique Code)"
            value={product.sku || ""}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p className="font-semibold mt-3">Image URL:</p>
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={product.img || ""}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/products/');
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

    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product,  isNewProduct: !currentIsNew } : product
      )
    );
  } catch (error) {
    alert(error.message);
  }
};

const toggleIsHot = async (id, currentIsHot) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/mark-hot/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({   isHotProduct: !currentIsHot }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update product");

    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product,  isHotProduct: !currentIsHot } : product
      )
    );
  } catch (error) {
    alert(error.message);
  }
};

  // After adding product, refresh list or append
  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // After editing product, update list
  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // Open edit modal with selected product
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  // Filter products for search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center gap-2 justify-between mb-6 px-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:scale-105"
        >
          + Add Product
        </button>

        <input
          className="border border-gray-300 px-4 py-2 rounded-lg w-60"
          placeholder="Search Product"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="min-w-full border border-gray-300">
          <thead className="border-b border-gray-300 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">New Arrival</th>
              <th className="p-3 text-left">Hot Sell</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b border-gray-300">
                <td className="p-3">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.sku}</td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={!!product.isNewProduct}
                    onChange={() => toggleIsNew(product._id, product.isNewProduct)}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={!!product.isHotProduct}
                    onChange={() => toggleIsHot(product._id, product.isHotProduct)}
                  />
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-600 text-white px-4 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition cursor-pointer hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm hover:bg-red-700 transition cursor-pointer hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {showEditModal && editProduct && (
        <EditProductModal
          productData={editProduct}
          onClose={() => setShowEditModal(false)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </>
  );
};

export default Products;
