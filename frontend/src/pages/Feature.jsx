import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CartTotal from '../components/CartTotal';
import { CartContext } from '../context/CartContext';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const Feature = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartData(cart); // Sync cart data from context
  }, [cart]);
  


  return (
    <div>
    <form className="bg0 p-t-75 p-b-90">
      <div className="container">
        <div className="row">
          {/* Cart Table Section */}
          <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
            <div className="m-l-25 m-r--38 m-lr-0-xl">
              <div className="wrap-table-shopping-cart">
                <table className="table-shopping-cart">
                  <thead>
                    <tr className="table_head">
                      <th className="column-1">Product</th>
                      <th className="column-2"></th>
                      <th className="column-3">Price</th>
                      <th className="column-4">Quantity</th>
                      <th className="column-5">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Your cart is empty. <a href="/shop">Start shopping</a>!
                        </td>
                      </tr>
                    ) : (
                      cartData.map((item, index) => (
                        <tr key={index} className="table_row">
                          <td className="column-1">
                            <div className="how-itemcart1">
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="img-fluid"
                                style={{ width: '80px', height: '80px' }}
                              />
                            </div>
                          </td>
                          <td className="column-2">{item.title}</td>
                          <td className="column-3">${item.price}</td>
                          <td className="column-4">
                            <div className="wrap-num-product flex-w m-l-auto m-r-0">
                              <button
                                className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                type="button"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <FaMinus/>
                              </button>
                              <input
                                className="mtext-104 cl3 txt-center num-product"
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                  updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                                }
                              />
                              <button
                                className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <FaPlus/>
                              </button>
                            </div>
                          </td>
                          <td className="column-5">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <CartTotal/>
        </div>
      </div>
    </form>

</div>
    
  );
};

export default Feature;
