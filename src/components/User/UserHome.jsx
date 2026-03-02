import "./UserHome.css";

function UserHome({ goHome }) {
  return (
    <div className="user-home">
      <h2>Welcome User</h2>

      <div className="service-grid">
        <div className="service-card">Bike Mechanic</div>
        <div className="service-card">Car Mechanic</div>
        <div className="service-card">Medical Shop</div>
        <div className="service-card">Hospital</div>
      </div>

      <button className="map-btn" onClick={goHome}>
        Find on Map
      </button>
    </div>
  );
}

export default UserHome;

