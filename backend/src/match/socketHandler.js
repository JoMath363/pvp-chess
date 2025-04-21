import MatchMannager from "./MatchMannager.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected", socket.id);

    const mannager = new MatchMannager(socket);

    socket.emit("update-board", mannager.getDefaultBoard());

    socket.on("select", (selected) => {
      mannager.selected = selected;

      socket.emit("update-board", mannager.getActiveBoard());
    });

    socket.on("move", (move) => {
      mannager.moveSelectedPiece(move);
      mannager.passPlayerTurn();

      socket.emit("update-board", mannager.getDefaultBoard());
    });
  });
};

export default socketHandler;