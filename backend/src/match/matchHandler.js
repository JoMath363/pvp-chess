import ChessBoard from "./ChessBoard.js";
import io from "../../index.js";

const matchHandler = () => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);
  });  
};

export default matchHandler;