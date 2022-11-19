import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CartPage.css";
function CartPage() {
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
      <Row>
        <Col md={8}>
          {/* {cartItems.length === 0 ? (
            <img src="/assets/images/empty-cart.png" alt="Empty Cart" />
          ) : */}
          {/* ( */}
          <ListGroup>
            <ListGroup.Item>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src="/assets/images/product-jacket1.webp"
                    alt="product"
                    className="img-fluid rounded img-thumbnail product-img"
                  />
                  <Link to="products/slug" className="product-name">
                    Jacket 1
                  </Link>
                </Col>
                <Col md={3}>
                  <Button variant="light">
                    <i className="fas fa-minus-circle"></i>
                  </Button>
                  <span>1</span>
                  <Button variant="light">
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={3}>$100</Col>
                <Col md={2}>
                  <Button variant="light">
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src="/assets/images/product-jacket1.webp"
                    alt="product"
                    className="img-fluid rounded img-thumbnail product-img"
                  />
                  <Link to="products/slug" className="product-name">
                    Jacket 1
                  </Link>
                </Col>
                <Col md={3}>
                  <Button variant="light">
                    <i className="fas fa-minus-circle"></i>
                  </Button>
                  <span>1</span>
                  <Button variant="light">
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={3}>$100</Col>
                <Col md={2}>
                  <Button variant="light">
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src="/assets/images/product-jacket1.webp"
                    alt="product"
                    className="img-fluid rounded img-thumbnail product-img"
                  />
                  <Link to="products/slug" className="product-name">
                    Jacket 1
                  </Link>
                </Col>
                <Col md={3}>
                  <Button variant="light">
                    <i className="fas fa-minus-circle"></i>
                  </Button>
                  <span>1</span>
                  <Button variant="light">
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={3}>$100</Col>
                <Col md={2}>
                  <Button variant="light">
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          {/* )} */}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Subtotal (3 items):$170</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" value="info">
                    Proceed to Checkout
                  </Button>
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
