import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SUBSCRIPTION } from "../../Reducer/Reducer";
import Backdrop from "../../UI/Backdrop";
import Overlay from "../../UI/Overlay";
import { UserUrl } from "../../UPI";
import Payment from "../Payemts/payment";
import "./Subscription.css";

const SubscriptionList = [
  {
    id: 1,
    Title: "Free Plan",
    about: "User post 1 questions a day",
    price: 0,
    color: "brown",
    questionLimit: 1,
  },
  {
    id: 2,
    Title: "Silver Plan",
    about: "User post 5 questions a day",
    price: 100,
    color: "silver",
    questionLimit: 5,
  },
  {
    id: 3,
    Title: "Gold Plan",
    about: "User can post unlimited questions",
    price: 1000,
    color: "gold",
    questionLimit: null,
  },
];

const Subscription = ({ selectedPlan, setSelectedPlan }) => {
  const [openSubscription, setOpenSubscription] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState();
  const Subscription = useSelector((state) => state.Subscription);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getSubscription = async (e) => {
    if (selectedPlan.Title === "Free Plan") {
      await fetch(`${UserUrl}subscription/${auth.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SubscribedOn: new Date(),
          subscriptionType: e.Title,
          Time: 24,
          questionLimit: e.questionLimit,
        }),
      }).then(async (data) => {
        const DATA = await data.json();

        if (DATA) {
          dispatch(SUBSCRIPTION.addSubscription(DATA));
        }
      });
    }
    window.localStorage.setItem("Sub", JSON.stringify(selectedPlan));
    if (+e.price !== 0) {
      setOpenSubscription(true);
    }
  };

  const RenderSubscriptions = SubscriptionList.map((s) => (
    <div key={s.id} className="sub-list">
      <h3 style={{ color: s.color }}>{s.Title}</h3>
      <h4>₹{s.price}</h4>
      <summary>{s.about}</summary>

      {auth.isLogin && <button
        onClick={() => {
          getSubscription(s);
          setSelectedPlan(s);
        }}
        disabled={
          Subscription.subscription.data
            ? Subscription.subscription.data.subscriptionType === s.Title
            : false
        }
      >
        {(Subscription.subscription.data || []).subscriptionType === s.Title
          ? "Subscribed"
          : "Subscribe"}
      </button>}
      {!auth.isLogin && <button
        onClick={() => {
          window.location.href = '/#/Auth'
        }}
        style={{ color: "grey" }}
      >Login First to Subscribe</button>}
    </div>
  ));

  return (
    <div className="Sub">
      <Overlay setDropDown={setOpenSubscription} dropDown={openSubscription}>
        <Payment
          id={selectedPlan ? selectedPlan.id : ""}
          amount={selectedPlan ? +selectedPlan.price : ""}
          selectedPlan={selectedPlan}
        />
      </Overlay>
      <h4>
        A stack overflow is a runtime error that happens when a program runs out
        of memory in the call stack. The stack overflow generally signals a
        problem in resource provisioning and has to be fixed in order to allow
        the program to run and use memory properly.
      </h4>
      <h2>Subscriptions</h2>
      <div className="sub-list-container">{RenderSubscriptions}</div>
    </div>
  );
};

export default Subscription;
