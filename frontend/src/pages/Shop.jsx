import React, { useEffect, useState, useContext } from "react";
import ProductItem from "../components/ProductItem";
import { ShopContaxt } from "../context/ShopContext";
import axios from "axios";

const Shop = () => {
  const { products, search, showSearch, loading, error } =
    useContext(ShopContaxt);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [searchText, setSearchText] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setCategory((prev) =>
      prev.includes(categoryId)
        ? prev.filter((item) => item !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Apply filters and sorting logic
  const applyFiltersAndSort = () => {
    let productCopy = [...products];

    // Search filter
    if (showSearch && (search || searchText)) {
      productCopy = productCopy.filter((item) =>
        item.name?.toLowerCase().includes((search || searchText).toLowerCase())
      );
    }

    // Category filter (based on category_id)
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category_id?.toString())
      );
    }

    // Sorting
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  // Initial load
  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [category, search, showSearch, sortType, searchText]);

  if (loading) {
    return (
      <div className="container text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading products...</p>
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

  return (
    <div>
      <section className="bg0 p-t-30">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          {/* Filter & Sort */}
          <div className="flex-w flex-sb-m p-b-52">
            {/* Category Buttons */}
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  category.length === 0 ? "how-active1" : ""
                }`}
                onClick={() => setCategory([])}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                    category.includes(cat.id.toString()) ? "how-active1" : ""
                  }`}
                  onClick={() => toggleCategory(cat.id.toString())}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex-w flex-c-m m-tb-10">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="text-sm stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4"
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product List */}
          <div className="row isotope-grid">
            {filterProduct.length > 0 ? (
              filterProduct.map((item) => (
                <div
                  key={item.id}
                  className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
                >
                  <ProductItem
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image_url}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center p-5">
                <p className="stext-113 cl6">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filterProduct.length > 0 && (
            <div className="flex-c-m flex-w w-full p-t-45 p-b-40">
              <a
                href="#"
                className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
              >
                Load More
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
