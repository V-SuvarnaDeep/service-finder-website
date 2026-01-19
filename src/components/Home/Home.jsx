import { useState } from "react";
import "./Home.css";
import LocationSearch from "../Location/LocationSearch";
import MapView from "../Maps/MapView";

function Home() {
  const [place, setPlace] = useState("");

  return (
    <div className="home">
      <h1>Service Finder</h1>
      <p>Select your city or village to view location on map</p>

      <LocationSearch setPlace={setPlace} />
      <MapView place={place} />
    </div>
  );
}

export default Home;


