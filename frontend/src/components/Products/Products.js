import axios from "axios";
import "./Products.css";

import { popularProducts } from "../../data";
import Product from "./Product";
import { useEffect, useState } from "react";

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = axios.get("http://localhost:3001/api/v1/products/");
        setProducts(res.data);
        console.log("Products: " + products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  });

  return (
    <div className="product-container">
      {popularProducts &&
        popularProducts
          .slice(0, 10)
          .map((product) => (
            <Product product={product} key={product.id}></Product>
          ))}
    </div>
  );
}

export default Products;
