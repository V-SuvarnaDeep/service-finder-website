import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./ProviderList.css";

function ProviderList() {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const q = query(
          collection(db, "providers"),
          where("serviceType", "==", serviceType)
        );

        const snapshot = await getDocs(q);

        const providerList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProviders(providerList);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, [serviceType]);

  return (
    <div className="providers-page">
      <h2 className="providers-title">{serviceType} Providers</h2>

      {providers.length === 0 ? (
        <p className="no-data">No providers available</p>
      ) : (
        <div className="providers-list">
          {providers.map((provider) => (
            <div key={provider.id} className="provider-card">
              
              <img
                src={provider.imageUrl || "https://via.placeholder.com/120"}
                alt="shop"
                className="provider-image"
              />

              <div className="provider-info">
                <h3>{provider.name}</h3>

                <p><strong>📍</strong> {provider.address}</p>
                <p><strong>📞</strong> {provider.phone}</p>

                <div className="provider-actions">
                  <button
                    className="contact-btn"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    Contact
                  </button>

                  <button
                    className="map-btn"
                    onClick={() =>
                      navigate("/map", {
                        state: {
                          lat: provider.Latitude,
                          lng: provider.Longitude,
                        },
                      })
                    }
                  >
                    Find on Map
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* POPUP */}
      {selectedProvider && (
        <div className="popup">
          <div className="popup-box">

            <h3>{selectedProvider.name}</h3>

            <img
              src={selectedProvider.imageUrl || "https://via.placeholder.com/200"}
              alt="shop"
            />

            <p><strong>Phone:</strong> {selectedProvider.phone}</p>
            <p><strong>Address:</strong> {selectedProvider.address}</p>

            <div className="popup-actions">
              <a href={`tel:${selectedProvider.phone}`}>
                <button className="contact-btn">Call Now</button>
              </a>

              <button
                className="map-btn"
                onClick={() => setSelectedProvider(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ProviderList;