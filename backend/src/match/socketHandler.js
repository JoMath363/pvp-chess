import MatchManager from "./MatchManager.js";

const matchPlayers = {};
const matchManagers = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected", socket.id);

    socket.on("join-match", (matchId) => {
      if (!matchPlayers[matchId]) matchPlayers[matchId] = {};

      if (Object.values(matchPlayers[matchId]).includes(socket.id)) {
        return;
      }

      if (matchPlayers[matchId]["W"] && matchPlayers[matchId]["B"]) {
        socket.emit("match-full", matchId);
        return;
      }

      let color = "W";
      if (matchPlayers[matchId]["W"] && !matchPlayers[matchId]["B"]) {
        color = "B";
      } 

      socket.join(matchId);
      matchPlayers[matchId][color] = socket.id;

      if (!matchManagers[matchId]) {
        matchManagers[matchId] = new MatchManager();
      }

      socket.emit("match-joined", { matchId, color });
      socket.to(matchId).emit("opponent-joined", { color: color === "W" ? "W" : "B" });

      console.log(`${socket.id} joined match ${matchId} as ${color}`);

      socket.data.matchId = matchId;
      socket.data.color = color;
    });

    socket.on("disconnect", () => {
      const matchId = socket.data.matchId;
      const color = socket.data.color;

      if (!matchId || !matchPlayers[matchId]) return;

      console.log(`Client disconnected: ${socket.id} from match ${matchId}`);

      socket.to(matchId).emit("opponent-disconnected", { color });

      delete matchPlayers[matchId][color];

      if (Object.keys(matchPlayers[matchId]).length === 0) {
        delete matchPlayers[matchId];
        delete matchManagers[matchId];
        console.log(`Match ${matchId} cleaned up`);
      }
    });

    socket.on("request-board", () => {
      const manager = matchManagers[socket.data.matchId];
      const color = socket.data.color;
      
      const { whiteBoard, blackBoard } = manager.getBoards();
      
      if (color == "W") {
        socket.emit("update-board", whiteBoard);
      } else {
        socket.emit("update-board", blackBoard);
      }
    });

    socket.on("select", (selected) => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];
      
      const playerSelected = manager.getPosition(selected);
      manager.selected = playerSelected;

      const { whiteBoard, blackBoard } = manager.getBoards();

      io.to(matchPlayers[matchId]["W"]).emit("update-board", whiteBoard);
      io.to(matchPlayers[matchId]["B"]).emit("update-board", blackBoard);
    });

    socket.on("move", (move) => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];
      
      const playerMove = manager.getPosition(move);
      manager.moveSelectedPiece(playerMove);
      manager.passPlayerTurn();

      const { whiteBoard, blackBoard } = manager.getBoards();

      io.to(matchPlayers[matchId]["W"]).emit("update-board", whiteBoard);
      io.to(matchPlayers[matchId]["B"]).emit("update-board", blackBoard);
    });
  });
};

export default socketHandler;