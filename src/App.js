// import "./App.css";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "./Home/Home";
import Questions from "./Home/Questions";
import Tags from "./Home/Tags/Tags";
import Users from "./Home/Users";
import Header from "./Components/Header/Header";
import Auth from "./Home/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AUTH, SUBSCRIPTION } from "./Reducer/Reducer";
import ViewUser from "./Home/ViewUser/ViewUser";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import ViewQuestions from "./Home/ViewQuestions/ViewQuestions";
import { UserUrl } from "./UPI";
import ChatBot from "./Home/ChatBot/ChatBot";
import Subscription from "./Home/Subscription/Subscription";
import SocialMedia from "./Home/SocialMedia/SocialMedia";
import Overlay from "./UI/Overlay";

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState();
  const auth = useSelector((state) => state.auth);
  const questionAskedDate = auth.Data ? auth.Data.User.questionAskDate : "";

  useEffect(() => {
    if (window.location.href.includes("payment_intent")) {
      const GetSub = window.localStorage.getItem("Sub");
      const SubData = JSON.parse(GetSub);

      fetch(`${UserUrl}subscription/${auth.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SubscribedOn: new Date(),
          subscriptionType: SubData ? SubData.Title : "TITLE",
          Time: 24,
          questionLimit: SubData ? SubData.questionLimit : 5,
        }),
      }).then(async (data) => {
        const DATA = await data.json();

        if (DATA) {
          dispatch(SUBSCRIPTION.addSubscription(DATA));
          window.localStorage.removeItem("Sub");
        }
      });
    }

    const GetId = window.localStorage.getItem("id");
    const Gettoken = window.localStorage.getItem("token");
    const getUser = async () => {
      const response = await fetch(`${UserUrl}/${GetId}`);
      const Data = await response.json();
      if (GetId) {
        dispatch(
          AUTH.login({
            token: Gettoken,
            id: GetId,
            name: Data.User.name,
            Data: Data,
          })
        );
        dispatch(
          AUTH.updateProfile({
            name: Data.User.name,
            about: Data.User.about,
            tags: Data.User.tags,
            Data: Data,
          })
        );
        dispatch(
          SUBSCRIPTION.addSubscription({ data: Data.User.subscription })
        );
      }
    };

    getUser();
  }, [auth.id, dispatch]);


  useEffect(() => {
    const qdate = new Date(questionAskedDate);
    const qnewDate = qdate.setDate(qdate.getDate() + 1);
    const qdateString = new Date(qnewDate).toLocaleDateString();
    if (qdateString <= new Date().toLocaleDateString()) {
      const resetTime = async () => {
        await fetch(`${UserUrl}resetTimer/${auth.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionsPerDay: 0,
            questionAskDate: Date.now(),
          }),
        });
      };

      resetTime();
    }
  }, [auth.id, questionAskedDate]);

  return (
    <div>
      <Header search={search} setSearch={setSearch} />

      <main>

 
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/Questions" exact element={<Questions />} />
          <Route path="/Questions/:id" exact element={<ViewQuestions />} />
          <Route path="/Tags" exact element={<Tags />} />
          <Route
            path="/about"
            exact
            element={
              <Subscription
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            }
          />
          <Route
            path="/Users"
            exact
            element={<Users search={search} setSearch={setSearch} />}
          />
          <Route path="/Users/:id" exact element={<ViewUser />} />
          <Route path="/forteam" exact element={<SocialMedia />} />
          {auth.isLogin && <Route path="/askbot" exact element={<ChatBot />} />}
          {!auth.isLogin && <Route path="/Auth" exact element={<Auth />} />}
          {auth.isLogin && (
            <Route path="/AskQuestion" exact element={<AskQuestion />} />
          )}
        </Switch>

      </main>

    </div>
  );
}

export default App;
