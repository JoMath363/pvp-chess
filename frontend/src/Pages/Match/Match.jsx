import "./Match.css";
import Topbar from "../../Components/Topbar/Topbar";
import Board from "../../Components/Board/Board";
import InfoPanel from "../../Components/InfoPanel/InfoPanel";
import Chat from "../../Components/Chat/Chat";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3000");

const Match = (props) => {
  const [board, setBoard] = useState([]);

  // Handle incoming board data
  socket.on("start", (boardData) => {
    setBoard(boardData);
  });

  return (
    <>
      <Topbar />
      <div className="match">
        <main className="match-main">
          <Board board={board} setBoard={setBoard} />
        </main>

        <aside className="match-aside">
          <InfoPanel />
          <Chat />
        </aside>
      </div>
    </>

  )
};

export default Match;
