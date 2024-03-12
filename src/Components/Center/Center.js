import React, { useState } from "react";

import { useSelector } from "react-redux";
import "./Center.css";
import RenderQuestions from "../Questions/RenderQuestions";

const Center = ({ Title, QnsList }) => {
  const { auth } = useSelector((state) => state);
  const Subscription = useSelector((state) => state.Subscription);

  // console.log(Subscription.subscription.data);
  const AskQuestion = () => {
    if (auth.isLogin) {
      window.location.href = "/#/AskQuestion";
      console.log("ASK QUESTION");
    } else {
      window.location.href = "/#/auth";
    }
  };

  return (
    <div className="Center">
      <div className="Center-top">
        <h1>{Title}</h1>
        {Title !== "Users" &&
          Title !== "Tags" &&
          Subscription.subscription.data && (
            <button onClick={AskQuestion}>Ask Questions ❓</button>
          )}
        {!Subscription.subscription.data && (
          <button
            style={{ color: "greenyellow" }}
            onClick={() => {
              if (!auth.id) {
                window.location.href = "/#/Auth";
              }
            }}
          >
            Subscribe
          </button>
        )}
      </div>
      <RenderQuestions QnsList={QnsList} />
    </div>
  );
};

export default Center;
