export const registerListeners = (socket, setBoard, setInfo, setPopUp) => {
  socket.on("match-full", () => {
    setPopUp("full");
  });

  socket.on("waiting-opponent-join", () => {
    setPopUp("waiting");
  })

  socket.on("opponent-joined", () => {
    setPopUp(null);
  });
  
  socket.on("update-data", (data) => {
    setBoard(data.board);
    setInfo(data.info);
  });
}