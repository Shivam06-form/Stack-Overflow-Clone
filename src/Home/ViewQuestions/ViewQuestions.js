import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import { useParams } from "react-router-dom";
import sortdown from "../../assets/sort-down.svg";
import updown from "../../assets/sort-up.svg";
import "./ViewQuestions.css";
import DisplayAnswer from "./DisplayAnswer";
import copy from "copy-to-clipboard";
import AnswerForm from "./AnswerForm";
import { useSelector } from "react-redux";
import { QnsUrl } from "../../UPI";

const ViewQuestions = () => {
  const User = useSelector((state) => state.auth);
  const [question, setQuestion] = useState();
  const { id } = useParams();

  const copyToClipboard = (copyText) => {
    copy(window.location.href);
    alert(`You have copied "${window.location.href}"`);
  };

  const Voting = async (vote) => {
    await fetch(`${QnsUrl}/Question/${vote}/${question._id.toString()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: User.id,
      }),
    });
  };

  useEffect(() => {
    const getQuestions = async () => {
      const responses = await fetch(`${QnsUrl}/Question/${id}`);
      const Data = await responses.json();
      setQuestion(Data.question);
    };
    getQuestions();
  }, [id, question]);

  const DeleteQuestion = async () => {
    await fetch(`${QnsUrl}/${question._id.toString()}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Answerid: id,
      }),
    });
    window.location.href = "/#/";
  };

  const currentDate = new Date();
  const userDate = new Date(question ? question.askedOn : "");

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
    <div className="view-questions">
      <SideBar selected={"Questions"} />
      <div className="view-questions-container">
        <h2>{question ? question.questionTitle : ""}</h2>
        <div>
          <div className="view-question-votes">
            <img
              src={updown}
              alt="down"
              width="25"
              onClick={() => {
                if (User.id) {
                  Voting("upvotes");
                }
              }}
            />
            <div className="questions-votes">
              {question ? question.upVote.length : ""}
            </div>
            <img src={sortdown} alt="down" width="25" />
          </div>
          <div className="question-body">
            <h4>{question ? question.questionBody : ""}</h4>
            <div className="view-questions-tags">
              {(question ? question.questionTags : []).map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="view-question-footer">
          <div className="view-question-footer__1">
            <div onClick={copyToClipboard}>Share</div>
            {(question ? question.userId : "") === User.id && (
              <div onClick={DeleteQuestion}>Delete</div>
            )}
          </div>
          <div className="view-question-footer__2">
            <b>
              Asked{" "}
              {(getTimeDifference * 100).toFixed() < 1
                ? "Few seconds"
                : timeStatus}{" "}
              ago
            </b>
            <div>
              <div className="view-question-footer--initial">
                {question ? question.userPosted.slice(0, 1) : ""}
              </div>
              <div className="view-question-footer--name">
                {question ? question.userPosted : ""}
              </div>
            </div>
          </div>
        </div>
        <h2>{question ? question.noOfAnswers : ""} Answers</h2>
        <DisplayAnswer question={question} copyToClipboard={copyToClipboard} />
        <AnswerForm question={question} />
      </div>

      <RightSideBar />
    </div>
  );
};

export default ViewQuestions;
