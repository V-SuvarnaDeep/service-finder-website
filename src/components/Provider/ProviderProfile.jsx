import React from "react";

function ProviderProfile() {

  return (

    <div style={container}>

      <h2>Provider Profile</h2>

      <p>Name: Service Provider</p>
      <p>Phone: 9876543210</p>
      <p>Address: Your Shop Location</p>

    </div>

  );
}

const container = {
  padding: "40px",
  textAlign: "center"
};

export default ProviderProfile;