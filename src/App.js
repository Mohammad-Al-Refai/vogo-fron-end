import "./App.css";
import JoinPage from "./pages/join/join";
import { CreateVote } from "./pages/createVote/CreateVote";
import Vote from "./pages/vote/vote";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Result from "./pages/result/result";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SplashScreen } from "./pages/splashScreen/splashScreen";
function App(props) {
  const URL = "http://localhost:5000";
  const socket = io(URL);
  let [MainPage, setMainPage] = useState(<SplashScreen />);
  useEffect(() => {
    setTimeout(() => setMainPage(<JoinPage socket={socket} />), 5000);
    socket.on("result", (data) => {
      console.log(data);
    });
    socket.on("end_vote", (data) => {
      console.log(data);

      if (data.state === 200) {
      }
    });
  }, [socket]);
  return (
    <Router>
      <div className="App d-flex flex-column">
        <Switch>
          <Route path="/join">
            <JoinPage socket={socket} />
          </Route>
          <Route path="/create">
            <CreateVote socket={socket} />
          </Route>
          <Route path="/vote">
            {localStorage.getItem("code") !== undefined ? (
              <Vote socket={socket} />
            ) : (
              <JoinPage />
            )}
          </Route>
          <Route path="/live-result">
            {localStorage.getItem("code") !== undefined ? (
              <Result socket={socket} />
            ) : (
              <JoinPage />
            )}
          </Route>
          <Route path="/">{MainPage}</Route>
        </Switch>
       
      </div>
    </Router>
  );
}

function initApp(state) {
  return {
    code: state.user.code,
    isAdmin: state.user.isAdmin,
  };
}
export default connect(initApp)(App);
