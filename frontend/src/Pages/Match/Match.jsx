import "./Match.css";
import Board from "../../Components/Board/Board.jsx";
import Panel from "../../Components/Panel/Panel.jsx";
import PopUp from "../../Components/PopUp/PopUp";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { registerListeners } from "./listeners";
import { joinMatch, startMath } from "./emiters";
import { FaBars, FaChessQueen } from "react-icons/fa";

const socket = io("https://pvp-chess.vercel.app", {
  autoConnect: false
});

const Match = (props) => {
  const { matchId } = useParams();
  const [popUp, setPopUp] = useState("waiting_connection");
  const [info, setInfo] = useState(null);
  const [board, setBoard] = useState(null);
  const [messages, setMessages] = useState([]);

  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    registerListeners(socket, setBoard, setInfo, setMessages, setPopUp);

    joinMatch(socket, matchId);
    startMath(socket);
  }, [matchId]);

  return (
    <>
      {popUp ? <PopUp type={popUp} socket={socket} setPopUp={setPopUp} /> : null}

      <div className="header">
        <div className="header-logo">
          <FaChessQueen className="header-logo-icon" />
          <span>PVP Chess</span>
        </div>

        <button className="match-aside-mobile"
          onClick={() => setShowPanel(!showPanel)}>
          <FaBars />
        </button>
      </div>

      <div className="match">
        <main className="match-main">
          {board ? <Board board={board} socket={socket} /> : null}
        </main>

        <aside className={`match-aside ${showPanel ? "" : "invisible"}`}>
          {info ? <Panel info={info} messages={messages} socket={socket} setPopUp={setPopUp} /> : null}
        </aside>
      </div>
    </>
  )
};

export default Match;
