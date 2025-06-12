import { Navbar, Button, Dropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/icons/pin.png";

const Topbar = ({ toggleSidebar, sidebarVisible }) => {
  const { user } = useAuth();

  const styles = {
    navbar: {
      background: "linear-gradient(to right, #ffffff, #f8fafc)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      borderBottom: "1px solid #e2e8f0",
      height: "64px",
      padding: "1rem 5rem 0 1rem",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: "blur(8px)",
      justifyContent: "space-between",
      alignItems: "center",
    },
    brand: {
      fontSize: "1.35rem",
      fontWeight: 700,
      color: "#1a202c",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      letterSpacing: "0.3px",
    },
    brandLogo: {
      height: "32px",
      width: "auto",
      marginRight: "0.5rem",
    },
    toggleButton: {
      background: "transparent",
      border: "none",
      color: "#4a5568",
      padding: "0.625rem",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease-in-out",
      marginRight: "1rem",
      "&:hover": {
        background: "#f7fafc",
        color: "#2d3748",
        transform: "scale(1.05)",
      },
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "0.875rem",
      padding: "0.625rem 0.875rem",
      borderRadius: "14px",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
      border: "1px solid transparent",
      "&:hover": {
        background: "#f7fafc",
        borderColor: "#e2e8f0",
      },
    },
    avatar: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea, #5a67d8)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: "1.1rem",
      boxShadow: "0 2px 6px rgba(90, 103, 216, 0.25)",
      border: "2px solid #ffffff",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 4px 8px rgba(90, 103, 216, 0.3)",
      },
    },
    userDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    },
    userName: {
      fontSize: "0.9375rem",
      fontWeight: 600,
      color: "#2d3748",
      margin: 0,
      lineHeight: "1.2",
      letterSpacing: "0.2px",
    },
    userRole: {
      fontSize: "0.8125rem",
      color: "#718096",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "0.375rem",
    },
    roleBadge: {
      background: "linear-gradient(to right, #e2e8f0, #edf2f7)",
      color: "#4a5568",
      padding: "0.25rem 0.75rem",
      borderRadius: "12px",
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.3px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    dropdownMenu: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      padding: "0.75rem",
      minWidth: "260px",
      marginTop: "0.75rem",
    },
    dropdownHeader: {
      padding: "1rem",
      borderBottom: "1px solid #e2e8f0",
      marginBottom: "0.75rem",
      background: "linear-gradient(to right, #f8fafc, #ffffff)",
      borderRadius: "12px",
    },
    dropdownItem: {
      padding: "0.875rem 1rem",
      color: "#4a5568",
      display: "flex",
      alignItems: "center",
      gap: "0.875rem",
      borderRadius: "10px",
      transition: "all 0.2s ease-in-out",
      fontSize: "0.9375rem",
      fontWeight: 500,
      "&:hover": {
        background: "#f7fafc",
        color: "#2d3748",
        transform: "translateX(4px)",
      },
    },
    dropdownDivider: {
      margin: "0.75rem 0",
      borderTop: "1px solid #e2e8f0",
    },
    dropdownFooter: {
      padding: "0.875rem 1rem",
      borderTop: "1px solid #e2e8f0",
      marginTop: "0.75rem",
      fontSize: "0.8125rem",
      color: "#718096",
      background: "#f8fafc",
      borderRadius: "12px",
    },
    icon: {
      fontSize: "1.1rem",
      width: "20px",
      textAlign: "center",
      color: "#5a67d8",
    },
  };

  return (
    <Navbar style={styles.navbar} >
      <div className="d-flex align-items-center">
        <Button
          variant="link"
          onClick={toggleSidebar}
          style={styles.toggleButton}
        >
          <i
            className={`bi bi-${sidebarVisible ? "list" : "list-nested"} fs-4`}
          ></i>
        </Button>
        <div style={styles.brand}>
          <img src={logo} alt="logo" style={styles.brandLogo} />
          Admin Dashboard
        </div>
      </div>

      <div style={styles.userSection}>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id="user-dropdown"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              textDecoration: "none",
            }}
          >
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={styles.userDetails}>
                <p style={styles.userName}>{user?.name}</p>
                <p style={styles.userRole}>
                  <span style={styles.roleBadge}>{user?.role}</span>
                </p>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={styles.dropdownMenu}>
            <div style={styles.dropdownHeader}>
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2d3748",
                }}
              >
                {user?.name}
              </p>
              <p
                style={{
                  margin: "0.375rem 0 0",
                  fontSize: "0.875rem",
                  color: "#718096",
                }}
              >
                {user?.email}
              </p>
            </div>

            <Dropdown.Item style={styles.dropdownItem}>
              <i className="bi bi-person" style={styles.icon}></i>
              My Profile
            </Dropdown.Item>
            <Dropdown.Item style={styles.dropdownItem}>
              <i className="bi bi-gear" style={styles.icon}></i>
              Settings
            </Dropdown.Item>
            <Dropdown.Item style={styles.dropdownItem}>
              <i className="bi bi-bell" style={styles.icon}></i>
              Notifications
            </Dropdown.Item>
            <Dropdown.Item style={styles.dropdownItem}>
              <i className="bi bi-question-circle" style={styles.icon}></i>
              Help & Support
            </Dropdown.Item>

            <div style={styles.dropdownDivider} />

            <Dropdown.Item style={styles.dropdownItem}>
              <i className="bi bi-box-arrow-right" style={styles.icon}></i>
              Sign Out
            </Dropdown.Item>

            <div style={styles.dropdownFooter}>
              <p style={{ margin: 0 }}>
                Last login: {new Date().toLocaleDateString()}
              </p>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Topbar;
