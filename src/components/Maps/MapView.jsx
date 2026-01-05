import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./MapView.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function MapView({ location }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCsJVleLg7YwP7cBtpxTEhZI01KyRVItgk",
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={14}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
}

export default MapView;

