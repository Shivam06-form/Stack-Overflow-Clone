import React from "react";
import ReactDOM from "react-dom";
import "./Backdrop.css";

const Backdrop = ({ style, onMouseEnter, onClick }) => {
  return ReactDOM.createPortal(
    <div
      className="backdrop"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={style}
    ></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
