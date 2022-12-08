import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import LoggedInLayout from "./components/LoggedInLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:username" element={<LoggedInLayout />} />
    </Routes>
  );
}
