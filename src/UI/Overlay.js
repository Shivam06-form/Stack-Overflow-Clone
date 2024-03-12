import React from "react";
import "./Overlay.css";
import BackDrop from "../UI/Backdrop";
import Backdrop from "../UI/Backdrop";

const Overlay = ({ children, dropDown, setDropDown }) => {
  return (
    <div>
      {dropDown && (
        <Backdrop
          onClick={() => {
            setDropDown(false);
          }}
          //   style={{ background: "none" }}
        />
      )}
      {dropDown && <div className="overlay">{children}</div>}
    </div>
  );
};

export default Overlay;
