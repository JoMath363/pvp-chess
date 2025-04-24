import ChessBoard from "./ChessBoard.js";

class MatchManager {
  constructor() {
    this.board = new ChessBoard();
    this.turn = "W";
    this.selected = null;
  }

  // Getters
  getTurn() {
    return this.turn;
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

    const inTurn = structuredClone(outTurn).map(row =>
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

      for (const [r, c] of moves) {
        inTurn[r][c].state = "active";
      }
      
      inTurn[row][col].state = "selected";
    }

    if (this.turn == "W") {
      return { whiteBoard: inTurn, blackBoard: outTurn.toReversed() };
    } else {
      return { whiteBoard: outTurn, blackBoard: inTurn.toReversed() };
    }
  }
  
  getConvertedPosition(position) {
    if (this.turn == "B") {
      return [7 - position[0], position[1]];
    } else {
      return position;
    }
  }

  getTurnResult() {
    const opponentColor = this.turn == "W" ? "B" : "W";
    console.log("oponent color", opponentColor);
    const [row, col] = this.board.findPlayerKing(opponentColor);

    if (this.board.verifyCheck(row, col, opponentColor)) {
      if (this.board.verifyCheckmate(row, col, opponentColor)) {
        return "mate";
      }
      return "check";
    }; 

    return "ongoing";
  }

  // Verifications
  canMove(position) {
    return this.board.getPieceMoves(position).length > 0;
  }

  // Actions
  moveSelectedPiece(move) {
    const validMoves = this.board.getPieceMoves(this.selected);

    if (validMoves.some((valid) => valid[0] == move[0] && valid[1] == move[1])) {
      this.board.movePiece(this.selected, move);

      this.selected = null;
    } else {
      throw new Error("Invalid move.");
    }
  }

  selectPlayerKing() {
    this.selected = this.board.findPlayerKing(this.turn);
  }

  selectTargetPiece(target) {
    this.selected = target;
  }

  passPlayerTurn() {
    this.turn = this.turn == "W" ? "B" : "W";
  }
}

export default MatchManager;