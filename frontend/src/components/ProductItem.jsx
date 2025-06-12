import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaRegHeart,FaShoppingCart } from 'react-icons/fa';

const ProductItem = ({ id, image, name, price }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const product = { id, image, name, price };
    addToCart(product);
  };

  return (
    <div className="block2">
      <div className=" block2-pic hov-img0 item-center  position-relative border" style={{ width: '18rem', padding: '2rem' }}>
      <img
          src={image}
          alt="Product"
          style={{ width: '100%', height: '18rem'}}
          className="rounded"
        />
         <span
          className="position-absolute text-uppercase"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            right: '-5px',
            bottom: '1rem',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            color: '#000',
          }}
        >
          COZA STORE
        </span>
        <Link
          to={`/product/${id}`}
          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
        >
          Quick View
        </Link>
      </div>

      <div className="block2-txt flex-w flex-t p-t-14">
        <div className="block2-txt-child1 ">
          <div className='d-flex justify-content-between'>
          <h1 className="stext-105 cl3">US ${price}</h1>
        <div className="block2-txt-child2 p-t-3">
          <button
            onClick={handleAddToCart}
            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2  "
          >
            <FaRegHeart/>
          </button>
        </div>

          </div>
          <Link
            to={`/product/${id}`}  
            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
          >
            {name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
