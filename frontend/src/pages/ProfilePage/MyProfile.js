import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Col, Card, ListGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "./../../Store";
import axios from "./../../hooks/axios";
import { default as axiosOriginal } from "axios";
import "./MyProfile.css";
import { AuthContext } from "../../context/AuthContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CheckoutPage() {

    const provinceCode = useRef();
    const distinctCode = useRef();
    const wardCode = useRef();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const getAddress = () => {
        const arr = user.address.split("%");
        return {
            address: arr[0],
            ward: arr[1],
            distinct: arr[2],
            province: arr[3]
        }
    }
    const addressInfo = getAddress();


    //initData();
    const [fullName, setFullName] = useState(user.name || "");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email || "");
    const provinceArray = useRef([]);
    const distinctArray = useRef([]);
    const wardArray = useRef([]);
    const [provinceText, setProvinceText] = useState();
    const [distinctText, setDistinctText] = useState(addressInfo.distinct);
    const [wardText, setWardText] = useState(addressInfo.ward);
    const [address, setAddress] = useState(addressInfo.address);




    // chạy đầu tiên sau render
    useEffect(() => {
        const fetchData = async () => {
            try {
                // chạy câu dưới nhưng không thục thi và chạy những sync khác
                const proData = await axiosOriginal.get(`https://provinces.open-api.vn/api/p/search/?q=${addressInfo.province}`)
                // sau khi thực thi tất cả các sync, sẽ thực thi câu lệnh trên, sau đó chạy và thực thi các hàm dưới
                provinceCode.current = (proData.data)[0].code;



                const distData = await axiosOriginal.get(`https://provinces.open-api.vn/api/d/search/?q=${addressInfo.distinct}&p=${provinceCode.current}`)
                distinctCode.current = (distData.data)[0].code;


                const wardData = await axiosOriginal.get(`https://provinces.open-api.vn/api/w/search/?q=${addressInfo.ward}&d=${distinctCode.current}&p=${provinceCode.current}`)
                wardCode.current = (wardData.data)[0].code;


                const proList = await axiosOriginal.get(
                    "https://provinces.open-api.vn/api/?depth=1"
                );
                provinceArray.current = proList.data;

                const distList = await axiosOriginal.get(
                    `https://provinces.open-api.vn/api/p/${provinceCode.current}/?depth=2`
                );
                distinctArray.current = distList.data.districts;


                const wardList = await axiosOriginal.get(
                    `https://provinces.open-api.vn/api/d/${distinctCode.current}/?depth=2`
                );
                wardArray.current = wardList.data.wards;

                // gặp setState (nhưng chưa re-render, phải đợi các await (nếu có), async r mới re-render)
                setProvinceText(addressInfo.province);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // chạy câu lệnh dưới nhưng không thực thi và 
                const { data } = await axiosOriginal.get(
                    `https://provinces.open-api.vn/api/p/${provinceCode.current}/?depth=2`
                );
                distinctArray.current = data.districts;

                // Nếu lần đầu truy cập thì next, không thì vào
                if (distinctCode.current === 0) {
                    wardCode.current = 0;
                    distinctCode.current = data.districts[0].code;
                    setDistinctText(data.districts[0].name);
                }

            } catch (err) {
                console.log(err);
            }
        };

        // provinceCode.current lần đầu = undefined nên không chạy fetchData()
        if (provinceCode.current) {
            fetchData();
        }
    }, [provinceText]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosOriginal.get(
                    `https://provinces.open-api.vn/api/d/${distinctCode.current}/?depth=2`
                );
                wardArray.current = data.wards;
                if (wardCode.current === 0) {
                    wardCode.current = data.wards[0].code;
                    setWardText(data.wards[0].name);
                }

            } catch (err) {
                console.log(err);
            }
        };
        if (distinctCode.current) {
            fetchData();
        }
    }, [distinctText]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            ...user,
            name: fullName,
            phoneNumber,
            email,
            address: address + "%" + wardText + "%" + distinctText + "%" + provinceText
        }
        const result = await axios.put(`/users/${user._id}`, userInfo);
        toast.info("OK");
    };
    return (
        <div className="checkout-container">
            <Form onSubmit={handleSubmit}>
                <img src={user.imgPath} alt="Avatar" className="avatar" />
                <Row className="checkout-container">
                    <Col md={8} className="checkout-details">
                        <h2>Billing Address</h2>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value)
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
                                value={provinceCode.current}
                                onChange={(e) => {
                                    const index = e.nativeEvent.target.selectedIndex;
                                    provinceCode.current = e.target.value;
                                    distinctCode.current = 0;
                                    setProvinceText(e.nativeEvent.target[index].text);
                                    //setProvince(e.target.value);
                                }}
                                required
                            >
                                <option value="" key="default" disabled>
                                    Choose one Province
                                </option>
                                {provinceArray.current.map((element) => {
                                    if (element.code === Number(provinceCode.current)) {
                                        // provinceCode.current = element.code;
                                        return (<option value={element.code} key={element.code} selected>
                                            {element.name}
                                        </option>)
                                    }
                                    else {
                                        return (<option value={element.code} key={element.code} >
                                            {element.name}
                                        </option>)
                                    }
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="distinct">
                            <Form.Label>Distinct</Form.Label>
                            <Form.Select
                                value={distinctCode.current}
                                onChange={(e) => {
                                    const index = e.nativeEvent.target.selectedIndex;
                                    distinctCode.current = e.target.value;
                                    wardCode.current = 0;
                                    setDistinctText(e.nativeEvent.target[index].text);
                                }}
                                required
                            >
                                <option value="" key="default" disabled>
                                    Choose one Distinct
                                </option>
                                {distinctArray.current.map((element) => {
                                    if (element.code === Number(distinctCode.current)) {
                                        //distinctCode.current = element.code;
                                        return (<option value={element.code} key={element.code} selected>
                                            {element.name}
                                        </option>)
                                    }
                                    else {
                                        return (<option value={element.code} key={element.code} >
                                            {element.name}
                                        </option>)
                                    }
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ward">
                            <Form.Label>Ward</Form.Label>
                            <Form.Select
                                value={wardCode.current}
                                onChange={(e) => {
                                    const index = e.nativeEvent.target.selectedIndex;
                                    wardCode.current = e.target.value;
                                    setWardText(e.nativeEvent.target[index].text);
                                    // setWard(e.target.value);
                                }}
                                required
                            >
                                <option value="" key="default" disabled>
                                    Choose one Ward
                                </option>
                                {wardArray.current.map((element) => {
                                    if (element.name === Number(wardCode.current)) {
                                        //wardCode.current = element.code;
                                        return (<option value={element.code} key={element.code} selected>
                                            {element.name}
                                        </option>)
                                    }
                                    else {
                                        return (<option value={element.code} key={element.code} >
                                            {element.name}
                                        </option>)
                                    }
                                })}
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
                        <ListGroup.Item>
                            <div className="d-grid">
                                <Button
                                    type="submit"
                                    variant="dark"

                                >
                                    EDIT MY PROFILE
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </Col>


                </Row>
            </Form>
        </div>
    );
}

export default CheckoutPage;
