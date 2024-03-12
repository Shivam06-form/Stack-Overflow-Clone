import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import searchsolid from "../../assets/search-solid.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../../Reducer/Reducer";
import Dropdown from "./Dropdown";
import Backdrop from "../../UI/Backdrop";

const Header = ({ search, setSearch }) => {
  const auth = useSelector((state) => state.auth);
  const [isDropDown, setIsDropDown] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="Header">
      <div className="Header-Inside">
        <img
          src={logo}
          alt="stack-overflow"
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <nav className="nav">
          <a href="/#/about">About</a>
          <a href="/">Products</a>
          <a href="/#/forteam">For Teams</a>
        </nav>
        <div className="input">
          <img src={searchsolid} alt="search" />
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>{" "}
        {auth.token && (
          <div
            className="Header-initial"
            onClick={() => {
              setIsDropDown(true);
            }}
          >
            <div>{auth.name.slice(0, 1)}</div>
          </div>
        )}
        {isDropDown && (
          <Dropdown setIsDropDown={setIsDropDown} isDropDown={isDropDown} />
        )}
        {auth.token && (
          <button
            className="header-button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(AUTH.logout());
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
        {!auth.token && (
          <button
            className="header-button"
            onClick={() => {
              window.location.href = "/#/Auth";
            }}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
