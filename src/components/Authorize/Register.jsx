import { useState } from "react";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    serviceType: "",
    shopName: "",
    shopLocation: "",
    shopPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Role:", role);
    console.log("Form Data:", formData);

    // Later:
    // 1. Create auth user (email + password)
    // 2. Store data in database based on role
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* Role Selection */}
      <div className="role-select">
        <label>
          <input
            type="radio"
            value="user"
            checked={role === "user"}
            onChange={() => setRole("user")}
          />
          User
        </label>

        <label>
          <input
            type="radio"
            value="provider"
            checked={role === "provider"}
            onChange={() => setRole("provider")}
          />
          Service Provider
        </label>
      </div>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {/* SERVICE PROVIDER EXTRA FIELDS */}
        {role === "provider" && (
          <>
            <select name="serviceType" onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Medical">Medical Shop</option>
              <option value="Hospital">Hospital</option>
              <option value="Electrician">Electrician</option>
            </select>

            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="shopLocation"
              placeholder="Shop Location"
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="shopPhoto"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
