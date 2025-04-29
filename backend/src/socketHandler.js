import MatchManager from "./MatchManager.js";

const matchPlayers = {};
const matchManagers = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected", socket.id);

    // Connection Events
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

    // Match Events
    socket.on("start-match", () => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];

      if (Object.keys(matchPlayers[matchId]).length < 2) {
        socket.emit("waiting-opponent-join", null);
      } else {
        io.to(matchPlayers[matchId]["W"]).emit("update-data", manager.getCurrentData("W"));
        io.to(matchPlayers[matchId]["B"]).emit("update-data", manager.getCurrentData("B"));
      }
    });

    socket.on("select", (selected) => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];
      
      if(!manager.canMove(selected)) return;

      manager.selectTargetPiece(selected);

      io.to(matchPlayers[matchId]["W"]).emit("update-data", manager.getCurrentData("W"));
      io.to(matchPlayers[matchId]["B"]).emit("update-data", manager.getCurrentData("B"));
    });

    socket.on("move", (move) => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];
  
      manager.moveSelectedPiece(move);
      manager.updateHistory(move);
      
      const turnResult = manager.getTurnResult();

      if (turnResult == "mate") {
        io.to(matchId).emit("win", manager.getTurn());
      } else {
        manager.passPlayerTurn();

        if (turnResult == "check") {
          manager.selectPlayerKing();
        };
      }

      io.to(matchPlayers[matchId]["W"]).emit("update-data", manager.getCurrentData("W"));
      io.to(matchPlayers[matchId]["B"]).emit("update-data", manager.getCurrentData("B"));
    });

    // Chat Events
  });
};

export default socketHandler;