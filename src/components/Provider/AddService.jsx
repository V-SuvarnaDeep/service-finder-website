import React, { useState } from "react";

function AddService() {

  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      serviceType,
      phone,
      address
    });

    alert("Service Added (Frontend Demo)");
  };

  return (

    <div style={container}>

      <h2>Add Your Service</h2>

      <form onSubmit={handleSubmit} style={form}>

        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Add Service</button>

      </form>

    </div>

  );
}

const container = {
  padding: "40px",
  textAlign: "center"
};

const form = {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  margin: "auto",
  gap: "10px"
};

export default AddService;