import ChessBoard from "./ChessBoard.js";

class MatchMannager {
  constructor(socket) {
    this.board = new ChessBoard();
    this.turn = "W";
    this.selected = null;
    this.socket = socket;
  }

  getDefaultBoard() {
    const board = this.board.get();

    return board.map((row) => 
      row.map((piece) => 
        piece ? (
          {...piece, state: piece.color == this.turn ? "default" : "blocked"}
        ) : (
          {state: "blocked"}
        )
      )
    );
  }

  getActiveBoard() {
    let [row, col] = this.selected;
    let board = this.getDefaultBoard();
    let moves = this.board.getPieceMoves(this.selected);
    
    board.map(row => row.map(piece => piece.state = "blocked"));

    for (const [r, c] of moves) {
      board[r][c].state = "active";
    }

    board[row][col].state = "selected";

    return board;
  }

  moveSelectedPiece(move) {
    const validMoves = this.board.getPieceMoves(this.selected);

    if (validMoves.some((valid) => valid[0] == move[0] && valid[1] == move[1])){
      this.board.movePiece(this.selected, move);

      this.selected = null;
    } else {
      throw new Error("Invalid move.");
    }
  }

  passPlayerTurn(){
    if (this.turn == "W") {
      this.turn = "B";
    } else {
      this.turn = "W";
    }
  }
}

export default MatchMannager;