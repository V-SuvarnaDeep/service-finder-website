import React from "react";

function IframeMap({ place }) {

  if (!place) return null;

  const mapSrc = `https://www.google.com/maps?q=${place.lat},${place.lng}&output=embed`;

  return (
    <div style={{ marginTop: "30px" }}>
      <iframe
        width="100%"
        height="450"
        src={mapSrc}
        title="Google Map"
        style={{ border: 0, borderRadius: "10px" }}
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default IframeMap;