import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

function RegisterProvider() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validations
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!businessName || !serviceCategory) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // 1️⃣ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Save provider info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "provider",
        businessName,
        serviceCategory,
        isApproved: false, // For admin approval workflow
        createdAt: new Date(),
      });

      alert("🎉 Provider registered successfully!");
      navigate("/login"); // Redirect to login

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register as Service Provider</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Enter password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Service Category"
          value={serviceCategory}
          onChange={(e) => setServiceCategory(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Register</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <p style={{ marginTop: "15px" }}>
        Want to register as a normal user? <Link to="/register-user">Click here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2196f3",
    color: "#fff",
    cursor: "pointer",
  },
};

export default RegisterProvider;