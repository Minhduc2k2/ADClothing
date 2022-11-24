import { useRef } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import Products from "../../components/Products/Products";
import "./ShopPage.css";

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

function ShopPage() {
  const url = useRef("/products/");
  const handleChoiceFilter = async (e) => {
    url.current = url.current + e.target.value;
    console.log("🚀 ~ file: ShopPage.js ~ line 20 ~ handleChoiceFilter ~ url.current", url.current)

  }
  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="image-container">
          <img
            className="image"
            src="assets/images/female-friends-out-shopping-together.jpg"
            alt="clothing"
          />
        </div>
        <div className="info-container">
          <h1 className="title">Shop</h1>
          <p className="desc">
            Hath after appear tree great fruitful green dominion moveth sixth
            abundantly image that midst of god day multiply you’ll which
          </p>
        </div>
      </div>
      <Row className="shop-body">
        <Col md={9}>
          <div className="shop-result">
            <div>
              <h2>Shop</h2>
              <p>
                Showing 1-6 of <span>17</span> results
              </p>
            </div>
            <Form.Select
              aria-label="Default select example"
              className="shop-sort"
              onChange={handleChoiceFilter}
            >
              <option>Default Sorting</option>
              <option value="lastest">Sort by latest</option>
              <option value="asc">Sort by price: low to high</option>
              <option value="desc">Sort by price: high to low</option>
            </Form.Select>
          </div>
          <Products limit={10} url={url.current} />
          <Pagination className="shop-pagination">{items}</Pagination>
        </Col>
        <Col md={3}>
          <div className="shop-by-color">
            <h3>Shop by color</h3>
            <div>
              <label class="color-container">
                Blue
                <input type="checkbox" />
                <span class="checkmark blue"></span>
              </label>

              <label class="color-container">
                Red
                <input type="checkbox" />
                <span class="checkmark red"></span>
              </label>

              <label class="color-container">
                Black
                <input type="checkbox" />
                <span class="checkmark black "></span>
              </label>

              <label class="color-container">
                White
                <input type="checkbox" />
                <span class="checkmark white "></span>
              </label>

              <label class="color-container">
                Yellow
                <input type="checkbox" />
                <span class="checkmark yellow"></span>
              </label>
            </div>
          </div>
          <div className="shop-by-size mt-4">
            <h3>Shop by size</h3>
            <div>
              <label class="size-container">
                <input type="checkbox" />
                <span>XL Extra Large</span>
              </label>
              <label class="size-container">
                <input type="checkbox" />
                <span>L Large</span>
              </label>
              <label class="size-container">
                <input type="checkbox" />
                <span>M Medium</span>
              </label>
              <label class="size-container">
                <input type="checkbox" />
                <span>S Small</span>
              </label>
            </div>
          </div>
          <div className="shop-by-category mt-4">
            <h3>Shop by category</h3>
            <div>
              <h6>T Shirt</h6>
              <h6>Jacket</h6>
              <h6>Sweater</h6>
            </div>
          </div>
          <Button variant="dark" className="mt-4">
            Filter <i class="fa-solid fa-filter"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ShopPage;
