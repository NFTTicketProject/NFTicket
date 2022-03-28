import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import configStore from "../src/store/store";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

// redux 관련해서는 https://www.youtube.com/watch?v=QZcYz2NrDIs&t=193s 에서 알려주는대로 따라했습니다. (애플코딩의 redux 설명)

const { store, persistor } = configStore();

// const mushroom = 100;
// const mushroomName = "mushMom";
const mush = {
  num: 100,
  name: "mushMom",
};
var myWallet = "";

const mushReducer = (state = mush, action) => {
  if (action.type === "증가") {
    state.num++;
    return state.num;
  } else if (action.type === "감소") {
    state.num--;
    return state.num;
  } else if (action.type === "아빠") {
    state.name = "mushDad";
    return state.name;
  } else if (action.type === "엄마") {
    state.name = "mushMom";
    return state.name;
  } else {
    return state;
  }
};

function reducer(state = myWallet, action) {
  if (action.type === "로그인") {
    myWallet = action.data;
  }
}

// const store = createStore(mushroomCount);
// const store = createStore(mushReducer);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
