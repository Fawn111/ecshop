import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";
import { useState, useEffect } from "react";

function CategoryPage() {
  
 const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3000/api/category/');
        if(!res.ok) throw new Error('Failed To Fetch Categories');
        const data = await res.json();
        setCategory(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
     console.log(category)
  
    useEffect(() => {
        fetchCategory();
      }, []);
  
  if (loading) return <p className="mt-40 text-center w-full mb-20">Loading Categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-40 mb-20 max-w-3xl mx-auto px-4 ">
    <Heading title="Categories"/>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {category.map((cat) => (
          <li key={cat._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link
              to={`/category/${cat.category}`}
              className="block p-6 text-center text-lg font-semibold text-gray-800 hover:text-indigo-600"
            >
              <img className="rounded-lg" src={cat.img} alt="" />
              <p className="mt-3"> {cat.category} </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default CategoryPage;