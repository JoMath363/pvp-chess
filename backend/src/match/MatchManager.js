import ChessBoard from "./ChessBoard.js";

class MatchManager {
  constructor() {
    this.board = new ChessBoard();
    this.turn = "W";
    this.selected = null;
    this.history = [];
  }

  // Getters
  getCurrentData(color) {
    const { whiteBoard, blackBoard } = this.getBoards();
    const board = color == "W" ? whiteBoard : blackBoard;

    const { whiteCaptured, blackCaptured } = this.getCaptureds();
    const info = {
      playerColor: color,
      currentTurn: this.turn,
      whiteCaptured: whiteCaptured,
      blackCaptured: blackCaptured,
      moveHistory: this.history
    };

    return { board: board, info: info };
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

  getCaptureds() {
    const defaultPieces = { Q: 1, R: 2, B: 2, N: 2, P: 8 };
    const whitePieces = { Q: 0, R: 0, B: 0, N: 0, P: 0 };
    const blackPieces = { Q: 0, R: 0, B: 0, N: 0, P: 0 };
    const captureds = { whiteCaptured: [], blackCaptured: [] };

    for (const row of this.board.get()){
      for (const piece of row) {
        if (piece && piece.type != "K") {
          if (piece.color == "W") {
            whitePieces[piece.type] ++;
          } else {
            blackPieces[piece.type] ++;
          }
        }
      }
    }

    for (const type of Object.keys(defaultPieces)){
      const whiteMissing = defaultPieces[type] - whitePieces[type];
      const blackMissing = defaultPieces[type] - blackPieces[type];

      captureds.whiteCaptured.push(`${type}${blackMissing}`);
      captureds.blackCaptured.push(`${type}${whiteMissing}`);
    }

    return captureds;
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

  getTurn() {
    return this.turn;
  }

  getConvertedPosition(position) {
    if (this.turn == "B") {
      return [7 - position[0], position[1]];
    } else {
      return position;
    }
  }

  // Verifications
  canMove(position) {
    const convertedPos = this.getConvertedPosition(position);
    return this.board.getPieceMoves(convertedPos).length > 0;
  }

  // Actions
  moveSelectedPiece(move) {
    const validMoves = this.board.getPieceMoves(this.selected);
    const convertedMove = this.getConvertedPosition(move);
    const [mRow, mCol] = convertedMove;

    if (validMoves.some(([vRow, vCol]) => vRow == mRow && vCol == mCol)) {
      this.board.movePiece(this.selected, convertedMove);

      this.selected = null;
    } else {
      throw new Error("Invalid move.");
    }
  }

  updateHistory(move) {
    const [row, col] = this.getConvertedPosition(move);
    const { color, type } = this.board.get()[row][col];

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    const moveInfo = [color, type, `${letters[row]}${col + 1}`];

    const last = this.history.at(-1);
    if (last && last.length < 2) {
      last.push(moveInfo);
    } else {
      this.history.push([moveInfo]);
    }
  }

  selectPlayerKing() {
    this.selected = this.board.findPlayerKing(this.turn);
  }

  selectTargetPiece(target) {
    const convertedPos = this.getConvertedPosition(target);
    this.selected = convertedPos;
  }

  passPlayerTurn() {
    this.turn = this.turn == "W" ? "B" : "W";
  }
}

export default MatchManager;