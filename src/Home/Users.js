import React, { Fragment, useEffect, useState } from "react";
// import Center from "../Components/Center/Center";
import SideBar from "../Components/SideBar/SideBar";
import "./Users.css";
import { TbFriendsOff, TbFriends } from "react-icons/tb";
import { UserUrl } from "../UPI";
import { AiFillDatabase } from "react-icons/ai";
import Backdrop from "../UI/Backdrop";
import Drawer from "../UI/Drawer";
import { useSelector } from "react-redux";

const Users = ({ search, setSearch }) => {
  const [list, setIsList] = useState();
  const [openDrawer, setOpenDrawer] = useState(true);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${UserUrl}/GetAllUsers`, { mode: "cors" });
      const Data = await response.json();
      const UsersList = Data.UsersList.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
      setIsList(UsersList);
    };

    getData();
  }, [search]);

  const RenderUsers = (list || []).map((d) => {
    const friendsList = auth.Data ? auth.Data.User.friends : [];

    const FriendListFilter = friendsList.filter((f) => f === d._id);
    const FilterTrue = FriendListFilter.map((m) => m === d._id);

    const AddFriends = async () => {
      await fetch(`${UserUrl}addfriends/${auth.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendsId: d._id,
        }),
      }).then(async (response) => {
        const data = await response.json();
        if (data) {
          window.location.reload();
        }
      });
    };
    const RemoveFriends = async () => {
      await fetch(`${UserUrl}removefriends/${auth.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendsId: d._id,
        }),
      }).then(async (response) => {
        const data = await response.json();
        if (data) {
          window.location.reload();
        }
      });
    };

    return (
      <Fragment key={d._id.toString()}>
        <div
          className="user-list"
          onClick={() => {
            window.location.href = `/#/Users/${d._id.toString()}`;
          }}
        >
          <div className="user-initial">{d.name.slice(0, 1)}</div>
          <h4>{d.name}</h4>
        </div>
        {d._id !== auth.id && auth.id && FilterTrue[0] && (
          <button className="user-list-rem-frnd" onClick={RemoveFriends}>
            <TbFriendsOff />
          </button>
        )}
        {d._id !== auth.id && auth.id && !FilterTrue[0] && (
          <button className="user-list-add-frnd" onClick={AddFriends}>
            <TbFriends />
          </button>
        )}
      </Fragment>
    );
  });

  return (
    <div className="Home">
      {!openDrawer && <Drawer selected="Users" />}
      {<SideBar selected="Users" />}
      <div className="user-container">
        {!openDrawer && (
          <Backdrop
            onClick={() => {
              setOpenDrawer(true);
            }}
          />
        )}
        <h1 className="user-h1">
          <AiFillDatabase
            size={30}
            className="sidebar_icon"
            onClick={() => {
              setOpenDrawer(false);
            }}
          />
          Users
        </h1>
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="User">{RenderUsers}</div>
      </div>
    </div>
  );
};

export default Users;
