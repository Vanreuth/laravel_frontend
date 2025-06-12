import React, { useContext } from 'react';
import { ShopContaxt } from "../context/ShopContext";

const Banner = () => {
  const { products } = useContext(ShopContaxt);

  // Filter products based on categories (Men, Women, Accessories, Jewelry)
  const menProducts = products.filter(product => product.category === "men's clothing");
  const womenProducts = products.filter(product => product.category === "women's clothing");
  const accessoriesProducts = products.filter(product => product.category === "electronics");
  const jeweleryProducts = products.filter(product => product.category === "jewelery");

  return (
    <div className="sec-banner bg0 p-t-80 p-b-50">
      <div className="container">
      <div className="p-b-50">
            <h3 className="ltext-103 cl5">Best Saller</h3>
          </div>
        <div className="row">
          {/* Women Category Banner */}
        
          {womenProducts.length > 0 && (
            <div className="col-md-6 col-xl-3 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w position-relative">
                <img src={womenProducts[0].image_url} alt="Women Banner" style={{
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              height: "25rem",
            }} />
                <a href={`/product/${womenProducts[0].id}`} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 position-absolute">
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8 font-weight-bold">
                      Women
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      {womenProducts[0].name}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Men Category Banner */}
          {menProducts.length > 0 && (
            <div className="col-md-6 col-xl-3 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w position-relative ">
                <img src={menProducts[0].image_url} alt="Men Banner"   style={{
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              height: "25rem",
            }} />
                <a href={`/product/${menProducts[0].id}`} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 position-absolute">
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8 font-weight-bold">
                      Men
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      {menProducts[0].title}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Accessories Category Banner */}
          {accessoriesProducts.length > 0 && (
            <div className="col-md-6 col-xl-3 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w position-relative">
                <img src={accessoriesProducts[0].image} alt="Accessories Banner"  style={{
              backgroundSize: "cover",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              height: "25rem",
            }} />
                <a href={`/product/${accessoriesProducts[0].id}`} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 position-absolute">
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8 font-weight-bold">
                      Accessories
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      {accessoriesProducts[0].title}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Jewelry Category Banner */}
          {jeweleryProducts.length > 0 && (
            <div className="col-md-6 col-xl-3 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w position-relative">
                <img src={jeweleryProducts[0].image} alt="Jewelry Banner"  style={{
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              height: "25rem",
            }} />
                <a href={`/product/${jeweleryProducts[0].id}`} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 position-absolute">
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8 font-weight-bold">
                      Jewelry
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      {jeweleryProducts[0].title}
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
