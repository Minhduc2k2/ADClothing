import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import axios from "./../../hooks/axios";
import "./ForgetPassword.css";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext.js";

function ForgetPassword() {
    const { user, loading, error, dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const google = () => {
        window.open("http://localhost:8800/auth/google", "_self");
    };
    // const { contextDispatch } = useContext(Store);

    const navigate = useNavigate();

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/auth/login", {
                email: email,
                password: password,
            });
            // contextDispatch({
            //   type: "USER_SIGNIN",
            //   payload: data,
            // });

            toast.success("Success Sign in");
            Cookies.set("userInfo", JSON.stringify(data));
            dispatch({ type: "LOGIN_SUCCESS", payload: data });

            navigate("/", { state: { user: data } });
        } catch (err) {
            console.log(err.message);
            toast.error("Invalid username or password");
        }
    };
    return (
        <div>
            <Container className="signinup-container">
                <Card>
                    <Card.Body>
                        <div className="signinup-header">
                            <h1>Sign In</h1>
                            <p>
                                Don’t have an account?{" "}
                                <Link to="/signup"> Create a free account</Link>
                            </p>
                        </div>
                        <Form onSubmit={submithandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="userName"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control required />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required />
                            </Form.Group>
                            <Button
                                variant="dark"
                                type="submit"
                                className="signinup-button mt-3"
                            >
                                Sign In
                            </Button>

                            <div className="signinup-footer">
                                <div className="mt-1 mb-1">OR</div>
                                <button
                                    type="button"
                                    class="login-with-google-btn"
                                    onClick={google}
                                >
                                    Sign in with Google
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default ForgetPassword;
