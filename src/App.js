import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Authorize/Login";
import RegisterChoice from"./components/Authorize/RegisterChoice";
import RegisterUser from "./components/Authorize/RegisterUser";
import RegisterProvider from "./components/Authorize/RegisterProvider";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterChoice />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-provider" element={<RegisterProvider />} />

        {/* After login (optional) */}
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
