import { useState } from "react";
import "./Login.css";

function Login({ goRegister, goUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={goUser}>Login</button>

      <p className="switch-text">
        Don’t have an account? <span onClick={goRegister}>Register</span>
      </p>
    </div>
  );
}

export default Login;

