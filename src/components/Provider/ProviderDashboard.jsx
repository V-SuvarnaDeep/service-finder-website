import React from "react";
import { useNavigate } from "react-router-dom";

function ProviderDashboard() {

  const navigate = useNavigate();

  return (
    <div style={container}>

      <h1>Provider Dashboard</h1>

      <p>Manage your services and profile</p>

      <div style={btnContainer}>

        <button
          style={btn}
          onClick={() => navigate("/add-service")}
        >
          Add Service
        </button>

        <button
          style={btn}
          onClick={() => navigate("/provider-profile")}
        >
          View Profile
        </button>

      </div>

    </div>
  );
}

const container = {
  padding: "40px",
  textAlign: "center"
};

const btnContainer = {
  marginTop: "30px"
};

const btn = {
  padding: "12px 20px",
  margin: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default ProviderDashboard;