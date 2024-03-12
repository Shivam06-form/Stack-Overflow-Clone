import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import SideBar from "../../Components/SideBar/SideBar";
import "./ChatBot.css";

const ChatBot = () => {
  const [enteredText, setEnteredText] = useState("");
  const [renderChat, setRenderChat] = useState([]);

  const Ref = useRef(null);

  useEffect(() => {
    setRenderChat(renderChat);
  }, [enteredText, renderChat]);

  const RenderMsg = (E) => {
    E.preventDefault();

    renderChat.push({
      id: renderChat.length + 1,
      msg: enteredText,
      type: "person",
    });
    if (enteredText.toLowerCase().includes("hii")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: "Hello 👋. How may help you",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("hello")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: "Hello 👋. How may help you",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("react")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("css")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: `
          CSS (Cascading Style Sheets) allows you to create great-looking web
          pages, but how does it work under the hood? This article explains
          what CSS is with a simple syntax example and also covers some key
          terms about the language.`,
        link: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("html")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: `The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is frequently assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.`,
        link: "https://www.w3schools.com/html/html_intro.asp",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("react-native")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: "React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use the React framework along with native platform capabilities",
        link: "https://reactnative.dev/",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("java")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
        link: "https://www.java.com/en/download/help/whatis_java.html",
        type: "bot",
      });
    }
    if (enteredText.toLowerCase().includes("javascript")) {
      renderChat.push({
        id: renderChat.length + 1,
        msg: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries",
        link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript",
        type: "bot",
      });
    }

    setEnteredText("");
    console.log(Ref.current.scrollHeight);
    Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-bot">
      <SideBar selected="bot" />
      <div className="chat-bot-container">
        <h3>📃 Ask Bot 🤖</h3>
        <div className="chat-bot_2_Col">
          <div className="chat-bot-info">
            <h4>Use these keywords</h4>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>REACT</li>
              <li>REACT-NATIVE</li>
              <li>JAVA</li>
              <li>JAVASCRIPT</li>
            </ul>
          </div>
          <div className="chat-box-chats">
            <div className="chat-render" ref={Ref}>
              {renderChat.map((chat) => (
                <div
                  className={
                    chat.type === "person"
                      ? "entered-chat_person"
                      : "entered-chat_bot"
                  }
                  key={chat.id}
                >
                  {`${chat.msg} 
                  ${chat.type === "person" ? "🧑" : "🤖"}`}
                </div>
              ))}
            </div>
            <div className="chat-box-chats_inside">
              <input
                placeholder={renderChat.length === 0 ? `Type "Hii" 🤖` : ""}
                value={enteredText}
                onChange={(e) => {
                  e.preventDefault();
                  setEnteredText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    RenderMsg(e);
                  }
                }}
              />
              <FiSend
                color="blue"
                size="25"
                className="chat-bot-send_icon"
                onClick={RenderMsg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
