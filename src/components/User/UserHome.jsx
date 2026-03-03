import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";

function UserHome() {
  const navigate = useNavigate();

  const services = [
    { name: "Bike Mechanic", icon: "🔧" },
    { name: "Car Mechanic", icon: "🚗" },
    { name: "Hospital", icon: "🏥" },
    { name: "Medical Shop", icon: "💊" }
  ];

  return (
    <div className="home-container">
      <div className="overlay"></div>

      <div className="home-content">
        <h1 className="home-title">Welcome</h1>
        <p className="home-subtitle">Choose the service you need</p>

        <div className="service-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              onClick={() => navigate(`/providers/${service.name}`)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;