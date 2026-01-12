function MapView({ coords }) {
  if (!coords) return <p>Search a location to view map</p>;

  return (
    <iframe
      title="map"
      width="100%"
      height="400"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${
        coords.lng - 0.01
      }%2C${coords.lat - 0.01}%2C${coords.lng + 0.01}%2C${
        coords.lat + 0.01
      }&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
    />
  );
}

export default MapView;
