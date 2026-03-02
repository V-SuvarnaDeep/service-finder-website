import { useState } from "react";
import "./LocationSearch.css";

function LocationSearch({ setPlace }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const searchPlace = () => {
    if (!input.trim()) {
      setError("Enter a city or village name");
      return;
    }
    setPlace(input);
    setError("");
  };

  return (
    <div className="location-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city or village"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={searchPlace}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LocationSearch;

