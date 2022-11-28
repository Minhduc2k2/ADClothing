import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="aboutus-container">
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className="aboutus-card">
        <img
          className="aboutus-dev-avatar"
          src="assets/images/avatar-nva-20110434.jpg"
          alt="John"
        />
        <h1>Nguyen Van An</h1>
        <h2 className="aboutus-code">20110434</h2>
        <p className="aboutus-desc">
          HCMC University of Technology and Education
        </p>
        <p>
          <a href="https://www.facebook.com/ON.611.02" className="aboutus-link">
            <Button variant="dark" className="aboutus-btn-contact">
              Contact
            </Button>
          </a>
        </p>
      </div>
      <div className="aboutus-card">
        <img
          className="aboutus-dev-avatar"
          src="assets/images/avatar-nmd-20110461.jpg"
          alt="John"
        />
        <h1>Nguyen Minh Duc</h1>
        <h2 className="aboutus-code">20110461</h2>
        <p className="aboutus-desc">
          HCMC University of Technology and Education
        </p>
        <p>
          <a href="https://www.facebook.com/mingduc2k2">
            <Button variant="dark" className="aboutus-btn-contact">
              Contact
            </Button>
          </a>
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;
