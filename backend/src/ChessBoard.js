class ChessBoard {
  constructor() {
    const board = [
      ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
      ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
      ["",    "",   "",   "",   "",   "",   "",   ""],
      ["",    "",   "",   "",   "",   "",   "",   ""],
      ["",    "",   "",   "",   "",   "",   "",   ""],
      ["",    "",   "",   "",  "",   "",   "",   ""],
      ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
      ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"] 
    ];

    /* const board = [
      ["", "", "", "", "", "BR", "BK", ""],
      ["BP", "WQ", "BP", "", "BQ", "", "BP", "BP"],
      ["", "", "WB", "", "BP", "", "", ""],
      ["", "", "", "", "WP", "", "BP", ""],
      ["WP", "", "BP", "", "", "WP", "", ""],
      ["WN", "", "WP", "", "", "WR", "", "WK"],
      ["WP", "", "", "", "", "", "", ""],
      ["WR", "", "", "", "", "BN", "BR", ""]
    ]; */

    this.board = board.map((row) =>
      row.map((piece) =>
        piece != "" ? { color: piece[0], type: piece[1] } : null
      ));
  }

  // Getters
  get() {
    return this.board;
  }

  getPieceMoves(target) {
    const [row, col] = target;
    const { type, color } = this.board[row][col];

    switch (type) {
    case "P": return this.getPawnMoves(row, col, color, this.board);
    case "N": return this.getKnightMoves(row, col, color, this.board);
    case "B": return this.getBishopMoves(row, col, color, this.board);
    case "R": return this.getRookMoves(row, col, color, this.board);
    case "Q": return this.getQueenMoves(row, col, color, this.board);
    case "K": return this.getKingMoves(row, col, color, this.board);
    default: throw new Error("Cannot get moves from non existent piece type");
    }
  }

  // Events
  movePiece(target, move) {
    const [tRow, tCol] = target;
    const [mRow, mCol] = move;

    const piece = this.board[tRow][tCol];
    this.board[mRow][mCol] = piece;
    this.board[tRow][tCol] = null;
  }

  // Verifications
  verifyCheckmate(row, col, color) {
    return this.getKingMoves(row, col, color).length == 0;
  }

  verifyCheck(row, col, color, board) {
    const bishopMoves = this.getBishopMoves(row, col, color, board);
    const rookMoves = this.getRookMoves(row, col, color, board);
    const knightMoves = this.getKnightMoves(row, col, color, board);

    //Search for Diagonal Checks
    for (const [r, c] of bishopMoves) {
      let piece = board[r][c];
      if (piece && (piece.type == "Q" || piece.type == "B")) {
        return true;
      }
    }

    //Search for Vertical Checks
    for (const [r, c] of rookMoves) {
      let piece = board[r][c];
      if (piece && (piece.type == "Q" || piece.type == "R")) return true;
    }

    //Search for Knight Checks
    for (const [r, c] of knightMoves) {
      let piece = board[r][c];
      if (piece && piece.type == "N") return true;
    }

    //Search for Pawn Checks
    const dir = color == "W" ? -1 : 1;
    for (const side of [1, -1]) {
      const r = row + dir;
      const c = col + side;

      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        let piece = board[r][c];
        if (piece && piece.color != color && piece.type == "P") return true;
      }
    }

    // Check for King Checks
    for (let r = row - 1; r < row + 2; r++) {
      for (let c = col - 1; c < col + 2; c++) {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          let piece = board[r][c];
          if (piece && piece.color != color && piece.type == "K") return true;
        }
      }
    }

    return false;
  }

  // Searchs
  findPlayerKing(color) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let piece = this.board[r][c];
        if (piece && piece.type == "K" && piece.color == color) {
          return [r, c];
        }
      }
    }
  }

  // Moves
  getPawnMoves(row, col, color, board) {
    const [dir, initRow] = color === "W" ? [-1, 6] : [1, 1];
    const moves = [];

    // First step
    const oneStepRow = row + dir;
    if (oneStepRow >= 0 && oneStepRow < 8) {
      if (!board[oneStepRow][col]) {
        moves.push([oneStepRow, col]);

        // Second step
        const twoStepRow = row + dir * 2;
        if (row === initRow && !board[twoStepRow][col]) {
          moves.push([twoStepRow, col]);
        }
      }
    }

    // Diagonals
    for (const side of [-1, 1]) {
      const r = row + dir;
      const c = col + side;
      const piece = board[r][c];

      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (piece && piece.color != color) {
          moves.push([r, c]);
        }
      }
    }

    return moves;
  }

  getKnightMoves(row, col, color, board) {
    let moves = [];

    const directions = [
      [-1, 2], // right up
      [1, 2], // right down
      [-1, -2], // left up
      [1, -2], // left down
      [-2, -1], // up left
      [-2, 1], // up right
      [2, -1], // down left
      [2, 1], // down right
    ];

    for (const [dRow, dCol] of directions) {
      let r = row + dRow;
      let c = col + dCol;

      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        let piece = board[r][c];

        if (piece && piece.color == color) continue;
        moves.push([r, c]);
      }
    }

    return moves;
  }

  getBishopMoves(row, col, color, board) {
    let moves = [];

    const directions = [
      [-1, -1], // left up
      [-1, 1], // right up
      [1, -1], // left down
      [1, 1], // right down
    ];

    for (const [dRow, dCol] of directions) {
      let r = row + dRow;
      let c = col + dCol;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        let piece = board[r][c];

        if (piece) {
          if (piece.color != color) {
            moves.push([r, c]);
          }
          break;
        }

        moves.push([r, c]);
        r += dRow;
        c += dCol;
      }
    }

    return moves;
  }

  getRookMoves(row, col, color, board) {
    let moves = [];

    const directions = [
      [0, 1], // right
      [0, -1], // left
      [-1, 0], // up
      [1, 0], // down
    ];

    for (const [dRow, dCol] of directions) {
      let r = row + dRow;
      let c = col + dCol;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        let piece = board[r][c];

        if (piece) {
          if (piece.color != color) {
            moves.push([r, c]);
          }
          break;
        }

        moves.push([r, c]);
        r += dRow;
        c += dCol;
      }
    }

    return moves;
  }

  getQueenMoves(row, col, color, board) {
    return [...this.getBishopMoves(row, col, color, board), ...this.getRookMoves(row, col, color, board)];
  }

  getKingMoves(row, col, color) {
    const noKingBoard  = this.board.map(row => row.map(col => col));
    noKingBoard[row][col] = null;

    let moves = [];

    for (let r = row - 1; r < row + 2; r++) {
      for (let c = col - 1; c < col + 2; c++) {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          let piece = this.board[r][c];
          if (piece && piece.color == color) continue;
          if (this.verifyCheck(r, c, color, noKingBoard)) continue;
          moves.push([r, c]);
        }
      }
    }

    return moves;
  }

  // Extras
  visualize() {
    const chessEmotes = {
      WP: "♙", // White Pawn
      WR: "♖", // White Rook
      WN: "♘", // White Knight
      WB: "♗", // White Bishop
      WQ: "♕", // White Queen
      WK: "♔", // White King

      BP: "♟", // Black Pawn
      BR: "♜", // Black Rook
      BN: "♞", // Black Knight
      BB: "♝", // Black Bishop
      BQ: "♛", // Black Queen
      BK: "♚", // Black King
    };

    console.log("");
    for (const row of this.board) {
      let s = [];
      for (const col of row) {
        if (col == null) {
          s.push("    ");
        } else {
          s.push(` ${chessEmotes[`${col.color}${col.type}`]}  `);
        }
      }
      console.log(s.join("|"));
    }
    console.log("");
  }
}

export default ChessBoard;