import React from "react";
import "./RightSideBar.css";
import Widget from "./Widegt";
import WidgetTags from "./WidgetTags";

const RightSideBar = () => {
  return (
    <div className="right">
      <div className="right-inside ">
        <Widget />
        <WidgetTags />
      </div>
    </div>
  );
};

export default RightSideBar;
