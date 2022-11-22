import { useEffect, useState } from "react";
import axios from "./../../hooks/axios";
import Rating from "../Rating/Rating";
function Reviews({ id, limit }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/reviews/${id}`);
      setReviews(data);
    };
    fetchData();
  }, [id, setReviews]);

  return (
    <div className="product-review-container">
      {reviews &&
        reviews.slice(0, limit).map((review) => (
          <div className="product-review-content" key={review._id}>
            <img src={review.imgPath} alt="avatar" />
            <div className="product-review-text">
              <Rating rating={review.rating} caption={" "} />
              <div className="d-flex justify-content-between">
                <span className="product-review-name">{review.name}</span>
                <span className="product-review-date">
                  {review.createdAt.slice(0, 10)}
                </span>
              </div>
              <p className="product-review-detail">{review.review}</p>
            </div>
          </div>
        ))}
      {/* <div className="product-review-content">
            <img src="assets/images/avater-1.jpg" alt="avatar" />
            <div>
              <Rating rating={5} caption={" "} />
              <div className="d-flex justify-content-between">
                <span className="product-review-name">Nguyen Van An</span>
                <span className="product-review-date">June 23, 2019</span>
              </div>
              <p className="product-review-detail">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
                suscipit consequuntur in, perspiciatis laudantium ipsa fugit.
                Iure esse saepe error dolore quod.
              </p>
            </div>
          </div> */}
    </div>
  );
}

export default Reviews;
