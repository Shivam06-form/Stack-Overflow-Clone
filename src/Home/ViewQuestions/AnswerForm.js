import React, { useState } from "react";
import { useSelector } from "react-redux";
import { QnsUrl } from "../../UPI";
import "./DisplayAnswer";

const AnswerForm = (question) => {
  const User = useSelector((state) => state.auth);
  const [answer, setAnswer] = useState("");


  const Post = async () => {
    fetch(
      `${QnsUrl}/answer/${question ? question.question._id.toString() : ""}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerBody: answer,
          userAnswered: User.name,
          userId: User.id,
        }),
      }
    );

    setAnswer("");
  };

  return (
    <div className="answer-form">
      <h3>Your Answer</h3>
      <textarea
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      />
      {User.isLogin && <button onClick={Post} disabled={answer === ""}>
        POST YOUR ANSWER
      </button>}
    </div>
  );
};

export default AnswerForm;
