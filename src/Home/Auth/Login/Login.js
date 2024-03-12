import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import { useSelector, useDispatch } from "react-redux";
import { AUTH } from "../../../Reducer/Reducer";
import { UserUrl } from "../../../UPI";

const Login = ({ setData, data, setForm, Form }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      fetch(`${UserUrl}/login`, {
        // mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.Email,
          password: data.password,
        }),
      }).then(async (data) => {
        const DATA = await data.json();
        if (DATA.title) {
          dispatch(
            AUTH.login({ token: DATA.token, id: DATA.id, name: "name" })
          );

          window.location.href = "/";
        }
        if (DATA.message) {
          console.log(DATA, "error");
          setIsError(DATA);
        }
      });
    } catch (error) {
      return Error(error.message);
    }
  };

  return (
    <div className="auth">
      <img src={icon} alt="icon" />
      <from className="login-form">
        <div>
          <b style={{ color: "red" }}>{isError.message}</b>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={(e) => {
              setData({ ...data, Email: e.target.value });
            }}
          />
        </div>
        <div>
          <label name="password">
            Password <b>forget password ?</b>{" "}
          </label>

          <input
            type="password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
        <button onClick={userLogin} type="submit">
          Login
        </button>
      </from>
      <footer>
        Don’t have an account?
        <div
          onClick={() => {
            setForm("Signup");
          }}
        >
          Sign up
        </div>
      </footer>
    </div>
  );
};

export default Login;
