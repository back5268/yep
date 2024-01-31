import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home";
import { useEffect, useState } from "react";
import { getInfo } from "./lib/axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Binhchon from "./component/binhchon";
import Rank from "./component/rank";

function App() {
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [user, setUser] = useState({});
  const [config, setConfig] = useState({});
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInfo();
      if (response?.data) {
        if (response?.data?.checkUser) {
          setIsCheckIn(true);
          setUser(response?.data?.checkUser);
        }
        setConfig(response?.data?.config);
      }
    };

    fetchData();
  }, [render]);

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isCheckIn={isCheckIn}
                  setIsCheckIn={setIsCheckIn}
                  user={user}
                  setUser={setUser}
                  config={config}
                  setConfig={setConfig}
                />
              }
            />
            <Route
              path="/voteTeam"
              element={
                <Binhchon
                  isCheckIn={isCheckIn}
                  setIsCheckIn={setIsCheckIn}
                  user={user}
                  setUser={setUser}
                  setRender={setRender}
                />
              }
            />
            <Route
              path="/rank"
              element={
                <Rank
                  isCheckIn={isCheckIn}
                  setIsCheckIn={setIsCheckIn}
                  user={user}
                  setUser={setUser}
                  setRender={setRender}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
