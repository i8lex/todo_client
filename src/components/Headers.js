import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../providers/redux/auth/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          {isAuthenticated ? (
            <>
              <Link className="header__link" to="/tasks">
                Tasks
              </Link>
              <button className="header__logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="header__link" to="/registration">
                Registration
              </Link>
              <Link className="header__link" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
