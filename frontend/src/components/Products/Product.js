import "./Products.css";

function Product({ product }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="product">
        <div className="circle" />
        <img className="img" src={product.img} alt="product" />
        <div className="info">
          <div className="icon">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div className="detail">
        <h5>Floral Kirby</h5>
        <p>$329.10</p>
      </div>
    </div>
  );
}

export default Product;
