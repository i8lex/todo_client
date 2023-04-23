import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__link" to="/login">
            Login
          </Link>
          <Link className="header__link" to="/registration">
            Registration
          </Link>
          <Link className="header__link" to="/tasks">
            Tasks
          </Link>
        </div>
      </div>
    </header>
  );
};
