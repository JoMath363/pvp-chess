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
      socket.to(matchId).emit("opponent-joined", { color: color === "W" ? "B" : "W" });

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

    socket.on("request-board", (matchId) => {
      const manager = matchManagers[matchId];
      const color = socket.data.color;

      socket.emit("update-board", manager.getDefaultBoard(color));
    });

    /* socket.on("select", (selected) => {
      mannager.selected = selected;

      socket.emit("update-board", mannager.getActiveBoard());
    });

    socket.on("move", (move) => {
      mannager.moveSelectedPiece(move);
      mannager.passPlayerTurn();

      socket.emit("update-board", mannager.getDefaultBoard());
    }); */
  });
};

export default socketHandler;