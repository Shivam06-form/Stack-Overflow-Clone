import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogin: false,
  token: "",
  id: "",
  name: "",
  about: "",
  tags: [],
};

const authReducer = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action = { token: "", id: "", name: "" }) {
      const { token, id, name, Data } = action.payload;
      state.isLogin = true;
      state.token = token;
      state.id = id;
      state.name = name;
      state.Data = Data;
      localStorage.setItem("token", state.token);
      localStorage.setItem("id", state.id);
    },
    logout(state) {
      state.isLogin = false;
      state.token = "";
      state.id = "";
      state.name = "";

      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
    updateProfile(state, action = { name: "", about: "", tags: [], Data: {} }) {
      const { about, tags, name, Data } = action.payload;
      state.about = about;
      state.name = name;
      state.tags = tags;
      state.Data = Data;
    },
  },
});

const SubscriptionReducer = createSlice({
  name: "subscription",
  initialState: { subscription: {} },
  reducers: {
    addSubscription(state, action) {
      state.subscription = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    Subscription: SubscriptionReducer.reducer,
    auth: authReducer.reducer,
  },
});

export const AUTH = authReducer.actions;
export const SUBSCRIPTION = SubscriptionReducer.actions;

export default store;
