export const selectPiece = (socket, selected) => {
  socket.emit("select", selected);
}

export const movePiece = (socket, move) => {
  socket.emit("move", move);
}

export const joinMatch = (socket, matchId) => {
  socket.emit("join-match", matchId);
}

export const startMath = (socket, matchId) => {
  socket.emit("start-match", matchId);
}



    