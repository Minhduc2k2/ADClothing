import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "../../hooks/axios";
import "./CheckoutHistoryPage.css";
import { AuthContext } from "../../context/AuthContext";
function CheckoutHistoryPage() {
  const { user } = useContext(AuthContext);
  const [checkouts, setCheckouts] = useState([]);
  const navigate = useNavigate();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/checkouts/all/${user._id}`);
        console.log(data);
        setCheckouts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className="checkouthistory-container">
      <h1>Checkout History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {checkouts &&
            checkouts.map((checkout) => (
              <tr key={checkout._id}>
                <td>{checkout._id}</td>
                <td>
                  {formatter.format(
                    new Date(checkout.createdAt.substring(0, 10))
                  )}
                </td>
                <td style={{ color: checkout.isPaid ? "green" : "red" }}>
                  {checkout.isPaid ? "PAID" : "UNPAID"}
                </td>
                <td>${checkout.totalCost}</td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => {
                      navigate(`/checkout/${checkout._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckoutHistoryPage;
