import { useState } from "react";
import { Row, Form, Col, Card, ListGroup, Button } from "react-bootstrap";
import "./CheckoutPage.css";

function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [distinct, setDistinct] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  return (
    <div className="checkout-container">
      <div className="shop-header">
        <div className="image-container">
          <img
            className="image"
            src="assets/images/person-writing-laptop-with-credit-card.jpg"
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
      <h1>Checkout</h1>

      <Row>
        <Col md={8} className="checkout-details">
          <h2>Billing Address</h2>
          <Form>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="distinct">
              <Form.Label>Distinct</Form.Label>
              <Form.Control
                value={distinct}
                onChange={(e) => setDistinct(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ward">
              <Form.Label>Ward</Form.Label>
              <Form.Control
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="note">
              <Form.Label>Note</Form.Label>
              <br />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note for the your order, ex: time or guide for shipper"
                className="checkout-note"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={4}>
          <Card className="checkout-summary">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Jacket</Col>
                    <Col>3x${100}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$20</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>$330</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button type="button" variant="dark">
                      Check out by COD
                    </Button>
                  </div>
                  <div className="d-grid mt-3">
                    <Button type="button" variant="light">
                      Check out by Paypal
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CheckoutPage;
