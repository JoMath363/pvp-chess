import "./Match.css";
import Header from "../../Components/Header/Header.jsx";
import Board from "../../Components/Board/Board.jsx";
import Panel from "../../Components/Panel/Panel.jsx";
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
  const [info, setInfo] = useState(null);
  const [board, setBoard] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    registerListeners(socket, setBoard, setInfo, setMessages, setPopUp);

    joinMatch(socket, matchId);
    startMath(socket);
  }, []);

  return (
    <div className="match">
      <Header />
      {popUp ? <PopUp type={popUp} socket={socket} setPopUp={setPopUp} /> : null}
      <div className="match-container">
        <main className="match-main">
          <Board board={board} socket={socket} />
        </main>

        <aside className="match-aside">
          {info ? <Panel info={info} messages={messages} socket={socket} setPopUp={setPopUp} /> : null}
        </aside>
      </div>
    </div>
  )
};

export default Match;
