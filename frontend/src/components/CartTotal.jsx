import React, { useContext, useEffect } from "react";
import { ShopContaxt } from "../context/ShopContext";
import {CartContext} from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartTotal = ({ onTotalChange }) => {
  const { currency, delivery_free } = useContext(ShopContaxt);
  const { getCartAmount } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = getCartAmount() || 0;
  const deliveryFee = delivery_free || 0;
  const total = subtotal + deliveryFee; 

  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(total);
    }
  }, [subtotal, deliveryFee, total, onTotalChange]);

  return (
    
    <div className=" m-lr-auto m-b-50">
    <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
      <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

      <div className="flex-w flex-t bor12 p-b-13">
        <div className="size-208">
          <span className="stext-110 cl2">
            Subtotal:
            </span>
        </div>
        <div className="size-209">
          <span className="mtext-110 cl2">
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex-w flex-t bor12 p-b-13">
        <div className="size-208">
          <span className="stext-110 cl2">Shipping Fee:</span>
        </div>
        <div className="size-209">
          <span className="mtext-110 cl2">
            {currency}
            {deliveryFee.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex-w flex-t p-t-27 p-b-33">
        <div className="size-208">
          <span className="mtext-101 cl2">Total:</span>
        </div>
        <div className="size-209 p-t-1">
          <span className="mtext-110 cl2">
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
      <button
  type="button"
  className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
  onClick={() => navigate('/place-order')}
>
  Proceed to Checkout
</button>
    </div>
    </div>
  );
};

export default CartTotal;
