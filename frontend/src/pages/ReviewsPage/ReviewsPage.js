import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Products from "../../components/Products/Products";
import Reviews from "../../components/Reviews/Review";
import { Helmet } from "react-helmet-async";
import "./ReviewsPage.css";
function ReviewsPage() {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(`products/${id}`);
  }, [id]);
  return (
    <div className="reviews-container">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <div className="shop-header">
        <div className="image-container">
          <img
            className="image"
            src="/assets/images/collage-customer-experience-concept.jpg"
            alt="clothing"
          />
        </div>
        <div className="info-container">
          <h1 className="title">Reviews</h1>
          <p className="desc">
            Hath after appear tree great fruitful green dominion moveth sixth
            abundantly image that midst of god day multiply you’ll which
          </p>
        </div>
      </div>
      <Row className="mt-5 reviews-body">
        <Col md={8}>
          <h4>All Reviews</h4>
          <Reviews id={id} />
        </Col>
        <Col md={4}>
          <Products limit={1} url={url} />
        </Col>
      </Row>
    </div>
  );
}

export default ReviewsPage;
