export const registerListeners = (socket, setBoard, setInfo, setPopUp) => {
  socket.on("update-data", (data) => {
    setBoard(data.board);
    setInfo(data.info);
  });

  socket.on("waiting-opponent", () => {
    setPopUp("waiting_opponent");
  });

  socket.on("opponent-joined", () => {
    setPopUp(null);
  });

  socket.on("match-full", () => {
    setPopUp("match_full");
  });
  
  socket.on("win", () => {
    setPopUp("win");
  });

  socket.on("lose", () => {
    setPopUp("lose");
  });

  socket.on("draw", () => {
    setPopUp("draw");
  });

  socket.on("waiting-draw", () => {
    setPopUp("waiting_draw");
  });

  socket.on("recieve-draw", () => {
    setPopUp("recieve_draw");
  });

  socket.on("decline-draw", () => {
    setPopUp(null);
  });
}