import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContaxt = createContext();

const ShopContaxtProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currency = "$";
  const delivery_free = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://54.179.0.116:8000/api/products");
        
        if (response.data && Array.isArray(response.data.list)) {
          setProducts(response.data.list);
        } else {
          console.error("Invalid products data format:", response.data.list);
          setError("Failed to load products: Invalid data format");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products: " + (error.response?.data?.message || error.message));
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    currency,
    delivery_free,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
  };
  return (
    <ShopContaxt.Provider value={value}>{props.children}</ShopContaxt.Provider>
  );
};

export default ShopContaxtProvider;
