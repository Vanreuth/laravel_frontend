import React, { useContext } from "react";
import { ShopContaxt } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { products, currency } = useContext(ShopContaxt);

  return (
    <div className="bg0 p-t-75 p-b-90">
      <div className="container">
    <div className="border-top pt-5">
      <div className="text-center mb-4">
        <Title text1="MY" text2="ORDER" />
      </div>
      {products.slice(1, 4).map((item, index) => (
        <div
          key={index}
          className="py-4 border-top border-bottom text-secondary d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-4"
        >
          <div className="d-flex align-items-start gap-4 text-sm p-2">
            <img
              src={item.image}
              className="w-25 img-fluid"
              alt={item.title}
            />
            <div>
              <p className="fw-bold mb-1">{item.title}</p>
              <div className="d-flex align-items-center gap-3 text-secondary">
                <p className="fs-6">{currency}{item.price}</p>
                <p>Quantity: 1</p>
                <p>Size: M</p>
              </div>
              <p className="mt-2">
                Date: <span className="text-muted">11, July, 2024</span>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center gap-2">
              <span className="d-inline-block rounded-circle bg-success" style={{ width: "10px", height: "10px" }}></span>
              <span className="">Ready to ship</span>
            </div>
            <button className="btn btn-outline-primary px-4 py-2">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Order;
