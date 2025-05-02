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

      socket.to(matchId).emit("opponent-joined");

      console.log(`${socket.id} joined match ${matchId} as ${color}`);

      socket.data.matchId = matchId;
      socket.data.color = color;
    });

    socket.on("disconnect", () => {
      const matchId = socket.data.matchId;
      const color = socket.data.color;

      if (!matchId || !color || !matchPlayers[matchId]) return;

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

      if (!matchId) return;

      if (manager.finalResult) {
        if (manager.finalResult == "draw") {
          io.to(matchId).emit("draw");
        } else {
          const { winner, loser } = manager.finalResult;

          io.to(matchPlayers[matchId][winner]).emit("win");
          io.to(matchPlayers[matchId][loser]).emit("lose");
        }
      };

      if (Object.keys(matchPlayers[matchId]).length < 2) {
        socket.emit("waiting-opponent");
      } else {
        io.to(matchPlayers[matchId]["W"]).emit("update-data", manager.getCurrentData("W"));
        io.to(matchPlayers[matchId]["B"]).emit("update-data", manager.getCurrentData("B"));
      }
    });

    socket.on("resign", () => {
      const matchId = socket.data.matchId;
      const color = socket.data.color;
      const manager = matchManagers[matchId];

      const loser = color;
      const winner = color == "W" ? "B" : "W";

      manager.finalResult = { winner: winner, loser: loser };

      io.to(matchPlayers[matchId][winner]).emit("win");
      io.to(matchPlayers[matchId][loser]).emit("lose");
    });

    socket.on("offer-draw", () => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];

      if (manager.drawAvailable) {
        const opponent = socket.data.color == "W" ? "B" : "W";

        socket.emit("waiting-draw");
        socket.to(matchPlayers[matchId][opponent]).emit("recieve-draw");
      }
    });

    socket.on("accept-draw", () => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];

      manager.finalResult = "draw";

      io.to(matchId).emit("draw");
    });

    socket.on("decline-draw", () => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];

      manager.drawAvailable = false;

      io.to(matchId).emit("decline-draw");
      
      io.to(matchPlayers[matchId]["W"]).emit("update-data", manager.getCurrentData("W"));
      io.to(matchPlayers[matchId]["B"]).emit("update-data", manager.getCurrentData("B"));
    });

    socket.on("select", (selected) => {
      const matchId = socket.data.matchId;
      const manager = matchManagers[matchId];

      if (!manager.canMove(selected)) return;

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
        const winner = manager.getTurn();
        const loser = manager.getTurn() == "W" ? "B" : "W";

        manager.finalResult = { winner: winner, loser: loser };

        io.to(matchPlayers[matchId][winner]).emit("win");
        io.to(matchPlayers[matchId][loser]).emit("lose");
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