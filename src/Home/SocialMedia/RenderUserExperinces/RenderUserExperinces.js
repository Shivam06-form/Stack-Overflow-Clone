import React, { useEffect } from "react";
import "./RenderUserExperinces.css";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { SocialUrl, UserUrl } from "../../../UPI";
import copy from "copy-to-clipboard";

const RenderUserExperinces = ({ u }) => {
  const User = useSelector((state) => state.auth);

  const copyToClipboard = (copyText) => {
    copy(window.location.href);
    alert(`You have copied "${window.location.href}"`);
  };

  //

  const DisLike = async () => {
    await fetch(`${SocialUrl}dislike/${u._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: User.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const Data = await response.json();
      console.log(Data);
    });
  };
  const Like = async () => {
    await fetch(`${SocialUrl}like/${u._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: User.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const Data = await response.json();
      console.log(Data);
      console.log(u);
    });
  };

  const FilterDisLikes = u.dislike.filter((d) => d === User.id);

  const FilterLikes = u.like.filter((d) => d === User.id);

  return (
    <div className="User-Experinces">
      <div className="User-info" key={u.Name}>
        <div className="User-thumbnail">
          {u.thumbnail ? (
            <img src={u.thumbnail} alt="" />
          ) : (
            <div className="User-info-initial">{u.Name.slice(0, 1)}</div>
          )}
          <h3>{u.Name} </h3>
        </div>
        <div className="User-info-title">{u.title}</div>
        <div className="shared-user-info">
          <img src={u.image} alt="" hidden={!u.image} />
          <video controls hidden={!u.video}>
            <source src={u.video} />
          </video>
          {u.text && <h3>{u.text}</h3>}
        </div>
        <div className="User-button">
          <button onClick={Like}>
            <AiFillLike
              size={20}
              color={
                FilterLikes.map((d) => d === User.id)[0] === true ? "blue" : ""
              }
            />
            {u ? u.like.length : 0} Like
          </button>
          <button onClick={DisLike}>
            <AiFillDislike
              size={20}
              color={
                FilterDisLikes.map((d) => d === User.id)[0] === true
                  ? "blue"
                  : ""
              }
            />{" "}
            {u ? u.dislike.length : 0} disLike
          </button>
          <button
            onClick={() => {
              copyToClipboard();
            }}
          >
            <IoMdShareAlt size={20} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderUserExperinces;
