import { useState } from "react";
import "./Home.css";
import LocationSearch from "../Location/LocationSearch";
import MapView from "../Maps/MapView";

function Home() {
  const [coords, setCoords] = useState(null);

  return (
    <div className="home">
      <h1>Service Finder</h1>
      <p>Find services by selecting your city or village</p>

      <LocationSearch setCoords={setCoords} />

      <MapView coords={coords} />
    </div>
  );
}

export default Home;

