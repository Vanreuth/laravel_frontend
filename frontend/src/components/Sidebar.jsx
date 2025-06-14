import { Nav } from "react-bootstrap";
import logo from "../assets/images/icons/logo-01.png";

const Sidebar = ({ activeTab, setActiveTab, logout }) => {
  const styles = {
    sidebar: {
      width: "260px",
      height: "100vh",
      position: "fixed",
      top: "56px",
      left: 0,
      background: "#ffffff",
      borderRight: "1px solid #e2e8f0",
      padding: "1.5rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      boxShadow: "2px 0 4px rgba(0,0,0,0.02)",
      transition: "all 0.3s ease-in-out",
    },
    header: {
      padding: "0 0.75rem",
      marginBottom: "0.5rem",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#1a202c",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    nav: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    navItem: {
      padding: 0,
      margin: 0,
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      color: "#4a5568",
      textDecoration: "none",
      transition: "all 0.2s ease-in-out",
      fontSize: "0.875rem",
      fontWeight: 500,
      "&:hover": {
        background: "#f7fafc",
        color: "#2d3748",
      },
    },
    activeNavLink: {
      background: "linear-gradient(45deg, #667eea, #5a67d8)",
      color: "#ffffff",
      boxShadow: "0 4px 12px rgba(90, 103, 216, 0.2)",
      "&:hover": {
        background: "linear-gradient(45deg, #5a67d8, #4c51bf)",
        color: "#ffffff",
      },
    },
    icon: {
      fontSize: "1.1rem",
      width: "20px",
      textAlign: "center",
    },
    logoutButton: {
      marginTop: "auto",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      background: "linear-gradient(45deg, #fc8181, #f56565)",
      color: "#ffffff",
      border: "none",
      fontWeight: 600,
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      boxShadow: "0 4px 12px rgba(245, 101, 101, 0.2)",
      "&:hover": {
        background: "linear-gradient(45deg, #f56565, #e53e3e)",
        transform: "translateY(-1px)",
        boxShadow: "0 6px 16px rgba(245, 101, 101, 0.3)",
      },
    },
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2" },
    { id: "users", label: "User Management", icon: "bi-person-gear" },
    { id: "silder", label: "Slider", icon: "bi-images" },
    { id: "products", label: "Product Management", icon: "bi-box-seam-fill" },
    { id: "categories", label: "Category Management", icon: "bi-tags-fill" },
    { id: "orders", label: "Order Management", icon: "bi-cart-check-fill" },
    { id: "about", label: "About Us", icon: "bi-info-circle-fill" },
    { id: "contact", label: "Contact", icon: "bi-envelope-fill" },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h4 style={styles.title}>
          <i className="bi bi-shield-lock-fill text-primary"></i>
          <img src={logo} alt="logo" />
        </h4>
      </div>

      <Nav style={styles.nav}>
        {menuItems.map((item) => (
          <div key={item.id} style={styles.navItem}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
              style={{
                ...styles.navLink,
                ...(activeTab === item.id ? styles.activeNavLink : {}),
              }}
            >
              <i className={`bi ${item.icon}`} style={styles.icon}></i>
              {item.label}
            </a>
          </div>
        ))}
      </Nav>

      <button onClick={logout} style={styles.logoutButton}>
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
