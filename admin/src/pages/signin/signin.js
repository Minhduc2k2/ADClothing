import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";
import "./SigninupPage.css";
import { toast } from "react-toastify";
import axios from "./../../hooks/axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      if (data.success === false) {
        toast.error("Wrong email or password");
        return;
      }
      if (data.isAdmin === false) {
        toast.error("You are not admin");
        return;
      }
      toast.success("Success Sign in");
      Cookies.set("userInfo", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });

      navigate("/dashboard", { state: { user: data } });
    } catch (err) {
      console.log(err.message);
      toast.error("Invalid username or password");
    }
  };
  const handleForgetPwd = () => {};
  return (
    <Container className="signinup-container">
      <Card>
        <Card.Body>
          <div className="signinup-header">
            <h1>Sign In</h1>
          </div>
          <Form onSubmit={submithandler}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
              <input
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button
              variant="dark"
              type="submit"
              className="signinup-button mt-3"
            >
              Sign In
            </Button>
            <p className="signinup-forget">
              <div>or</div>
              <Button variant="light" onClick={handleForgetPwd}>
                Forget password
              </Button>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signin;
