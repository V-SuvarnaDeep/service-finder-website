import { useState } from "react";
import "./Register.css";

function Register({ goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="signup-container">
      <h2>Register</h2>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <button>Register</button>

      <p className="switch-text">
        Already have an account? <span onClick={goLogin}>Login</span>
      </p>
    </div>
  );
}

export default Register;

