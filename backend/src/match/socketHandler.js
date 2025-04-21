import MatchManager from "./MatchManager.js";

const matchPlayers = {};
const matchManagers = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected", socket.id);

    socket.on("join-match", (matchId) => {
      const room = io.sockets.adapter.rooms.get(matchId);
      const numPlayers = room ? room.size : 0;

      if (numPlayers >= 2) {
        socket.emit("match-full", matchId);
        return;
      }

      socket.join(matchId);

      const color = numPlayers === 0 ? "W" : "B";

      if (!matchPlayers[matchId]) matchPlayers[matchId] = {};
      if (Object.values(matchPlayers[matchId]).some(id => id == socket.id)) {
        return;
      };

      matchPlayers[matchId][color] = socket.id;

      if (!matchManagers[matchId]) {
        matchManagers[matchId] = new MatchManager();
      }

      socket.emit("match-joined", { matchId, color });
      socket.to(matchId).emit("opponent-joined", { color: color == "W" ? "W" : "B" });

      console.log(`${socket.id} joined match ${matchId} as ${color}`);
    });

    socket.on("request-board", (matchId) => {
      const manager = matchManagers[matchId];
      const players = matchPlayers[matchId];
      const color = Object.keys(players).find(clr => players[clr] == socket.id);
      console.log(color);
      
      io.to(matchId).emit("update-board", manager.getDefaultBoard(color));
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