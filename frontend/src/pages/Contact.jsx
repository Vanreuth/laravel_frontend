import React from "react";
import contact from "../assets/images/bg-01.jpg";
import { FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <div>
      {/* Background Section */}
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: `url(${contact})` }}
      >
        <h2 className="ltext-105 cl0 txt-center">Contact</h2>
      </section>

      {/* Content Page */}
      <section className="bg0 p-t-104 ">
        <div className="container">
          <div className="flex-w flex-tr">
            {/* Form Section */}
            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Send Us A Message
                </h4>

                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="email"
                    placeholder="Your Email Address"
                  />
                  <FiMail
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "20px",
                      color: "#999",
                    }}
                  />
                </div>

                <div className="bor8 m-b-30">
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                    name="msg"
                    placeholder="How Can We Help?"
                  ></textarea>
                </div>

                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Information Section */}
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Address</span>
                  <p className="stext-115 cl6 size-213 p-t-18">
                    Coza Store Center 8th floor, 379 Hudson St, New York, NY
                    10018 US
                  </p>
                </div>
              </div>

              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Lets Talk</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    +1 800 1236879
                  </p>
                </div>
              </div>

              <div className="flex-w w-full">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-envelope"></span>
                </span>

                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Sale Support</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    contact@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="map" style={{ marginBottom: "150px", marginTop: "80px" }}>
        <div
          className="size-303  container-fluid col-lg-12 d-flex align-items-center justify-content-center position-relative"
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1000"
        >
          <iframe
            className="h-60 w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15637.060305901385!2d104.9692165675949!3d11.532832822705236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109571964cdbbf1%3A0xa5bb764924a11489!2sBorey%20Lim%20Chheanghak%20(Veal%20Sbov)!5e0!3m2!1sen!2skh!4v1733060951771!5m2!1sen!2skh"
            // width="900"
            height="600"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
