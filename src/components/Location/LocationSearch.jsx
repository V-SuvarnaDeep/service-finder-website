import { useState } from "react";
import "./LocationSearch.css";

function LocationSearch({ setCoords }) {
  const [place, setPlace] = useState("");
  const [error, setError] = useState("");

  const searchPlace = async () => {
    if (place.trim().length < 3) {
      setError("Please enter a valid city or village name");
      return;
    }

    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(place)}&limit=1`
      );

      const data = await res.json();

      if (!data.features || data.features.length === 0) {
        setError("Location not found");
        return;
      }

      const [lng, lat] = data.features[0].geometry.coordinates;

      setCoords({ lat, lng });
      setError("");
    } catch (err) {
      console.error(err);
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
    </div>
  );
}

export default LocationSearch;
