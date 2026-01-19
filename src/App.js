import { useState } from "react";

import Login from "./components/Authorize/Login";
import Register from "./components/Authorize/Register";
import Home from "./components/Home/Home";
import UserHome from "./components/User/UserHome";

function App() {
  const [page, setPage] = useState("login");

  if (page === "login") {
    return <Login goRegister={() => setPage("register")} goUser={() => setPage("user")} />;
  }

  if (page === "register") {
    return <Register goLogin={() => setPage("login")} />;
  }

  if (page === "user") {
    return <UserHome goHome={() => setPage("home")} />;
  }

  if (page === "home") {
    return <Home />;
  }

  return null;
}

export default App;
