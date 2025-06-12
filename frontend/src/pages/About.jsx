import React, { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/about-us");
        setAboutData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load about page content");
        setLoading(false);
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="container text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading about page content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center p-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  // Get the latest about entry
  const latestAbout = aboutData.length > 0 ? aboutData[0] : null;

  if (!latestAbout) {
    return (
      <div className="container text-center p-5">
        <div className="alert alert-info" role="alert">
          No about page content available.
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Background Section */}
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{
          backgroundImage: `url(http://localhost:8000${latestAbout.banner_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
        }}
      >
        <h2 className="ltext-105 cl0 text-center">
          {latestAbout.title || "About Us"}
        </h2>
      </section>

      {/* Content Page */}
      <section className="bg0 p-t-75 p-b-120">
        <div className="container">
          <div className="row p-b-148">
            <div className="col-md-7 col-lg-8">
              <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                <h3 className="mtext-111 cl2 p-b-16">
                  {latestAbout.subtitle1 || "Our Story"}
                </h3>

                <p className="stext-113 cl6 p-b-26">
                  {latestAbout.description1 ||
                    "Welcome to our store! We are passionate about providing high-quality products and exceptional service to our customers."}
                </p>

                <p className="stext-113 cl6 p-b-26">
                  Any questions? Let us know in store at 8th floor, 379 Hudson
                  St, New York, NY 10018 or call us on (+1) 96 716 6879
                </p>
              </div>
            </div>

            <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
              <div className="how-bor1">
                <div className="hov-img0">
                  <img
                    src={`http://localhost:8000${latestAbout.image1}`}
                    alt={latestAbout.subtitle1 || "Our Story"}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
              <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                <h3 className="mtext-111 cl2 p-b-16">
                  {latestAbout.subtitle2 || "Our Mission"}
                </h3>

                <p className="stext-113 cl6 p-b-26">
                  {latestAbout.description2 ||
                    "We are committed to providing our customers with the best shopping experience possible."}
                </p>

                <div className="bor16 p-l-29 p-b-9 m-t-22">
                  <p className="stext-114 cl6 p-r-40 p-b-11">
                    The best way to predict the future is to create it.
                  </p>

                  <span className="stext-111 cl8">- Peter Drucker</span>
                </div>
              </div>
            </div>

            <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
              <div className="how-bor2">
                <div className="hov-img0">
                  <img
                    src={`http://localhost:8000${latestAbout.image2}`}
                    alt={latestAbout.subtitle2 || "Our Mission"}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
