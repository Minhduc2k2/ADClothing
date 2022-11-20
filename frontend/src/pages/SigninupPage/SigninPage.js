import { Link } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import "./SigninupPage.css";
function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <Form>
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
              <Button variant="dark" type="submit" className="signinup-button">
                Sign In
              </Button>

              <div className="signinup-footer">
                <div className="mt-1 mb-1">OR</div>
                <button type="button" class="login-with-google-btn">
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

export default SigninPage;
