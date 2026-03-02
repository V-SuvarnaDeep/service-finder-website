import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Join Our Platform</h2>
      <p style={styles.subtitle}>Please choose how you want to register:</p>

      <div style={styles.cardContainer}>
        {/* User Card */}
        <div style={styles.card} onClick={() => navigate("/register-user")}>
          <h3>Register as User</h3>
          <p>Find and hire service providers easily.</p>
        </div>

        {/* Provider Card */}
        <div style={styles.card} onClick={() => navigate("/register-provider")}>
          <h3>Register as Service Provider</h3>
          <p>Offer your services and get clients.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    padding: "20px",
    background: "#f4f6f9"
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#555"
  },
  cardContainer: {
    display: "flex",
    gap: "30px",
    marginTop: "30px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  card: {
    background: "#fff",
    padding: "20px",
    width: "250px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(12, 46, 241, 0.1)",
    cursor: "pointer",
    transition: "0.3s",
    textAlign: "center"
  }
};

export default RegisterChoice;