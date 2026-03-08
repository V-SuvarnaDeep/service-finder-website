import React from "react";

function MapView({ place }) {

  return (
    <iframe
      width="100%"
      height="500"
      src={`https://maps.google.com/maps?q=${place.lat},${place.lng}&z=15&output=embed`}
      title="map"
      style={{ border: 0 }}
    ></iframe>
  );

}

export default MapView;