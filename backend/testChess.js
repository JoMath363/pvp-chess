import MatchManager from "./src/match/MatchManager.js";

/* const test = (message, func) => {
  console.log(message, func() ? "passed" : "failed");
}; */

export default () => {
  const game = new MatchManager();

  let test = game.getDefaultBoard();

  console.log(test);
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