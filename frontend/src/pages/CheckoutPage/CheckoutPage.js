import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Col, Card, ListGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "./../../Store";
import axios from "./../../hooks/axios";
import { default as axiosOriginal } from "axios";
import "./CheckoutPage.css";
function CheckoutPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [provinceArray, setProvinceArray] = useState([]);
  const [distinctArray, setDistinctArray] = useState([]);
  const [wardArray, setWardArray] = useState([]);
  const [province, setProvince] = useState("");
  const [distinct, setDistinct] = useState("");
  const [ward, setWard] = useState("");
  const [provinceText, setProvinceText] = useState("");
  const [distinctText, setDistinctText] = useState("");
  const [wardText, setWardText] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const shippingCost = 2;
  const totalCost = useMemo(
    () =>
      cartItems.reduce(
        (accumulate, currentValue) =>
          accumulate + currentValue.price * currentValue.quantity,
        0
      ) + shippingCost,
    [cartItems]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosOriginal.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setProvince(data[0].code);
        setProvinceText(data[0].name);
        setProvinceArray(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosOriginal.get(
          `https://provinces.open-api.vn/api/p/${province}/?depth=2`
        );
        setDistinct(data.districts[0].code);
        setDistinctText(data.districts[0].name);
        setDistinctArray(data.districts);
      } catch (err) {
        console.log(err);
      }
    };
    if (province) {
      fetchData();
      setWardArray([]);
    }
  }, [province]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosOriginal.get(
          `https://provinces.open-api.vn/api/d/${distinct}/?depth=2`
        );
        setWard(data.wards[0].code);
        setWardText(data.wards[0].name);
        setWardArray(data.wards);
      } catch (err) {
        console.log(err);
      }
    };
    if (distinct) {
      fetchData();
    }
  }, [distinct]);
  const handleCheckout = async (paymentMethod) => {
    try {
      await axios.post("/checkouts", {
        productItems: cartItems,
        deliveryAddress: {
          fullName,
          phoneNumber,
          email,
          province: provinceText,
          distinct: distinctText,
          ward: wardText,
          address,
          note,
        },
        // user: "123",
        shippingCost,
        totalCost,
        paymentMethod,
        isPaid: false,
      });
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify({
          fullName,
          phoneNumber,
          email,
          province: provinceText,
          distinct: distinctText,
          ward: wardText,
          address,
          note,
        })
      );
      toast.success("Checkout Success");
      window.setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  console.log(provinceText + " " + distinctText + " " + wardText);
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
          <h1 className="title">Checkout</h1>
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="province">
              <Form.Label>Province</Form.Label>
              <Form.Control
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="distinct">
              <Form.Label>Distinct</Form.Label>
              <Form.Control
                value={distinct}
                onChange={(e) => setDistinct(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ward">
              <Form.Label>Ward</Form.Label>
              <Form.Control
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                required
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="province">
              <Form.Label>Province</Form.Label>
              <Form.Select
                value={province}
                onChange={(e) => {
                  const index = e.nativeEvent.target.selectedIndex;
                  setProvinceText(e.nativeEvent.target[index].text);
                  setProvince(e.target.value);
                }}
                required
              >
                <option value="" key="default" disabled>
                  Choose one Province
                </option>
                {provinceArray.map((element) => (
                  <option value={element.code} key={element.code}>
                    {element.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="distinct">
              <Form.Label>Distinct</Form.Label>
              <Form.Select
                value={distinct}
                onChange={(e) => {
                  const index = e.nativeEvent.target.selectedIndex;
                  setDistinctText(e.nativeEvent.target[index].text);
                  setDistinct(e.target.value);
                }}
                required
              >
                <option value="" key="default" disabled>
                  Choose one Distinct
                </option>
                {distinctArray.map((element) => (
                  <option value={element.code} key={element.code}>
                    {element.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ward">
              <Form.Label>Ward</Form.Label>
              <Form.Select
                value={ward}
                onChange={(e) => {
                  const index = e.nativeEvent.target.selectedIndex;
                  setWardText(e.nativeEvent.target[index].text);
                  setWard(e.target.value);
                }}
                required
              >
                <option value="" key="default" disabled>
                  Choose one Ward
                </option>
                {wardArray.map((element) => (
                  <option value={element.code} key={element.code}>
                    {element.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
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
                  {cartItems.map((item, index) => (
                    <Row key={index}>
                      <Col>{`${item.name} - ${item.sizeProduct}`}</Col>
                      <Col>{`${item.quantity} x $${item.price}`}</Col>
                    </Row>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping (Fixed)</Col>
                    <Col>$2</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${totalCost}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => handleCheckout("COD")}
                    >
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
