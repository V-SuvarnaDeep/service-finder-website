import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";
import bikeIcon from "../../assets/images/bike.png";
import carIcon from "../../assets/images/car.png";
import hospitalIcon from "../../assets/images/hospital.png";
import medicalIcon from "../../assets/images/medicalshop.png";
import heroImage from "../../assets/images/hero.png";


function UserHome() {
  const navigate = useNavigate();

  const services = [
  { name: "Bike Mechanic", icon: bikeIcon },
  { name: "Car Mechanic", icon: carIcon },
  { name: "Hospital", icon: hospitalIcon },
  { name: "Medical Shop", icon: medicalIcon }
];
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div
  className="hero"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  <div className="overlay">
    
  </div>
</div>

      {/* SERVICES SECTION */}
      <div className="services-section">

        <h2>Available Services</h2>

        <div className="service-grid">
  {services.map((service, index) => (
    <div
      key={index}
      className="service-card"
      onClick={() => navigate(`/providers/${service.name}`)}
    >
      <div className="image-box">
        <img src={service.icon} alt={service.name} />
      </div>
      <h3>{service.name}</h3>
    </div>
  ))}
</div>

      </div>

    </div>
  );
}

export default UserHome;