import React from "react";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const navigate = useNavigate();

  const services = [
    "Bike Mechanic",
    "Car Mechanic",
    "Hospital"
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select a Service</h2>

      <div style={styles.grid}>
        {services.map((service, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(`/providers/${service}`)}
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px",
    textAlign: "center"
  },
  title: {
    marginBottom: "30px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "0.3s"
  }
};
