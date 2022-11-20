import axios from "./../../hooks/axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Products from "../../components/Products/Products";
import Rating from "./../../components/Rating/Rating";
import "./ProductPage.css";
import Star from "../../components/Star/Star";
function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(1);
  const [url, setUrl] = useState("/products/");
  const [indexImg, setIndexImg] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    };
    fetchData();
  }, [id, product]);

  const handleChooseImg = (i) => {
    setIndexImg(i);
  };
  return (
    product && (
      <div className="product-container">
        <Row>
          <Col md={5}>
            <div className="product-main-img-container">
              <div
                className={"arrow-left"}
                onClick={() =>
                  handleChooseImg(indexImg === 0 ? 0 : indexImg - 1)
                }
              >
                <i class="fa-solid fa-angle-left"></i>
              </div>
              <img
                src={product.imgPath[indexImg]}
                alt="product"
                className="product-main-img"
              />
              <div
                className={"arrow-right"}
                onClick={() =>
                  handleChooseImg(indexImg === 2 ? 2 : indexImg + 1)
                }
              >
                <i class="fa-solid fa-angle-right"></i>
              </div>
            </div>
            <div className="product-sub-container">
              <img
                src={product.imgPath[0]}
                alt="product"
                className="product-sub-img"
                onClick={() => handleChooseImg(0)}
              />
              <img
                src={product.imgPath[1]}
                alt="product"
                className="product-sub-img"
                onClick={() => handleChooseImg(1)}
              />
              <img
                src={product.imgPath[2]}
                alt="product"
                className="product-sub-img"
                onClick={() => handleChooseImg(2)}
              />
            </div>
          </Col>
          <Col md={7} className="info-container">
            <p className="name">{product.name}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
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
                  <i
                    class="fa-solid fa-minus"
                    onClick={() =>
                      amount === 1 ? setAmount(1) : setAmount(amount - 1)
                    }
                  ></i>
                </div>
                <span className="counter">{amount}</span>
                <div
                  className="count-icon"
                  onClick={() => setAmount(amount + 1)}
                >
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
            <Link to={`/reviews/${product._id}`}>
              <Button variant="dark">
                See All Reviews <i class="fa-solid fa-right-long"></i>
              </Button>
            </Link>
          </Col>
          <Col md={4}>
            <h4>Add a Review</h4>
            <Star />
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
        <Products limit={4} url={url} />
      </div>
    )
  );
}

export default ProductPage;
