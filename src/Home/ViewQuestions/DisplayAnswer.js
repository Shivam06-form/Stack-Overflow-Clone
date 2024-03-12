import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { QnsUrl } from "../../UPI";
import "./DisplayAnswer.css";

const DisplayAnswer = ({ question, copyToClipboard }) => {
  const User = useSelector((state) => state.auth);
  const show = question ? question.answer : "";

  const deleteAnswer = async (id) => {
    await fetch(`${QnsUrl}/deleteAnswer/${question._id.toString()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Answerid: id,
      }),
    });
  };

  const RenderAnswers = (show || []).map((a) => {
    const currentDate = new Date();
    const userDate = new Date(a ? a.answeredOn : "");

    const getTimeDifference = (currentDate - userDate) / (1000 * 3600 * 1);

    const timeStatus =
      (getTimeDifference / 8760 >= 1 &&
        `${(getTimeDifference / 8760).toFixed()} ${(getTimeDifference / 8760).toFixed() > 1 ? "year's" : "year"
        }`)
      ||
      (getTimeDifference / 730 >= 1 &&
        `${(getTimeDifference / 730).toFixed()} ${(getTimeDifference / 730).toFixed() > 1 ? "month's" : "month"
        }`)
      ||

      (getTimeDifference / 24 >= 1 &&
        `${(getTimeDifference / 24).toFixed()} ${(getTimeDifference / 24).toFixed() > 1 ? "day's" : "day"
        }`)
      ||
      (getTimeDifference >= 1 &&
        `${(getTimeDifference).toFixed()} ${(getTimeDifference).toFixed() > 1 ? "hour's" : "hour"
        }`)
      ||

      (getTimeDifference * 60 >= 1 &&
        `${(getTimeDifference * 60).toFixed()} ${(getTimeDifference * 60).toFixed() > 1 ? "minutes's" : "minutes"
        }`)
      ||
      (getTimeDifference * 3600 >= 1 &&
        `${(getTimeDifference * 3600).toFixed()} ${(getTimeDifference * 3600).toFixed() > 1 ? "seconds's" : "second"
        }`)


    return (
      <div className="view-answer-container" key={a._id.toString()}>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "grey",
            marginTop: "10%",
          }}
        ></div>
        {/* <h2>{question ? question.noOfAnswers : ""} Answers</h2> */}
        <div>
          <div className="question-body">
            <h4>{a ? a.answerBody : ""}</h4>
          </div>
        </div>
        <div className="view-question-footer">
          <div className="view-question-footer__1 view-answer-footer__1">
            <div onClick={copyToClipboard}>Share</div>
            {a.userId === User.id && (
              <div
                onClick={() => {
                  deleteAnswer(a._id.toString());
                }}
              >
                Delete
              </div>
            )}
          </div>

          <div className="view-question-footer__2">
            <b>
              Answered{" "}
              {(getTimeDifference * 100).toFixed() < 1
                ? "Few seconds"
                : timeStatus}{" "}
              ago
            </b>
            <div>
              <div className="view-question-footer--initial">
                {a ? a.userAnswered.slice(0, 1) : ""}
              </div>
              <div className="view-question-footer--name">
                {a ? a.userAnswered : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <Fragment>{show.length !== 0 && RenderAnswers}</Fragment>;
};

export default DisplayAnswer;
