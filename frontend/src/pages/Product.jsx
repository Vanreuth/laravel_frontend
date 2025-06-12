import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContaxt } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import RelatedProduct from "../components/RelatedProduct"; // Assuming this component exists

const Product = () => {
  const { productId } = useParams();
  const { currency } = useContext(ShopContaxt);
  const { addToCart } = useContext(CartContext);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback image URL
  const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/600x400?text=No+Image'; // A common placeholder service

  // Fetch product data
  const fetchProductData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductData(data);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]); // Re-fetch if productId changes (e.g., navigating between product pages)

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="ms-2">Loading Product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-danger">Error: {error}</p>
        <p>Please try again later or check the product ID.</p>
      </div>
    );
  }

  if (!productData) {
    // This case should ideally be caught by error or loading, but as a safeguard
    return (
      <div className="container mt-5 text-center">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <section className="sec-product-detail bg0 p-t-90 p-b-60 mt-30">
      <div className="container">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 col-lg-7 p-b-30">
            <div className="p-l-25 p-r-30 p-lr-0-lg">
              <div className="wrap-slick3 flex-sb flex-w">
                <div className="slick3 gallery-lb">
                  <div className="item-slick3">
                    <div className="wrap-pic-w pos-relative">
                      <img
                        // Use productData.image_url, and provide a fallback if it's null or undefined
                        src={productData.image_url || FALLBACK_IMAGE_URL}
                        alt={productData.name}
                        className="img-fluid" // Assuming img-fluid is a Bootstrap class for responsive images
                        onError={(e) => { // Optional: handle image load errors on the client side
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = FALLBACK_IMAGE_URL;
                        }}
                      />
                      {/* Only show expand link if there's an actual image URL */}
                      {productData.image_url && (
                        <a
                          className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                          href={productData.image_url}
                          target="_blank" // Open in new tab
                          rel="noopener noreferrer" // Security best practice for target="_blank"
                        >
                          <i className="fa fa-expand"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6 col-lg-5 p-b-30">
            <div className="p-r-50 p-t-5 p-lr-0-lg">
              <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                {productData.name}
              </h4>

              <span className="mtext-106 cl2">
                {currency} {productData.price}
              </span>

              <p className="stext-102 cl3 p-t-23">
                {productData.description}
              </p>

              {/* Add to Cart */}
              <div className="p-t-33">
                <button
                  onClick={() => addToCart(productData)}
                  className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                >
                  Add to cart
                </button>
              </div>

              {/* Social Share */}
              <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  data-tooltip="Facebook"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  data-tooltip="Twitter"
                >
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bor10 m-t-50 p-t-43 p-b-40">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item p-b-10">
              <a className="nav-link active" data-toggle="tab" href="#description" role="tab">
                Description
              </a>
            </li>
            {/* If you have reviews, you'd enable this section and fetch review data */}
            {/* <li className="nav-item p-b-10">
              <a className="nav-link" data-toggle="tab" href="#reviews" role="tab">
                Reviews ({productData.rating?.count || 0})
              </a>
            </li> */}
          </ul>

          <div className="tab-content p-t-43">
            <div className="tab-pane fade show active" id="description" role="tabpanel">
              <div className="p-lr-15-md">
                <p className="stext-102 cl6">{productData.description}</p>
              </div>
            </div>
            {/*
            <div className="tab-pane fade" id="reviews" role="tabpanel">
              <p className="stext-102 cl6">No reviews yet.</p>
            </div>
            */}
          </div>
          {/* Ensure category object is passed, not just category.name */}
          {productData.category && <RelatedProduct category={productData.category} />}
        </div>
      </div>
    </section>
  );
};

export default Product;