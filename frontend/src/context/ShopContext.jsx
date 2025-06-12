import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ShopContaxt = createContext();

const ShopContaxtProvider = (props) => {
  const [products, setProducts] = useState([]);
  const currency = "$";
  const delivery_free = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const value = {
    products,
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
