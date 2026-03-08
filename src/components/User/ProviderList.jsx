import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MapView from "../Maps/MapView";

function ProviderList() {

  const { serviceType } = useParams();

  const [providers, setProviders] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {

    const fetchProviders = async () => {

      try {

        const q = query(
          collection(db, "providers"),
          where("serviceType", "==", serviceType)
        );

        const snapshot = await getDocs(q);

        const providerList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProviders(providerList);

      } catch (error) {
        console.error("Error fetching providers:", error);
      }

    };

    fetchProviders();

  }, [serviceType]);

  return (

    <div style={containerStyle}>

      <h2 style={headingStyle}>
        {serviceType} Providers
      </h2>

      {providers.length === 0 ? (

        <p>No providers available</p>

      ) : (

        providers.map(provider => (

          <div key={provider.id} style={cardStyle}>

            <img
              src={provider.imageUrl || "https://via.placeholder.com/120"}
              alt="shop"
              style={imageStyle}
            />

            <div style={{ flex: 1 }}>

              <h3>{provider.name}</h3>

              <p>
                <strong>Address:</strong> {provider.address}
              </p>

              <p>
                <strong>Phone:</strong> {provider.phone}
              </p>

              <div style={{ marginTop: "10px" }}>

                <button
                  style={contactBtn}
                  onClick={() => setSelectedProvider(provider)}
                >
                  Contact
                </button>

                <button
                  style={mapBtn}
                  onClick={() =>
                    setSelectedPlace({
                      lat: provider.Latitude,
                      lng: provider.Longitude
                    })
                  }
                >
                  Find on Map
                </button>

              </div>

            </div>

          </div>

        ))

      )}

      {/* MAP SECTION */}

      {selectedPlace && (

        <div style={{ marginTop: "40px" }}>

          <h3>Provider Location</h3>

          <MapView place={selectedPlace} />

        </div>

      )}

      {/* CONTACT POPUP */}

      {selectedProvider && (

        <div style={popupStyle}>

          <div style={popupContent}>

            <h3>{selectedProvider.name}</h3>

            <img
              src={selectedProvider.imageUrl || "https://via.placeholder.com/200"}
              alt="shop"
              style={{ width: "200px", borderRadius: "10px" }}
            />

            <p>
              <strong>Phone:</strong> {selectedProvider.phone}
            </p>

            <p>
              <strong>Address:</strong> {selectedProvider.address}
            </p>

            <a href={`tel:${selectedProvider.phone}`}>
              <button style={contactBtn}>
                Call Now
              </button>
            </a>

            <button
              style={{ ...mapBtn, marginLeft: "10px" }}
              onClick={() => setSelectedProvider(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

const containerStyle = {
  padding: "40px",
  background: "#f4f6f9",
  minHeight: "100vh"
};

const headingStyle = {
  marginBottom: "30px"
};

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

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const popupContent = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center"
};

export default ProviderList;