import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Row,
  Form,
  Col,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Store } from "./../../Store";
import axios from "./../../hooks/axios";
import { default as axiosOriginal } from "axios";
import "./MyProfile.css";
import { notice } from "../../hooks/toast.js";
import { AuthContext } from "../../context/AuthContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Helmet } from "react-helmet-async";
// Register the plugins
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginImageResize
);
function MyProfile() {
  const [files, setFiles] = useState([]);
  console.log(
    "🚀 ~ file: MyProfile.js ~ line 31 ~ CheckoutPage ~ files",
    files
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAvt, setShowAvt] = useState(false);
  const handleCloseAvt = () => setShowAvt(false);
  const handleShowAvt = () => setShowAvt(true);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const provinceCode = useRef();
  const distinctCode = useRef();
  const wardCode = useRef();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log("🚀 ~ file: MyProfile.js ~ line 49 ~ CheckoutPage ~ user", user);
  const urlUpdateAvt = `http://localhost:8800/backend/users/${user._id}`;
  const getAddress = () => {
    const arr = user.address.split("%");
    return {
      address: arr[0],
      ward: arr[1],
      distinct: arr[2],
      province: arr[3],
    };
  };
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
  // FIXME: lỗi khi chưa có address, cả bên checkout

  const save = async (e) => {
    e.preventDefault();
    console.log("SAV", e.target[5].innerHTML.name);
  };
  const handleChangeAvt = async () => {};
  const handleChangePassword = async () => {
    if (newPassword !== rePassword) {
      notice("warn", "Re-password incorrect", 2000);
    } else {
      if (checkFormPassword(newPassword) === false) {
        notice("warn", "Password must be at least 8 characters", 2000);
        return;
      }
      try {
        const body = {
          email: user.email,
          password: oldPassword,
        };
        const verify = await axios.post(`/auth/login`, body);
        if (verify.data.success === false) {
          notice("error", "wrong password !", 2000);
          return;
        } else {
          const result = await axios.patch(`/users/${user.email}`, {
            password: String(newPassword),
          });
          if (result.data !== null) {
            notice("success", "Change password successfully !", 2000);
            setShow(false);
          } else notice("error", "Password change failed !", 2000);
        }
      } catch (error) {
        notice("error", "wrong something !", 2000);
        console.log(error);
      }
    }
  };

  const checkFormPassword = (input) => {
    if (input.length < 8) {
      return false;
    }
    return true;
  };

  // chạy đầu tiên sau render
  useEffect(() => {
    const fetchData = async () => {
      try {
        // chạy câu dưới nhưng không thục thi và chạy những sync khác
        const proData = await axiosOriginal.get(
          `https://provinces.open-api.vn/api/p/search/?q=${addressInfo.province}`
        );
        // sau khi thực thi tất cả các sync, sẽ thực thi câu lệnh trên, sau đó chạy và thực thi các hàm dưới
        provinceCode.current = proData.data[0].code;

        const distData = await axiosOriginal.get(
          `https://provinces.open-api.vn/api/d/search/?q=${addressInfo.distinct}&p=${provinceCode.current}`
        );
        distinctCode.current = distData.data[0].code;

        const wardData = await axiosOriginal.get(
          `https://provinces.open-api.vn/api/w/search/?q=${addressInfo.ward}&d=${distinctCode.current}&p=${provinceCode.current}`
        );
        wardCode.current = wardData.data[0].code;

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
      address:
        address + "%" + wardText + "%" + distinctText + "%" + provinceText,
    };
    const result = await axios.put(`/users/${user._id}`, userInfo);
    if (result.data !== null) notice("success", "Edit success", 2000);
    else notice("error", "Edit error", 2000);
  };
  return (
    <div className="checkout-container">
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <img src={user.imgPath} alt="Avatar" className="avatar" />
        <Row className="checkout-container">
          <Col md={8} className="checkout-details">
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => {
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
                    return (
                      <option value={element.code} key={element.code} selected>
                        {element.name}
                      </option>
                    );
                  } else {
                    return (
                      <option value={element.code} key={element.code}>
                        {element.name}
                      </option>
                    );
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
                    return (
                      <option value={element.code} key={element.code} selected>
                        {element.name}
                      </option>
                    );
                  } else {
                    return (
                      <option value={element.code} key={element.code}>
                        {element.name}
                      </option>
                    );
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
                    return (
                      <option value={element.code} key={element.code} selected>
                        {element.name}
                      </option>
                    );
                  } else {
                    return (
                      <option value={element.code} key={element.code}>
                        {element.name}
                      </option>
                    );
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
                <Button type="submit" variant="dark">
                  EDIT MY PROFILE
                </Button>
              </div>
              <hr></hr>
            </ListGroup.Item>
          </Col>
        </Row>
      </Form>
      <Row className="change-container">
        <Col md={8} className="checkout-details">
          <ListGroup.Item>
            <div className="d-grid">
              <Button variant="primary" onClick={handleShow}>
                Change password
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="old-password">
                      <Form.Label>Old password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Old password"
                        autoFocus
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="new-password">
                      <Form.Label>New password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="re-password">
                      <Form.Label>Re-password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Re-password"
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleChangePassword}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <hr></hr>
            <div className="d-grid">
              <Button variant="primary" onClick={handleShowAvt}>
                Change avatar
              </Button>

              <Modal show={showAvt} onHide={handleCloseAvt}>
                <Modal.Header closeButton>
                  <Modal.Title>Choose Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form action={urlUpdateAvt} method="post">
                    <FilePond
                      files={files}
                      onUpdateFiles={setFiles}
                      maxFiles={3}
                      maxFileSize="3MB"
                      //server="/api"
                      name="img"
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                    <div class="modal-footer">
                      <button
                        onClick={handleCloseAvt}
                        type="button"
                        class="btn btn-secondary"
                      >
                        Close
                      </button>
                      <input type="submit" class="btn btn-primary" />
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </ListGroup.Item>
        </Col>
      </Row>
    </div>
  );
}

export default MyProfile;
