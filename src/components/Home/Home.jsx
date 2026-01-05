import "./Home.css";
import LocationSearch from "../Location/LocationSearch";

function Home() {
  return (
    <div className="home">
      <h1>Service Finder</h1>
      <p>Find services by selecting your city or village</p>

      <LocationSearch />
    </div>
  );
}

export default Home;

