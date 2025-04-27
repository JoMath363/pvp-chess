export const registerListeners = (socket, setBoard, setInfo) => {
  socket.on("match-full", () => {
    // Warning and then send back to home;
  });

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