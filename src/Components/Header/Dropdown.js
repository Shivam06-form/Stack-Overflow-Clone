import React from "react";
import "./Dropdown.css";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AUTH } from "../../Reducer/Reducer";
import Backdrop from "../../UI/Backdrop";

const Dropdown = ({ setIsDropDown, isDropDown }) => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown">
      {
        <Backdrop
          onClick={() => {
            setIsDropDown(false);
          }}
        />
      }
      <div className="dropdown-list">
        <a
          href="/"
          onClick={() => {
            setIsDropDown(false);
          }}
        >
          Home 🏡
        </a>

        <a
          href="/#/about"
          onClick={() => {
            setIsDropDown(false);
          }}
        >
          About
        </a>

        <a
          href="/"
          onClick={() => {
            setIsDropDown(false);
          }}
        >
          Products
        </a>

        <a
          href="/#/forteam"
          onClick={() => {
            setIsDropDown(false);
          }}
        >
          For Teams
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(AUTH.logout());
            window.location.href = "/";
          }}
        >
          LOGOUT <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
