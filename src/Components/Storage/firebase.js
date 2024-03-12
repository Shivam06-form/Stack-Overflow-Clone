import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/messaging";

const config = {
  apiKey: "AIzaSyD30sjbBcIKP1RmFw04SWd1rFXKHLG6T-4",
  authDomain: "stack-overflow-demo.firebaseapp.com",
  projectId: "stack-overflow-demo",
  storageBucket: "stack-overflow-demo.appspot.com",
  messagingSenderId: "111214157384",
  appId: "1:111214157384:web:94d216d1ab37fe4049427d",
  measurementId: "G-HHM5DJ8WQT",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
