import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import "./Auth.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const Auth = () => {
  const { auth } = useSelector((state) => state);

  const [data, setData] = useState({
    Email: "",
    password: "",
    name: "",
  });

  const [Form, setForm] = useState("Login");

  return (
    <Fragment>
      <div>
        {Form === "Login" && (
          <Login data={data} setData={setData} setForm={setForm} Form={Form} />
        )}
        {Form === "Signup" && (
          <Signup data={data} setData={setData} setForm={setForm} Form={Form} />
        )}
      </div>
    </Fragment>
  );
};

export default Auth;
