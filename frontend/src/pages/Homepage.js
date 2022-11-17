import { Col, Row } from "react-bootstrap";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

function HomePage() {
  return (
    <div>
      <Slider />
      <Categories />
      <div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "32px" }}>New arrivals</h2>
          <p style={{ fontSize: "20px" }}>
            The best Online sales to shop these weekend
          </p>
        </div>
      </div>
      <Products />
      <Row
        className="d-flex justify-content-between"
        style={{ padding: "30px", borderTop: "1px solid #ccc" }}
      >
        <Col md={3} className="d-flex justify-content-center ">
          <i
            class="fa-solid fa-truck-fast"
            style={{
              fontSize: "24px",
              lineHeight: "1.5",
              marginRight: "20px",
              color: "#fc8d7b",
            }}
          ></i>
          <div>
            <h3>Free Shipping</h3>
            <p>On all order over $39.00</p>
          </div>
        </Col>
        <Col md={3} className="d-flex justify-content-center ">
          <i
            class="fa-solid fa-wallet"
            style={{
              fontSize: "24px",
              lineHeight: "1.5",
              marginRight: "20px",
              color: "#fc8d7b",
            }}
          ></i>
          <div>
            <h3>30 Days Return</h3>
            <p>Money back Guarantee</p>
          </div>
        </Col>
        <Col md={3} className="d-flex justify-content-center ">
          <i
            class="fa-solid fa-shield-halved"
            style={{
              fontSize: "24px",
              lineHeight: "1.5",
              marginRight: "20px",
              color: "#fc8d7b",
            }}
          ></i>
          <div>
            <h3>Secure Checkout</h3>
            <p>100% Protected by paypal</p>
          </div>
        </Col>
        <Col md={3} className="d-flex justify-content-center ">
          <i
            class="fa-solid fa-clock"
            style={{
              fontSize: "24px",
              lineHeight: "1.5",
              marginRight: "20px",
              color: "#fc8d7b",
            }}
          ></i>
          <div>
            <h3>24/7 Support</h3>
            <p>All time customer support</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
