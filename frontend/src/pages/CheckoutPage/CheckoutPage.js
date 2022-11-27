import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Col, Card, ListGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "./../../Store";
import axios from "./../../hooks/axios";
import { default as axiosOriginal } from "axios";
import "./CheckoutPage.css";
import { AuthContext } from "../../context/AuthContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CheckoutPage() {
  const navigate = useNavigate();
  const { state, contextDispatch } = useContext(Store);
  const {
    cart: { cartItems, deliveryAddress },
  } = state;

  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    deliveryAddress.phoneNumber || ""
  );
  const [email, setEmail] = useState(user.email || "");
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
  const info = useRef();
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
      const data = {
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
        user: user._id,
        shippingCost,
        totalCost,
        paymentMethod,
        isPaid: paymentMethod === "COD" ? false : true,
      };
      await axios.post("/checkouts", data);

      contextDispatch({
        type: "SAVE_DELIVERY_ADDRESS",
        payload: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          province: provinceText,
          distinct: distinctText,
          ward: wardText,
          address,
          note,
        }),
      });
      contextDispatch({ type: "CART_CLEAR" });
      contextDispatch({ type: "REMOVE_INDEX" });

      toast.success("Checkout Success");
      window.setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

      <Form onSubmit={handleSubmit}>
        <Row className="checkout-container">
          <Col md={8} className="checkout-details">
            <h2>Billing Address</h2>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => {
                  info.current = { fullName };
                  setFullName(e.target.value);
                }}
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
                disabled
              />
            </Form.Group>
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
          </Col>
          <Col md={4}>
            <Card className="checkout-summary">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {cartItems.map((item, index) => (
                      <Row key={index}>
                        <Col>{`${item.name} - ${
                          item.sizeProduct
                        } - ${item.colorProduct.toUpperCase()}`}</Col>
                        <Col>{`${item.quantity} x $${item.price}`}</Col>
                      </Row>
                    ))}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping (Fixed)</Col>
                      <Col>${shippingCost}</Col>
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
                        type="submit"
                        variant="dark"
                        onClick={() => handleCheckout("COD")}
                      >
                        Check out by COD
                      </Button>
                    </div>
                    <div className="d-grid mt-3">
                      {/* <Button type="button" variant="light">
                        Check out by Paypal
                      </Button> */}
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AZJXkD3NTX9_mMJ1o9JObSSM9GCYQmbY3kBXEE4-t36AC-YrNqyM_6Oy5VKrTK7Ilf-8uUaxy00z7kQb",
                        }}
                      >
                        <PayPalButtons
                          fundingSource="paypal"
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: `${totalCost}`,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            handleCheckout("Paypal");
                            return actions.order.capture().then((details) => {
                              const name = details.payer.name.given_name;
                              alert(`Transaction completed by ${name}`);
                            });
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CheckoutPage;
