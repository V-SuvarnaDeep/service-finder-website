import { useState } from "react";
import "./Home.css";
import LocationSearch from "../Location/LocationSearch";
import MapView from "../Maps/MapView";

function Home() {
  const [place, setPlace] = useState("");

  // 📍 Get user's current location
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPlace(`${latitude},${longitude}`);
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="home">
      <h1>Service Finder</h1>
      <p>Select your city or village to view location on map</p>

      {/* Manual Search */}
      <LocationSearch setPlace={setPlace} />

      {/* Current Location Button */}
      <button
        onClick={useCurrentLocation}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        📍 Use My Current Location
      </button>

      {/* Map */}
      <MapView place={place} />
    </div>
  );
}

export default Home;
