import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { QnsUrl } from "../../UPI";
import "./AskQuestion.css";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const User = useSelector((state) => state.auth);
  const Subscription = useSelector((state) => state.Subscription);


  console.log(Subscription.subscription.data.questionLimit, User.Data.User.questionsPerDay)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${QnsUrl}/Askquestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionTitle: questionTitle,
        questionBody: questionBody,
        questionTags: questionTags,
        userPosted: User.name,
        askedOn: "1",
        userId: User.id,
      }),
    });

    window.location.href = "/";
  };


  console.log()
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              />
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          {+User.Data.User.questionsPerDay !==
            +Subscription.subscription.data.questionLimit && (
              <input
                type="submit"
                value="Reivew your question"
                className="review-btn"
              />
            )}
          {+ User.Data.User.questionsPerDay ===
            +Subscription.subscription.data.questionLimit && (
              <summary>You can ask Question after 24 hours</summary>
            )}
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
