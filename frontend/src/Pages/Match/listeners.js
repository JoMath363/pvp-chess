export const registerListeners = (socket, setBoard, setInfo, setPopUp) => {
  socket.on("match-full", () => {
    setPopUp("full");
  });

  socket.on("waiting-opponent-join", () => {
    setPopUp("waiting");
  })

  socket.on("match-joined", ({ color }) => {
    console.log("Joined as", color);
  });

  socket.on("opponent-joined", ({ color }) => {
    console.log("Opponent joined as", color);
  });
  
  socket.on("update-data", (data) => {
    setBoard(data.board);
    setInfo(data.info);
  });
}