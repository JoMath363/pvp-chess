import "./Match.css";
import Topbar from "../../Components/Topbar/Topbar";
import Board from "../../Components/Board/Board";
import Panel from "../../Components/Panel/Panel";
import Chat from "../../Components/Chat/Chat";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { registerListeners } from "./listeners";
import { joinMatch, startMath } from "./emiters";
import PopUp from "../../Components/PopUp/PopUp";

const socket = io("http://localhost:3000", {
  autoConnect: false
});

const Match = (props) => {
  const { matchId } = useParams();
  const [popUp, setPopUp] = useState(null);
  const [board, setBoard] = useState([]);
  const [info, setInfo] = useState({
    playerColor: "W",
    currentTurn: "W",
    whiteCaptured: [],
    blackCaptured: [],
    moveHistory: []
  });

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    registerListeners(socket, setBoard, setInfo, setPopUp);

    joinMatch(socket, matchId);
    startMath(socket);
  }, []);

  return (
    <div className="match">
      <Topbar />
      {popUp ? <PopUp type={popUp} socket={socket} setPopUp={setPopUp} /> : null}
      <div className="match-container">
        <main className="match-main">
          <Board
            board={board}
            socket={socket}
          />
        </main>

        <aside className="match-aside">
          <Panel info={info} setPopUp={setPopUp} />
          <Chat />
        </aside>
      </div>
    </div>
  )
};

export default Match;
