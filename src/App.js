import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { TasksPage } from "./pages/Tasks";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:id" element={<TasksPage />} />
    </Routes>
  );
};
