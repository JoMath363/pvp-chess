import "./Match.css";
import Topbar from "../../Components/Topbar/Topbar";
import Board from "../../Components/Board/Board";
import InfoPanel from "../../Components/InfoPanel/InfoPanel";
import Chat from "../../Components/Chat/Chat";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { registerListeners } from "./listeners";
import { joinMatch, requestBoard } from "./emiters";

const socket = io("http://localhost:3000", {
  autoConnect: false
});

const infoTemplate = {
  currentTurn: "W",
  whiteCaptured: [],
  blackCaptured: [],
  moveHistory: [],
}

const Match = (props) => {
  const { matchId } = useParams();
  const [board, setBoard] = useState([]);
  const [info, setInfo] = useState(infoTemplate);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  
    registerListeners(socket, setBoard);
    joinMatch(socket, matchId);
    requestBoard(socket, matchId);
  }, []);

  return (
    <>
      <Topbar />
      <div className="match">
        <main className="match-main">
          <Board
            board={board}
            socket={socket}
          />
        </main>

        <aside className="match-aside">
          <InfoPanel {...info}/>
          <Chat />
        </aside>
      </div>
    </>

  )
};

export default Match;
