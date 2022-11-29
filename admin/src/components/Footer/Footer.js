import "./Footer.css";
function Footer() {
  return (
    <div className={"footer-container"}>
      <div className={"left"}>
        <h3 className={"brand"}>ADClothing</h3>
        <p className={"description"}>
          Shop the ADClothing Official Website. Browse the latest collections,
          explore the campaigns and discover our online assortment of clothing
          and accessories.
        </p>
        <div className={"social-container"}>
          <div className={"social-logo"}>
            <i class="fa-brands fa-facebook"></i>
          </div>
          <div className={"social-logo"}>
            <i class="fa-brands fa-instagram"></i>
          </div>
        </div>
      </div>
      <div className={"center"}>
        <h3 className={"title"}>Useful Links</h3>
        <ul className={"link-list"}>
          <li className={"link-item"}>Home</li>
          <li className={"link-item"}>Man Fashion</li>
          <li className={"link-item"}>Accessories</li>
          <li className={"link-item"}>Order Tracking</li>
          <li className={"link-item"}>Wishlist</li>
          <li className={"link-item"}>Cart</li>
          <li className={"link-item"}>Woman Fashion</li>
          <li className={"link-item"}>My Account</li>
          <li className={"link-item"}>Wishlist</li>
          <li className={"link-item"}>Terms</li>
        </ul>
      </div>
      <div className={"right"}>
        <h3 className={"title"}>Contact</h3>
        <ul className={"contact-list"}>
          <li className={"contact-item"}>
            <i class="fa-solid fa-location-dot"></i>
            <span>622 Dixie Path , South Tobinchester 98336</span>
          </li>
          <li className={"contact-item"}>
            <i class="fa-solid fa-phone"></i>
            <span>+1 234 56 78</span>
          </li>
          <li className={"contact-item"}>
            <i class="fa-solid fa-envelope"></i>
            <span>
              20110461@student.hcmute.edu.vn || 20110434@student.hcmute.edu.vn
            </span>
          </li>
        </ul>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment" />
      </div>
    </div>
  );
}

export default Footer;
