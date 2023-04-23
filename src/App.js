import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Headers";
import { LoginPage } from "./pages/Login";
import { TasksPage } from "./pages/Tasks";
import { RegistrationPage } from "./pages/Registration";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </>
  );
};
