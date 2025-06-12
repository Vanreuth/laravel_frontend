import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/sliders`);
        setSliders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sliders");
        setLoading(false);
        console.error("Error fetching sliders:", err);
      }
    };

    fetchSliders();
  }, []);

  if (loading) {
    return <div>Loading sliders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!sliders || sliders.length === 0) {
    return <div>No sliders available</div>;
  }

  return (
    <OwlCarousel
      items={1}
      loop
      autoplay
      autoplayTimeout={5000}
      className="owl-theme"
    >
      {sliders.map((slider, id) => (
        <div
          key={id}
          className="item-slick1"
          style={{
            backgroundImage: `url(${API_BASE_URL}${slider.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
          }}
        >
          <div className="container h-100">
            <div className="d-flex justify-content-center align-items-center h-100 flex-column text-center">
              <div className="animated fadeInDown" data-delay="0">
                <span className="ltext-101 cl2">{slider.title}</span>
              </div>
              <div className="animated fadeInUp" data-delay="800">
                <h2
                  className="ltext-201 cl2 p-t-19 p-b-43"
                  style={{ width: "80%" }}
                >
                  {slider.description}
                </h2>
              </div>
              <div className="animated zoomIn" data-delay="1600">
                <a
                  href="/products"
                  className="btn btn-primary"
                  style={{
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    fontSize: "16px",
                  }}
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
};

export default Slider;
