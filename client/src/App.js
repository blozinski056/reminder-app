import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import LoggedInLayout from "./components/LoggedInLayout";
import WrongPage from "./components/WrongPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:username" element={<LoggedInLayout />} />
      <Route path="*" element={<Navigate to="/redirect" replace={true} />} />
      <Route path="/redirect" element={<WrongPage />} />
    </Routes>
  );
}
