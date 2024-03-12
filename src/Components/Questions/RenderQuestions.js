import React from "react";
import "./RenderQuestions.css";
import { useSelector } from "react-redux";

const RenderQuestions = ({ QnsList }) => {
  const auth = useSelector((state) => state.auth);
  const QuestionsList = (QnsList || []).map((q) => {
    const currentDate = new Date();
    const userDate = new Date(q ? q.askedOn : "");

    const getTimeDifference = (currentDate - userDate) / (1000 * 3600);

    console.log(getTimeDifference * 60)

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
      <div
        key={q._id.toString()}
        className="Question-List"
      // onClick={() => {
      //   console.log(q);
      // }}
      >
        <h4>
          <div style={{ fontSize: "20px" }}>
            {q.upVote.length !== 0 ? q.upVote.length : 0}
          </div>
          <div>VOTES</div>
        </h4>
        <h4>
          <div style={{ fontSize: "20px" }}>
            {q.noOfAnswers !== 0 ? q.noOfAnswers : 0}
          </div>
          <div>answers</div>
        </h4>
        <h5>
          <div
            onClick={() => {
              window.location.href = `/#/Questions/${q._id.toString()}`;
            }}
          >
            {q.questionTitle}
          </div>
          <div className="questions-tags">
            {q.questionTags.map((t) => (
              <div key={t}>{t}</div>
            ))}
          </div>
        </h5>
        <div className="ask-time">
          Ask{" "}
          {(getTimeDifference * 1000).toFixed() < 1
            ? "Few seconds"
            : timeStatus}{" "}
          ago {q.userPosted}
        </div>
      </div>
    );
  });

  return (
    <div className="Question">
      {!auth.isLogin && <div>
        <div>USE THIS </div>
        <h5>email : shivambhagwat06071998@gmail.com</h5>
        <h5>Password : 06@Shivam</h5>
      </div>}
      {QuestionsList}
      {(QnsList || []).length === 0 && <h4>No questions yet</h4>}
    </div>
  );
};

export default RenderQuestions;
