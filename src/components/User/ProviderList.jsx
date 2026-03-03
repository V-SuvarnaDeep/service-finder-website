import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function ProviderList() {
  const { serviceType } = useParams();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const q = query(
        collection(db, "providers"),
        where("serviceType", "==", serviceType)
      );

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProviders(list);
    };

    fetchProviders();
  }, [serviceType]);

  return (
    <div style={{ padding: "40px", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "30px" }}>
        {serviceType} Providers
      </h2>

      {providers.length === 0 ? (
        <p>No providers available</p>
      ) : (
        providers.map(provider => (
          <div key={provider.id} style={cardStyle}>
            <img
              src={provider.imageUrl}
              alt="shop"
              style={imageStyle}
            />

            <div style={{ flex: 1 }}>
              <h3>{provider.name}</h3>
              <p><strong>Address:</strong> {provider.address}</p>
              <p><strong>Phone:</strong> {provider.phone}</p>

              <div style={{ marginTop: "10px" }}>
                <button style={contactBtn}>Contact</button>
                <button style={mapBtn}>Find on Map</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = {
  display: "flex",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  alignItems: "center"
};

const imageStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "10px",
  objectFit: "cover",
  marginRight: "20px"
};

const contactBtn = {
  padding: "8px 15px",
  marginRight: "10px",
  backgroundColor: "#28a745",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};

const mapBtn = {
  padding: "8px 15px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};

export default ProviderList;