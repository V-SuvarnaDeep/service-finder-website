import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { getDistance } from "geolib";

/* ================= ROUTING (STABLE) ================= */

function Routing({ userPosition, providerPosition, setTravelTime }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!userPosition || !providerPosition) return;

    // ✅ Create only ONCE
    if (!routingRef.current) {
      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userPosition[0], userPosition[1]),
          L.latLng(providerPosition[0], providerPosition[1])
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: true,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }]
        },
        createMarker: () => null
      }).addTo(map);

      routingRef.current.on("routesfound", (e) => {
        const route = e.routes[0];
        setTravelTime(route.summary.totalTime / 60);
      });

    } else {
      // ✅ Only update waypoints (NO REMOVE = NO ERROR)
      routingRef.current.setWaypoints([
        L.latLng(userPosition[0], userPosition[1]),
        L.latLng(providerPosition[0], providerPosition[1])
      ]);
    }

  }, [map, userPosition, providerPosition, setTravelTime]);

  return null;
}

/* ================= MAIN PAGE ================= */

function MapPage() {

  const location = useLocation();
  const { lat, lng } = location.state || {};

  const providerPosition = lat && lng ? [lat, lng] : null;

  // ✅ FIXED LOCATION (no Hyderabad issue)
  const userPosition = [16.3505, 81.0442];

  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  useEffect(() => {
    if (providerPosition) {
      const dist =
        getDistance(
          { latitude: userPosition[0], longitude: userPosition[1] },
          { latitude: providerPosition[0], longitude: providerPosition[1] }
        ) / 1000;

      setDistance(dist);
    }
  }, [providerPosition]);

  const providerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35]
  });

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
    iconSize: [30, 30]
  });

  if (!providerPosition) {
    return <p>Loading map...</p>;
  }
return (
  <div style={styles.page}>

    <div style={styles.card}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📍 Service Provider Location</h2>
        <p style={styles.subtitle}>Live route and travel insights</p>
      </div>

      {/* INFO CARDS */}
      <div style={styles.infoContainer}>

        {distance && (
          <div style={styles.infoBox}>
            <p style={styles.infoLabel}>Distance</p>
            <p style={styles.infoValue}>{distance.toFixed(2)} km</p>
          </div>
        )}

        {travelTime && (
          <div style={styles.infoBox}>
            <p style={styles.infoLabel}>Estimated Time</p>
            <p style={styles.infoValue}>{travelTime.toFixed(1)} min</p>
          </div>
        )}

      </div>

      {/* MAP */}
      <div style={styles.mapWrapper}>
        <MapContainer
          center={userPosition}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={providerPosition} icon={providerIcon}>
            <Popup>Provider Location</Popup>
          </Marker>

          <Marker position={userPosition} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          <Routing
            userPosition={userPosition}
            providerPosition={providerPosition}
            setTravelTime={setTravelTime}
          />
        </MapContainer>
      </div>

    </div>
  </div>
);
}

export default MapPage;
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #d9e4f5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "1100px",
    background: "#fff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  },

  header: {
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600"
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#666",
    fontSize: "14px"
  },

  infoContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },

infoBox: {
  flex: 1,
  padding: "18px",
  borderRadius: "14px",
  textAlign: "center",

  background: "#f8fafc",

  border: "1px solid #e2e8f0",
  borderTop: "4px solid #3b82f6",  // 🔥 accent line

  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
},
infoLabel: {
  fontSize: "13px",
  color: "#64748b",
  fontWeight: "500"
},

 infoValue: {
  fontSize: "22px",
  fontWeight: "700",
  marginTop: "6px",
  color: "#0f172a"
},
  mapWrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #ddd"
  }
};
<div style={{ ...styles.infoBox, background: "linear-gradient(135deg, #6366f1, #3b82f6)" }}>
</div>
