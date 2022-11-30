import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import "./SigninupPage.css";

const submithandler = () => {};
const handleForgetPwd = () => {};
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
