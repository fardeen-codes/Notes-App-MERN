import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3>Notes App</h3>
      <button onClick={handleLogout} style={styles.btn}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;

const styles = {
  nav: {
    padding: "15px 30px",
    background: "#667eea",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    background: "#fff",
    color: "#667eea",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};