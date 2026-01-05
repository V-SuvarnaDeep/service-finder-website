import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Service Finder</h1>
      <p>
        Find nearby mechanics, hospitals, medical shops, and emergency services
        quickly and easily.
      </p>

      <div className="home-buttons">
        <button className="primary-btn">Find Services</button>
        <button className="secondary-btn">Emergency Help</button>
      </div>
    </div>
  );
}

export default Home;
