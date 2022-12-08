import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import LoggedInLayout from "./components/LoggedInLayout";
import WrongPage from "./components/WrongPage";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <Routes>
      <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} />} />
      <Route
        path="/:username"
        element={
          loggedIn ? (
            <LoggedInLayout setLoggedIn={setLoggedIn} />
          ) : (
            <WrongPage />
          )
        }
      />
    </Routes>
  );
}
