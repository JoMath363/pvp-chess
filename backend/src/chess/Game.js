import ChessBoard from "./ChessBoard.js";

class Game extends ChessBoard {
  constructor(){
    super();
  }

  getPieceMoves(row, col) {
    const { type, color } = this.board[row][col];
  
    switch (type) {
    case "P": return this.getPawnMoves(row, col, color);
    case "N": return this.getKnightMoves(row, col, color);
    case "B": return this.getBishopMoves(row, col, color);
    case "R": return this.getRookMoves(row, col, color);
    case "Q": return this.getQueenMoves(row, col, color);
    case "K": return this.getKingMoves(row, col, color);
    default: throw new Error("Cannot get moves from non existent piece type");
    }
  }

  movePiece(fromRow, fromCol, toRow, toCol) {
    const availableMoves = this.getPieceMoves(fromRow, fromCol);

    if (!availableMoves.some(m => m[0] == toRow && m[1] == toCol)){
      throw new Error ("The move is not valid");
    }
    
    const piece = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;

    console.log("Move from:", [fromRow, fromCol], "to:", [toRow, toCol]);
  }

  visualize(){
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

export default Game;