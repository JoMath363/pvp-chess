import ChessBoard from "./ChessBoard.js";

class MatchManager {
  constructor() {
    this.board = new ChessBoard();
    this.turn = "W";
    this.selected = null;
  }

  getBoards() {
    const board = this.board.get();

    const outTurn = board.map(row =>
      row.map(piece => {
        if (piece) {
          return { ...piece, state: "blocked" };
        }
        return { state: "blocked" };
      })
    );

    const inTurn = outTurn.map(row =>
      row.map(piece => {
        if (piece.color && piece.color === this.turn) {
          return { ...piece, state: "default" };
        }
        return piece;
      })
    );

    if (this.selected) {
      const [row, col] = this.selected;
      const moves = this.board.getPieceMoves(this.selected);

      inTurn.map(row => row.map(piece => piece.state = "blocked"));

      inTurn[row][col].selected = "selected";

      for (const [r, c] of moves) {
        inTurn[r][c].state = "active";
      }
    }

    if (this.turn == "W") {
      return { whiteBoard: inTurn, blackBoard: outTurn.toReversed() };
    } else {
      return { whiteBoard: outTurn, blackBoard: inTurn.toReversed() };
    }
  }
  
  getPosition(position) {
    let pos;
    console.log(position);

    if (this.turn == "B") {
      pos = [7 - position[0], position[1]];
    } else {
      pos = position;
    }

    console.log(pos);
    return pos;
  }

  moveSelectedPiece(move) {
    const validMoves = this.board.getPieceMoves(this.selected);

    if (validMoves.some((valid) => valid[0] == move[0] && valid[1] == move[1])) {
      this.board.movePiece(this.selected, move);

      this.selected = null;
    } else {
      throw new Error("Invalid move.");
    }
  }

  passPlayerTurn() {
    if (this.turn == "W") {
      this.turn = "B";
    } else {
      this.turn = "W";
    }
  }
}

export default MatchManager;