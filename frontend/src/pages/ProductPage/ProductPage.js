import axios from "./../../hooks/axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Products from "../../components/Products/Products";
import Rating from "./../../components/Rating/Rating";
import "./ProductPage.css";
import Star from "../../components/Star/Star";
import Reviews from "../../components/Reviews/Review";
import { Store } from "./../../Store";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
function ProductPage() {
  const { state, contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(1);
  const [sizeProduct, setSizeProduct] = useState("");
  const url = useRef("/products/");
  const [indexImg, setIndexImg] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
      setSizeProduct(data.size[0]);
    };
    fetchData();
  }, [id]);

  const handleChooseImg = (i) => {
    setIndexImg(i);
  };

  const handleAddReview = async () => {
    try {
      await axios.post("/reviews", {
        user: user._id,
        product: product._id,
        review,
        rating,
      });
      setReview("");
      setRating(0);
      toast.success("Review added successfully");
    } catch (err) {
      toast.error("Review added failed");
    }
  };
  const handleAddtoCart = async () => {
    let existItem = cart.cartItems.find(
      (item) => item._id === product._id && item.sizeProduct === sizeProduct
    );
    const quantity = existItem ? existItem.quantity + amount : amount;
    contextDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        sizeProduct,
      },
    });
    toast.success("Product has been added");
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
                <select
                  name="size"
                  value={sizeProduct}
                  onChange={(e) => setSizeProduct(e.target.value)}
                  className="size-select"
                >
                  <option value="" disabled>
                    Choose Size
                  </option>
                  {product.size.map((s) => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
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
              <button className="addBtn" onClick={handleAddtoCart}>
                ADD TO CART
              </button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={8}>
            <h4>Feature Reviews</h4>
            <Reviews limit={2} id={product._id} />
            <Link to={`/reviews/${product._id}`}>
              <Button variant="dark" className="mt-3">
                See All Reviews <i class="fa-solid fa-right-long"></i>
              </Button>
            </Link>
          </Col>
          <Col md={4}>
            <h4>Add a Review</h4>
            <Star setRating={setRating} />
            <textarea
              placeholder="Text your review here"
              className="product-review-textarea"
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
            />
            <Button variant="dark" onClick={handleAddReview}>
              Add
            </Button>
          </Col>
        </Row>
        <div className="new-arr">
          <h2>You May Like This</h2>
          <p>The best Online sales to shop these weekend</p>
        </div>
        <Products limit={4} url={url.current} />
      </div>
    )
  );
}

export default ProductPage;
