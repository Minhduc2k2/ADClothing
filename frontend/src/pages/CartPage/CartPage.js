import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import axios from "./../../hooks/axios";
import "./CartPage.css";

function CartPage() {
  const { state, contextDispatch } = useContext(Store);
  // const {
  //   cart: { cartItems },
  // } = state;
  const [cartItems, setCartItems] = useState(state.cart.cartItems);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    cartItems.forEach(async (element) => {
      const { data } = await axios.get(`/products/${element._id}`);

      setProducts((preProducts) => [
        ...preProducts,
        {
          ...data,
          quantity: element.quantity,
          sizeProduct: element.sizeProduct,
        },
      ]);
    });
  }, [cartItems]);

  const handleDeleteProduct = (product) => {
    try {
      contextDispatch({ type: "CART_REMOVE_ITEM", payload: product });
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      toast.success("Delete product successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="cart-container">
      <div className="shop-header">
        <div className="image-container">
          <img
            className="image"
            src="assets/images/cart-home.jpg"
            alt="clothing"
          />
        </div>
        <div className="info-container">
          <h1 className="title">Cart</h1>
          <p className="desc">
            Hath after appear tree great fruitful green dominion moveth sixth
            abundantly image that midst of god day multiply you’ll which
          </p>
        </div>
      </div>
      <h1>Cart</h1>
      <Row className="cart-content">
        <Col md={8} style={{ textAlign: cartItems.length === 0 && "center" }}>
          {cartItems.length === 0 ? (
            <img src="/assets/images/cart-empty.jpg" alt="Empty Cart" />
          ) : (
            <ListGroup>
              <ListGroup.Item>
                <Row className="align-items-center">
                  <Col md={4}>
                    <strong>Product</strong>
                  </Col>
                  <Col md={3}>
                    <strong>Quantity</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Price</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Size</strong>
                  </Col>
                  <Col md={1}>
                    <strong>Delete</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* KHÔNG BIẾT TẠI SAO LẠI BỊ RENDER PRODUCTS 2 LẦN. TẠM THỜI CHỈ LẤY GIÁ TRỊ CỦA NỬA MẢNG */}
              {products.slice(0, products.length / 2).map((product, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={product.imgPath[0]}
                        alt="product"
                        className="img-fluid rounded img-thumbnail product-img"
                      />
                      <Link
                        to={`/product/${product._id}`}
                        className="product-name"
                      >
                        {product.name.substring(0, 20) + "..."}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <span style={{ marginLeft: "28px" }}>
                        {product.quantity}
                      </span>
                    </Col>
                    <Col md={2}>${product.price}</Col>
                    <Col md={2}>
                      <span style={{ marginLeft: "8px" }}>
                        {product.sizeProduct}
                      </span>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="light"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce(
                      (accumulate, currentValue) =>
                        accumulate + currentValue.quantity,
                      0
                    )}{" "}
                    items):$
                    {cartItems.reduce(
                      (accumulate, currentValue) =>
                        accumulate + currentValue.price * currentValue.quantity,
                      0
                    )}
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/checkout">
                    <Button type="button" variant="dark">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;
