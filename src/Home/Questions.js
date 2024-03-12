import React, { useEffect, useState } from "react";
import Center from "../Components/Center/Center";
import RightSideBar from "../Components/RightSideBar/RightSideBar";
import SideBar from "../Components/SideBar/SideBar";
import { QnsUrl } from "../UPI";
import { AiFillDatabase } from "react-icons/ai";
import Backdrop from "../UI/Backdrop";
import Drawer from "../UI/Drawer";

const Questions = () => {
  const [QnsList, setQnsList] = useState();
  const [openDrawer, setOpenDrawer] = useState(true);

  useEffect(() => {
    const getQns = async () => {
      const Response = await fetch(`${QnsUrl}/GetAllQuestions`);
      const Data = await Response.json();
      setQnsList(Data.questionList.reverse());
    };
    getQns();
  }, []);

  return (
    <div className="Home">
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

      {!openDrawer && <Drawer selected="Questions" />}
      {<SideBar selected="Questions" />}
      <Center Title={"All Questions"} QnsList={QnsList} />
      <RightSideBar />
    </div>
  );
};

export default Questions;
