import { Link } from "react-router-dom";
import "./Categories.css";

function CategoryItem({ item }) {
  return (
    <div className={"item"}>
      <Link to={`/products/${item.cat}`}>
        <img className={"img"} src={item.img} alt="category" />
        <div className={"info"}>
          <p className={"title"}>{item.title}</p>
          <button className={"buy-btn"}>Buy Now</button>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItem;
