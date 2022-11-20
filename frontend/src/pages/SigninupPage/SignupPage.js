import { Link } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import "./SigninupPage.css";
function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  return (
    <div>
      <Container className="signinup-container">
        <Card>
          <Card.Body>
            <div className="signinup-header">
              <h1>Sign Up</h1>
              <p>
                Already have an account? <Link to="/signin"> Sign in</Link>
              </p>
            </div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="userName"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              >
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required />
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
              <Form.Group
                className="mb-3"
                controlId="passwordConfirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
              >
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>
              <Button variant="dark" type="submit" className="signinup-button">
                Sign Up
              </Button>

              <div className="signinup-footer">
                <div className="mt-1 mb-1">OR</div>
                <button type="button" class="login-with-google-btn">
                  Sign up with Google
                </button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SignupPage;
