import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";
import { AUTH } from "../../../Reducer/Reducer";
import { UserUrl } from "../../../UPI";
import "./Signup.css";

const Signup = ({ setData, data, setForm, Form }) => {
  const form = useRef();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState("");
  const [isOtp, setIsOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [getData, setGetData] = useState({});

  let templateParams;



  const sendEmail = (e) => {
    templateParams = {
      name: Math.round(Math.random() * 65446),
      message: "Use this to continue signing up",
      email: data.Email,
    };
    e.preventDefault();

    emailjs.send(
      "service_gip2ebq",
      "template_53l2fio",
      templateParams,
      "user_b60pA2LDKeNX3UyCEE4q8"
    );

    setGetData(templateParams);
    setSendOtp(true);
  };

  const userSignUp = async () => {
    if (getData.name === +isOtp) {
      fetch(`${UserUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
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
    }
  };

  return (
    <div className="signup">
      <div className="signup-info">
        <h2>Join the Stack Overflow community</h2>
        <text>Get unstuck — ask a question</text>
        <text>Unlock new privileges like voting and commenting</text>
        <text>Save your favorite tags, filters, and jobs</text>
        <text>Earn reputation and badges</text>
        <summary className="terms">
          Collaborate and share knowledge with a private group for
        </summary>
        <b>Get Stack Overflow for Teams free for up to 50 users.</b>
      </div>
      <div className="signup-form-container">
        <from className="login-form signup-form-card" ref={form}>
          <div>
            <b style={{ color: "red" }}>{isError.message}</b>
            <label>Display Name</label>
            <input
              name="name"
              type="user_name"
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              disabled={sendOtp}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              label="please enter valid email id 📧"
              name="email"
              type="email"
              onChange={(e) => {
                setData({ ...data, Email: e.target.value });
              }}
              disabled={sendOtp}
            />
          </div>
          <div>
            <label name="password">Password</label>
            <input
              type="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              disabled={sendOtp}
            />
            {sendOtp && <label name="otp">Enter Otp</label>}
            <input
              type="otp"
              value={isOtp}
              onChange={(e) => {
                setIsOtp(e.target.value.trim());
              }}
              hidden={!sendOtp}
            />
            {+data.password.length <= 8 && <p
              style={{ color: "red" }}
            >Passwords must contain at least eight characters</p>}
            {!sendOtp && <button
              disabled={+data.password.length === 8}
              onClick={sendEmail}>SEND OTP</button>}
          </div>
          <p className="summery">
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </p>

          {getData.name === +isOtp && (
            <button onClick={userSignUp} type="submit">
              Sign up
            </button>
          )}

          <summery className="terms">
            By clicking “Sign up”, you agree to our
            <b> terms of service privacy policy</b>and <b>cookie policy</b>
          </summery>
        </from>
        <footer className="signup-footer">
          Already have an account?
          <div
            to="/"
            onClick={() => {
              setForm("Login");
            }}
          >
            Login
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
