import React from 'react';

const ProductDetailModal = ({ product, onClose }) => {
  return (
    <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-content" style={{ margin: '15% auto', padding: '20px', background: 'white', width: '80%' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '20px', background: 'none', border: 'none', fontSize: '24px' }}>×</button>
        
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        <p>Price: ${product.price}</p>
        {/* You can add more details here, such as description or features */}
      </div>
    </div>
  );
};

export default ProductDetailModal;
