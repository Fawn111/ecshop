import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  


  return (
    <div>
      <h2>Products for Category {id}</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
