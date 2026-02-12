import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Homepage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* LEFT */}
        <div style={styles.left}>
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>

          <Link to="/login">
            <button style={styles.outlineBtn}>SIGN IN</button>
          </Link>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <h1>Create Account</h1>

          <form onSubmit={onSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={onChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              required
            />

            <button type="submit" style={styles.fillBtn}>
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef1f7",
  },
  card: {
    width: "900px",
    height: "480px",
    display: "flex",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #5f2c82, #49a09d)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  form: {
    width: "100%",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  outlineBtn: {
    marginTop: "20px",
    padding: "12px 30px",
    background: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "25px",
    cursor: "pointer",
  },
  fillBtn: {
    padding: "12px",
    background: "#5f2c82",
    border: "none",
    color: "#fff",
    borderRadius: "25px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
