class MatchEvents {
  static selectPiece(socket, selected) {
    socket.emit("select", selected);
  }

  static movePiece(socket, move) {
    socket.emit("move", move);
  }
}

export default MatchEvents