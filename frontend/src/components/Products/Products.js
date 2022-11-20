import axios from "../../hooks/axios.js";
import "./Products.css";

import { popularProducts } from "../../data";
import Product from "./Product";
import { useEffect, useState } from "react";

function Products({ cat, filters, sort, limit, url }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(url);
        setProducts(res.data);
        console.log("Products: " + products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="product-container">
      {products &&
        products
          .slice(0, limit)
          .map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
    </div>
  );
}

export default Products;
