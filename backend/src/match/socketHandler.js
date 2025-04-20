import MatchMannager from "./MatchMannager.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    const mannager = new MatchMannager(socket);

    socket.emit("start", mannager.getActiveBoard([6, 4]));
  }); 
};

export default socketHandler;