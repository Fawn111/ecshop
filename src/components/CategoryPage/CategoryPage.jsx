import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";

const categories = [
  { name: "Health", id: "67e1800a2361aa943425edaa" },
  { name: "Wellness", id: "abc123" },
];

export default function CategoryPage() {
  return (
    <div className="mt-40 mb-26 max-w-3xl mx-auto px-4">
    <Heading title="Categories"/>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <li key={cat.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link
              to={`/categories/${cat.id}`}
              className="block p-6 text-center text-lg font-semibold text-gray-800 hover:text-indigo-600"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
