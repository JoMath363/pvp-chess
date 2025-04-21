import "./Match.css";
import Topbar from "../../Components/Topbar/Topbar";
import Board from "../../Components/Board/Board";
import InfoPanel from "../../Components/InfoPanel/InfoPanel";
import Chat from "../../Components/Chat/Chat";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:3000", {
  autoConnect: false
});

const Match = (props) => {
  const { matchId } = useParams();
  const [board, setBoard] = useState([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  
    socket.emit("join-match", matchId);

    socket.emit("request-board", matchId);

    socket.on("match-full", () => {
      // Warning and then send back to home;
    });
  
    socket.on("match-joined", ({ color }) => {
      console.log("Joined as", color);
    });
  
    socket.on("opponent-joined", ({ color }) => {
      console.log("Opponent joined as", color);
    });
  
    return () => {
      socket.off("match-joined");
      socket.off("opponent-joined");
    };
  }, []);

  socket.on("update-board", (boardData) => {
    setBoard(boardData);
  });

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
          <InfoPanel />
          <Chat />
        </aside>
      </div>
    </>

  )
};

export default Match;
