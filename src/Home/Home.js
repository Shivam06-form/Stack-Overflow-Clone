import React, { useEffect, useState } from "react";
import "./Home.css";
import Center from "../Components/Center/Center";
import RightSideBar from "../Components/RightSideBar/RightSideBar";
import SideBar from "../Components/SideBar/SideBar";
import { QnsUrl } from "../UPI";
import Backdrop from "../UI/Backdrop";
import { AiFillDatabase } from "react-icons/ai";
import Drawer from "../UI/Drawer";
import Overlay from "../UI/Overlay";
// import { useSelector, useDispatch } from "react-redux";
// import DisplayAnswer from "./ViewQuestions/DisplayAnswer";

const Home = () => {
  const [QnsList, setQnsList] = useState();
  const [openDrawer, setOpenDrawer] = useState(true);

  useEffect(() => {
    const getQns = async () => {
      const Response = await fetch(`${QnsUrl}/GetAllQuestions`, {
        mode: "cors",
      });
      const Data = await Response.json();
      setQnsList(
        Data.questionList
          .splice(+Data.questionList.length - 10, +Data.questionList.length)
          .reverse()
      );
    };

    getQns();
  }, []);

  return (
    <div className="Home">
      <Overlay dropDown={!QnsList}><h1
        style={{ position: "fixed" }}
      >LOADING PLEASE WAIT...  </h1></Overlay>
      <AiFillDatabase
        size={30}
        className="sidebar_icon"
        onClick={() => {
          setOpenDrawer(false);
        }}
      />
      {!openDrawer && (
        <Backdrop
          onClick={() => {
            setOpenDrawer(true);
          }}
        />
      )}
      {!openDrawer && <Drawer selected="Home" />}
      {<SideBar selected="Home" />}
      <Center Title={"Top Questions"} QnsList={QnsList} />
      <RightSideBar />
    </div>
  );
};

export default Home;
