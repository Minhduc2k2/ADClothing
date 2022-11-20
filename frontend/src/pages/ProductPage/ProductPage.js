import { Button, Col, Row } from "react-bootstrap";
import Products from "../../components/Products/Products";
import Rating from "./../../components/Rating/Rating";
import "./ProductPage.css";
function ProductPage() {
  return (
    <div className="product-container">
      <Row>
        <Col md={5}>
          <div>
            <img
              src="assets/images/product-jacket1.webp"
              alt="product"
              className="product-main-img"
            />
          </div>
          <div className="product-sub-container">
            <img
              src="assets/images/product-jacket1.webp"
              alt="product"
              className="product-sub-img"
            />
            <img
              src="assets/images/product-jacket2.webp"
              alt="product"
              className="product-sub-img"
            />
            <img
              src="assets/images/product-jacket3.webp"
              alt="product"
              className="product-sub-img"
            />
          </div>
        </Col>
        <Col md={7} className="info-container">
          <p className="name">Denim Jumpsuit</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </p>
          <p className="price">$20</p>
          <Rating rating={5} numReviews={10} />
          <div className="filter-container">
            <div className="color-filter">
              <span>Color</span>
              <ul className="color-list">
                <li
                  className="color-item"
                  style={{ backgroundColor: "#2196f3" }}
                />
                <li
                  className="color-item"
                  style={{ backgroundColor: "#c64747" }}
                />
                <li
                  className="color-item"
                  style={{ backgroundColor: "#282626" }}
                />
                <li
                  className="color-item"
                  style={{ backgroundColor: "#fff" }}
                />
                <li
                  className="color-item"
                  style={{ backgroundColor: "#e2df08" }}
                />
              </ul>
            </div>
            <div className="size-filter">
              <span>Size</span>
              <select name="size">
                <option value="xs">XS</option>
                <option value="xs">S</option>
                <option value="xs">M</option>
                <option value="xs">L</option>
                <option value="xs">XL</option>
              </select>
            </div>
          </div>
          <div className="count-container">
            <div className="count-filter">
              <div className="count-icon">
                <i class="fa-solid fa-minus"></i>
              </div>
              <span className="counter">1</span>
              <div className="count-icon">
                <i class="fa-solid fa-plus"></i>
              </div>
            </div>
            <button className="addBtn">ADD TO CART</button>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8}>
          <h4>Feature Reviews</h4>
          <div className="product-review-container">
            <div className="product-review-content">
              <img src="assets/images/avater-1.jpg" alt="avatar" />
              <div>
                <Rating rating={5} caption={" "} />
                <div className="d-flex justify-content-between">
                  <span className="product-review-name">Nguyen Van An</span>
                  <span className="product-review-date">June 23, 2019</span>
                </div>
                <p className="product-review-detail">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ipsum suscipit consequuntur in, perspiciatis laudantium ipsa
                  fugit. Iure esse saepe error dolore quod.
                </p>
              </div>
            </div>
            <div className="product-review-content">
              <img src="assets/images/avater-1.jpg" alt="avatar" />
              <div>
                <Rating rating={5} caption={" "} />
                <div className="d-flex justify-content-between">
                  <span className="product-review-name">Nguyen Van An</span>
                  <span className="product-review-date">June 23, 2019</span>
                </div>
                <p className="product-review-detail">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ipsum suscipit consequuntur in, perspiciatis laudantium ipsa
                  fugit. Iure esse saepe error dolore quod.
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <h4>Add a Review</h4>
          <textarea
            placeholder="Text your review here"
            className="product-review-textarea"
          />
          <Button variant="dark">Add</Button>
        </Col>
      </Row>
      <div className="new-arr">
        <h2>You May Like This</h2>
        <p>The best Online sales to shop these weekend</p>
      </div>
      <Products limit={4} />
    </div>
  );
}

export default ProductPage;
