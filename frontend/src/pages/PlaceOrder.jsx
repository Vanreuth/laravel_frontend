import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { ShopContaxt } from "../context/ShopContext";
import Title from "../components/Title.jsx";
import PayPalComponent from "../components/Paypal.jsx";
import PaypalLogo from "../assets/images/paypal.png";
import VisaLogo from "../assets/images/visa.png"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContaxt);
  const [cartTotal, setCartTotal] = useState(0);

  const handleTotalChange = (total) => {
    setCartTotal(total);
  };

  const handleError = (err) => {
    toast.warning("An error occurred during the transaction.");
  };

  const handleApprove = (details) => {
    toast.success(`Transaction completed by ${details.payer.name.given_name}`);
  };

  return (
    <div className="bg0 p-t-75 p-b-90">
      <div className="container">
        <div className="row">
          {/* Delivery Information */}
          <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
           
            <div className="card p-4 shadow-sm">
              <div className="fw-bold">
            <Title text1="Delivery" text2="Information" />
            </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email address" />
                </div>
                <div className="mb-3">
                  <label>Street Address</label>
                  <input type="text" className="form-control" placeholder="Street" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="City" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>State</label>
                    <input type="text" className="form-control" placeholder="State" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Zipcode</label>
                    <input type="text" className="form-control" placeholder="Zipcode" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Country</label>
                    <input type="text" className="form-control" placeholder="Country" />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input type="text" className="form-control" placeholder="Phone" />
                </div>
              </form>
            </div>
          </div>

          {/* Cart Total and Payment */}
          <div className="col-lg-10 col-xl-5 m-lr-auto m-b-50">
            <CartTotal onTotalChange={handleTotalChange} className="" />
            <div className="card p-4 shadow-sm">
              <h4 className="mb-3">Payment Method</h4>
              <div className="d-flex flex-column gap-3">
                <div
                  className={`border p-3 rounded ${
                    method === "paypal" ? "bg-light border-primary" : ""
                  }`}
                  onClick={() => setMethod("paypal")}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "paypal"}
                    onChange={() => setMethod("paypal")}
                    className="me-3"
                  />
                  <img src={PaypalLogo} alt="PayPal" height="40" />
                </div>
                <div
                  className={`border p-3 rounded ${
                    method === "cod" ? "bg-light border-primary" : ""
                  }`}
                  onClick={() => setMethod("visa")}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "visa"}
                    onChange={() => setMethod("visa")}
                    className="me-3"
                  />
<img src={VisaLogo} alt="Visa" height="40" />
                </div>
                <div
                  className={`border p-3 rounded ${
                    method === "cod" ? "bg-light border-primary" : ""
                  }`}
                  onClick={() => setMethod("cod")}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                    className="me-3"
                  />
                  <span>Cash on Delivery</span>
                </div>
              </div>
              <div className="mt-4">
                {method === "paypal" ? (
                  <PayPalComponent
                    total={cartTotal}
                    onApprove={handleApprove}
                    onError={handleError}
                  />
                ) : (
                  <button className="btn btn-dark w-100" onClick={() => navigate("/order")}>
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
