import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import EditUser from "./EditUser";
import "./ViewUser.css";
import { BsFillPencilFill } from "react-icons/bs";
import { UserUrl } from "../../UPI";

const ViewUser = () => {
  const [currentUser, setCurrentUser] = useState();
  const [editUser, setEditUser] = useState();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  // useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${UserUrl}/${id}`);
      const Data = await response.json();
      setCurrentUser(Data.User);
    };
    getData();
  // }, [id, auth.Data]);

  const currentDate = new Date();
  const userDate = new Date(currentUser ? currentUser.joinedOn : "");
  const getDate = (currentDate - userDate) / (1000 * 3600 * 24);
  const userStatus = `🎂 Join ${getDate.toFixed()} ${
    getDate < 1 ? "day" : "day's"
  } ago`;

  return (
    <div className="ViewUser-container">
      <SideBar selected="Users" />
      <div className="ViewUser">
        <div style={{ width: "100%" }}>
          <div className="ViewUser-thumbnail">
            <div className="ViewUser-thumbnail-initial">
              {(currentUser ? currentUser.name : "").slice(0, 1)}
            </div>
            <div className="ViewUser__card">
              <div className="ViewUser-name">
                {currentUser ? currentUser.name : ""}
                {id === auth.id && (
                  <BsFillPencilFill
                    size={40}
                    color="darkgreen"
                    className="view-user_icon"
                    onClick={() => {
                      setEditUser(true);
                    }}
                  />
                )}
              </div>
              <div className="ViewUser-date">
                {getDate >= 0 ? userStatus : "🎂 Join Today"}
              </div>
            </div>
          </div>
          {!editUser && (
            <div>
              <h3>Tag Watched</h3>
              {(currentUser ? currentUser.tags : []).map((d) => (
                <h5 key={d}>{d}</h5>
              ))}
              <h3>About</h3>
              <h5>{currentUser ? currentUser.about : ""}</h5>
            </div>
          )}
          {editUser && (
            <EditUser currentUser={currentUser} setSwitch={setEditUser} />
          )}
        </div>

        {id === auth.id && (
          <button
            onClick={() => {
              setEditUser(true);
            }}
          >
            🖊 Edit Profiles
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
