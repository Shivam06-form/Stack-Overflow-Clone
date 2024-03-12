import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import "./SideBar.css";

const SideBar = ({ selected }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <div className="sidebar-list__1">
        <Link to="/" className={selected === "Home" ? "selected" : ""}>
          Home 🏡
        </Link>
        <h6>PUBLIC 📢</h6>
      </div>
      <div className="sidebar-list__2">
        <Link
          to="/Questions"
          className={`${selected === "Questions" ? "selected" : ""} globe`}
        >
          <img src={Globe} alt="Globe" />
          Questions ❓
        </Link>
        <div className="sidebar-list__2-inside">
          <Link to="/Tags" className={selected === "Tags" ? "selected" : ""}>
            Tags 📑
          </Link>

          <Link to="/Users" className={selected === "Users" ? "selected" : ""}>
            Users 👤
          </Link>
        </div>
        {auth.isLogin && (
          <Link to="/askbot" className={selected === "bot" ? "selected" : ""}>
            Ask Bot 🤖
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
