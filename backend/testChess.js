import ChessBoard from "./src/chess/ChessBoard.js";
import Game from "./src/chess/Game.js";

const test = (message, func) => {
  console.log(message, func() ? "passed" : "failed");
};

export default () => {
  const game = new Game();

  game.visualize();
  console.log(game.getPieceMoves(6, 3));
  game.movePiece(1, 3, 2, 3);
};

/* 
      0     1     2     3     4     5     6     7  
  0 ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
  1 ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
  2 ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  3 ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  4 ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  5 ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  6 ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
  7 ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"] 
*/