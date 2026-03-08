import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { getDistance } from "geolib";

function Routing({ userPosition, providerPosition, setTravelTime }) {

  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {

    if (!userPosition || !providerPosition) return;

    if (!routingRef.current) {

      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userPosition[0], userPosition[1]),
          L.latLng(providerPosition[0], providerPosition[1])
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null
      }).addTo(map);

      routingRef.current.on("routesfound", (e) => {
        const route = e.routes[0];
        const minutes = route.summary.totalTime / 60;
        setTravelTime(minutes);
      });

    } else {

      routingRef.current.setWaypoints([
        L.latLng(userPosition[0], userPosition[1]),
        L.latLng(providerPosition[0], providerPosition[1])
      ]);

    }

  }, [map, userPosition, providerPosition, setTravelTime]);

  return null;
}

function MapPage() {

  const location = useLocation();
  const { lat, lng } = location.state || {};

  const providerPosition = lat && lng ? [lat, lng] : null;

  const [userPosition, setUserPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  useEffect(() => {

    const watchId = navigator.geolocation.watchPosition((pos) => {

      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;

      const newPosition = [userLat, userLng];
      setUserPosition(newPosition);

      if (providerPosition) {

        const dist =
          getDistance(
            { latitude: userLat, longitude: userLng },
            { latitude: providerPosition[0], longitude: providerPosition[1] }
          ) / 1000;

        setDistance(dist);

      }

    });

    return () => navigator.geolocation.clearWatch(watchId);

  }, [providerPosition]);

  const providerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35]
  });

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
    iconSize: [30, 30]
  });

  const container = {
    maxWidth: "1100px",
    margin: "40px auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
  };

  if (!providerPosition) {
    return <p>Loading map...</p>;
  }

  return (

    <div style={container}>

      <h2>Provider Location</h2>

      {distance && (
        <p><strong>Distance:</strong> {distance.toFixed(2)} km</p>
      )}

      {travelTime && (
        <p><strong>Estimated Travel Time:</strong> {travelTime.toFixed(1)} minutes</p>
      )}

      <MapContainer
        center={userPosition || providerPosition}
        zoom={14}
        style={{ height: "500px", width: "100%", borderRadius: "10px" }}
      >

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={providerPosition} icon={providerIcon}>
          <Popup>Provider Location</Popup>
        </Marker>

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Your Live Location</Popup>
          </Marker>
        )}

        {userPosition && (
          <Routing
            userPosition={userPosition}
            providerPosition={providerPosition}
            setTravelTime={setTravelTime}
          />
        )}

      </MapContainer>

    </div>
  );
}

export default MapPage;