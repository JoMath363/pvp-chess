import ChessBoard from "./ChessBoard.js";

class MatchMannager {
  constructor(socket) {
    this.board = new ChessBoard();
    this.turn = "W";
    this.socket = socket;
  }

  getDefaultBoard() {
    const board = this.board.get();

    return board.map((row) => 
      row.map((piece) => 
        piece ? (
          {...piece, state: piece.color == this.turn ? "deafult" : "blocked"}
        ) : (
          {state: "blocked"}
        )
      )
    );
  }

  getActiveBoard(selected) {
    let board = this.getDefaultBoard();
    let moves = this.board.getPieceMoves(selected);
    
    board.map(row => row.map(piece => piece.state = "blocked"));

    for (const [r, c] of moves) {
      board[r][c].state = "active";
    }

    return board;
  }
}

export default MatchMannager;