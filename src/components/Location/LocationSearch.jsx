import { useState } from "react";
import MapView from "../Maps/MapView";
import "./LocationSearch.css";

function LocationSearch() {
  const [place, setPlace] = useState("");
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");

  const searchPlace = async () => {
    if (!place) {
      setError("Please enter a city or village name");
      return;
    }

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyCsJVleLg7YwP7cBtpxTEhZI01KyRVItgk`
      );
      const data = await res.json();

      if (data.status === "OK") {
        setCoords(data.results[0].geometry.location);
        setError("");
      } else {
        setError("Location not found");
      }
    } catch {
      setError("Error fetching location");
    }
  };

  return (
    <div className="location-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city or village name"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={searchPlace}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {coords && <MapView location={coords} />}
    </div>
  );
}

export default LocationSearch;
