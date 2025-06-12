import React, { useState } from "react";

const Filter = () => {
  const [searchText, setSearchText] = useState("");
  const [category , setCategory] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log(`Searching for: ${event.target.value}`);
    // Add logic to search products
  };

  return (
    <div className="flex-w flex-sb-m p-b-52">
      {/* Filter buttons */}
      <div className="flex-w flex-l-m filter-tope-group m-tb-10">
					<button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">
						All Products
					</button>

					<button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".women" value="men's clothing" onChange={toggleCategory}>
						Women
					</button>

					<button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".men">
						Men
					</button>

					<button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".bag">
						Bag
					</button>

					<button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".shoes">
						Shoes
					</button>

					<button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".watches">
						Watches
					</button>
				</div>

      {/* Filter and Search toggles */}
      <div className="flex-w flex-c-m m-tb-10">
        <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4">
          <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
          Filter
        </div>

        <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4">
          <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
          Search
        </div>
      </div>

      {/* Search product */}
      <div className="dis-flex panel-search w-full p-t-10 p-b-15">
        <div className="bor8 dis-flex p-l-15">
          <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
            <i className="zmdi zmdi-search"></i>
          </button>
          <input
            className="mtext-107 cl2 size-114 plh2 p-r-15"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search"
          />
        </div>
      </div>

      {/* Filter Panel */}
      <div className="dis-none panel-filter w-full p-t-10">
        <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
          <div className="filter-col1 p-r-15 p-b-27">
            <div className="mtext-102 cl2 p-b-15">Sort By</div>
            <ul>
              {["Default", "Popularity", "Average rating", "Newness", "Price: Low to High", "Price: High to Low"].map(
                (sortOption, index) => (
                  <li className="p-b-6" key={index}>
                    <a href="#" className="filter-link stext-106 trans-04">
                      {sortOption}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="filter-col2 p-r-15 p-b-27">
            <div className="mtext-102 cl2 p-b-15">Price</div>
            <ul>
              {["All", "$0.00 - $50.00", "$50.00 - $100.00", "$100.00 - $150.00", "$150.00 - $200.00", "$200.00+"].map(
                (priceRange, index) => (
                  <li className="p-b-6" key={index}>
                    <a href="#" className="filter-link stext-106 trans-04">
                      {priceRange}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="filter-col3 p-r-15 p-b-27">
            <div className="mtext-102 cl2 p-b-15">Color</div>
            <ul>
              {["Black", "Blue", "Grey", "Green", "Red", "White"].map(
                (color, index) => (
                  <li className="p-b-6" key={index}>
                    <span
                      className="fs-15 lh-12 m-r-6"
                      style={{ color: color.toLowerCase() }}
                    >
                      <i className="zmdi zmdi-circle"></i>
                    </span>
                    <a href="#" className="filter-link stext-106 trans-04">
                      {color}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="filter-col4 p-b-27">
            <div className="mtext-102 cl2 p-b-15">Tags</div>
            <div className="flex-w p-t-4 m-r--5">
              {["Fashion", "Lifestyle", "Denim", "Streetstyle", "Crafts"].map(
                (tag, index) => (
                  <a
                    href="#"
                    className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    key={index}
                  >
                    {tag}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
