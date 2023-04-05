import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/*<Route path="/:id" element={<Character />} />*/}
    </Routes>
  );
};
