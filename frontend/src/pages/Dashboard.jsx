import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import UserManagement from "./UserManagement";
import OrderManagement from "./OrderManagement";
import SliderManagement from "./SliderManagement";
import AboutUsManagement from "./AboutUsManagement";
import ContactManagement from "./Contact Management";
import DashboardManagement from "./DashboardManagement";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [categories, setCategories] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    // Simulate loading for better UX
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const styles = {
    dashboard: {
      minHeight: "100vh",
      background: "#f8fafc",
    },
    mainContent: {
      marginTop: "56px",
      minHeight: "calc(100vh - 56px)",
      background: "#f8fafc",
      transition: "all 0.3s ease-in-out",
    },
    container: {
      maxWidth: "1400px",
      padding: "2rem",
      margin: "0 auto",
      transition: "all 0.3s ease-in-out",
    },
    sidebarTransition: {
      transition: "all 0.3s ease-in-out",
    },
    loadingOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    loadingSpinner: {
      width: "3rem",
      height: "3rem",
      color: "#5a67d8",
    },
  };

  if (loading) {
    return (
      <div style={styles.loadingOverlay}>
        <Spinner animation="border" style={styles.loadingSpinner} />
      </div>
    );
  }

  return (
    <div style={styles.dashboard}>
      <Topbar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
      <div style={styles.mainContent}>
        {sidebarVisible && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logout={logout}
            style={styles.sidebarTransition}
          />
        )}
        <Container
          fluid
          style={{
            ...styles.container,
            marginLeft: sidebarVisible ? "260px" : "0",
            width: sidebarVisible ? "calc(100% - 260px)" : "100%",
          }}
        >
          <div className="fade-in">
            {activeTab === "dashboard" && <DashboardManagement />}
            {activeTab === "silder" && <SliderManagement />}
            {activeTab === "products" && (
              <ProductManagement categories={categories} />
            )}
            {activeTab === "categories" && <CategoryManagement />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "orders" && <OrderManagement />}
            {activeTab === "about" && <AboutUsManagement />}
            {activeTab === "contact" && <ContactManagement />}
          </div>
        </Container>
      </div>
    </div>
  );
};

// Add global styles for animations
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

export default Dashboard;
