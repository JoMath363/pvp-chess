import MatchManager from "./MatchManager.js";

const matches = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected", socket.id);

    // Connection Events
    socket.on("join-match", (matchId) => {
      if (!matches[matchId]) matches[matchId] = {
        manager: new MatchManager(),
        players: {},
        chat: []
      };

      const players = matches[matchId].players;

      if (Object.values(players).includes(socket.id)) {
        return;
      }

      if (players["W"] && players["B"]) {
        socket.emit("match-full", matchId);
        return;
      }

      const color = players["W"] && !players["B"] ? "B" : "W";
      players[color] = socket.id;
      
      socket.join(matchId);
      socket.to(matchId).emit("opponent-joined");

      console.log(`${socket.id} joined match ${matchId} as ${color}`);

      socket.data.matchId = matchId;
      socket.data.color = color;
    });

    socket.on("disconnect", () => {
      const { matchId, color } = socket.data;

      if (!matchId || !color || !matches[matchId]) return;

      socket.to(matchId).emit("opponent-disconnected", { color });

      const players = matches[matchId].players;

      delete players[color];

      if (Object.keys(players).length === 0) {
        delete matches[matchId];
        console.log(`Match ${matchId} cleaned up`);
      }
    });

    // Match Events
    socket.on("start-match", () => {
      const { matchId } = socket.data;
      if (!matchId) return;

      const { manager, players, chat } = matches[matchId];

      if (manager.finalResult) {
        if (manager.finalResult == "draw") {
          io.to(matchId).emit("draw");
        } else {
          const { winner, loser } = manager.finalResult;

          io.to(players[winner]).emit("win");
          io.to(players[loser]).emit("lose");
        }
      };

      if (Object.keys(players).length < 2) {
        socket.emit("waiting-opponent");
      } else {
        io.to(players["W"]).emit("update-data", manager.getCurrentData("W"));
        io.to(players["B"]).emit("update-data", manager.getCurrentData("B"));
        io.to(matchId).emit("new-message", chat);
      }
    });

    socket.on("resign", () => {
      const { matchId, color } = socket.data;
      const { manager, players } = matches[matchId];

      const loser = color;
      const winner = color == "W" ? "B" : "W";

      manager.finalResult = { winner: winner, loser: loser };

      io.to(players[winner]).emit("win");
      io.to(players[loser]).emit("lose");
    });

    socket.on("offer-draw", () => {
      const { matchId } = socket.data;
      const { manager, players } = matches[matchId];

      if (manager.drawAvailable) {
        const opponent = socket.data.color == "W" ? "B" : "W";

        socket.emit("waiting-draw");
        socket.to(players[opponent]).emit("recieve-draw");
      }
    });

    socket.on("accept-draw", () => {
      const { matchId } = socket.data;
      const { manager } = matches[matchId];

      manager.finalResult = "draw";

      io.to(matchId).emit("draw");
    });

    socket.on("decline-draw", () => {
      const { matchId } = socket.data;
      const { manager, players } = matches[matchId];

      manager.drawAvailable = false;

      io.to(matchId).emit("decline-draw");

      io.to(players["W"]).emit("update-data", manager.getCurrentData("W"));
      io.to(players["B"]).emit("update-data", manager.getCurrentData("B"));
    });

    socket.on("select", (selected) => {
      const { matchId } = socket.data;
      const { manager, players } = matches[matchId];

      if (!manager.canMove(selected)) return;

      manager.selectTargetPiece(selected);

      io.to(players["W"]).emit("update-data", manager.getCurrentData("W"));
      io.to(players["B"]).emit("update-data", manager.getCurrentData("B"));
    });

    socket.on("move", (move) => {
      const { matchId } = socket.data;
      const { manager, players } = matches[matchId];

      manager.moveSelectedPiece(move);
      manager.updateHistory(move);

      const turnResult = manager.getTurnResult();

      if (turnResult == "mate") {
        const winner = manager.turn;
        const loser = winner == "W" ? "B" : "W";

        manager.finalResult = { winner: winner, loser: loser };

        io.to(players[winner]).emit("win");
        io.to(players[loser]).emit("lose");
      } else {
        manager.passPlayerTurn();

        if (turnResult == "check") {
          manager.selectPlayerKing();
        };
      }

      io.to(players["W"]).emit("update-data", manager.getCurrentData("W"));
      io.to(players["B"]).emit("update-data", manager.getCurrentData("B"));
    });

    // Chat Events
    socket.on("send-message", (content) => {
      const { matchId, color } = socket.data;
      const { chat } = matches[matchId];

      const newMessage = {
        color: color == "W" ? "White" : "Black",
        content: content
      };

      chat.push(newMessage);

      io.to(matchId).emit("new-message", chat);
    });
  });
};

export default socketHandler;