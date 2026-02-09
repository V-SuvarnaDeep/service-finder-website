import "./MapView.css";

function MapView({ place }) {
  if (!place) return null;

  const mapUrl = `https://maps.google.com/maps?q=${place}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="map-wrapper">
      <iframe
        title="map"
        src={mapUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default MapView;
