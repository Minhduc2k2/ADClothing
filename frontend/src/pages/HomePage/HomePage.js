import { Col, Row } from "react-bootstrap";
import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories/Categories";
import Products from "../../components/Products/Products";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="home-container">
      <Slider />
      <Categories />
      <div>
        <div className="new-arr">
          <h2>New arrivals</h2>
          <p>The best Online sales to shop these weekend</p>
        </div>
      </div>
      <Products limit={10} />
      <Row className="d-flex justify-content-between row-info">
        <Col md={3} className="d-flex justify-content-center col-info">
          <i class="fa-solid fa-truck-fast"></i>
          <div>
            <h3>Free Shipping</h3>
            <p>On all order over $39.00</p>
          </div>
        </Col>
        <Col md={3} className="d-flex justify-content-center col-info">
          <i class="fa-solid fa-wallet"></i>
          <div>
            <h3>30 Days Return</h3>
            <p>Money back Guarantee</p>
          </div>
        </Col>
        <Col md={3} className="d-flex justify-content-center col-info">
          <i class="fa-solid fa-shield-halved"></i>
          <div>
            <h3>Secure Checkout</h3>
            <p>100% Protected by paypal</p>
          </div>
        </Col>
        <Col md={3} className="d-flex justify-content-center col-info">
          <i class="fa-solid fa-clock"></i>
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
