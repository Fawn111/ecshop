import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";
import { useState, useEffect } from "react";

function CategoryPage() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/category/");
      if (!res.ok) throw new Error("Failed To Fetch Categories");
      const data = await res.json();
      setCategory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  if (loading) return <p className="mt-40 text-center w-full mb-20">Loading Categories...</p>;
  if (error) return <p className="text-red-500 text-center mt-40">{error}</p>;

  return (
    <div className="mt-40 mb-20 max-w-7xl mx-auto px-6">
      <Heading title="Explore Our Categories" />

      <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {category.map((cat) => (
          <li key={cat._id}>
            <Link
              to={`/category/${cat.category}`}
              className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition duration-300 ease-in-out bg-white"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-800 group-hover:text-brandGreen tracking-wide capitalize">
                  {cat.category}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
