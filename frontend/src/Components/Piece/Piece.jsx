import "./Piece.css";

import white_king from "../Assets/white_king.png"
import white_queen from "../Assets/white_queen.png"
import white_bishop from "../Assets/white_bishop.png"
import white_rook from "../Assets/white_rook.png"
import white_knight from "../Assets/white_knight.png"
import white_pawn from "../Assets/white_pawn.png"

import black_king from "../Assets/black_king.png"
import black_queen from "../Assets/black_queen.png"
import black_bishop from "../Assets/black_bishop.png"
import black_rook from "../Assets/black_rook.png"
import black_knight from "../Assets/black_knight.png"
import black_pawn from "../Assets/black_pawn.png"

const whiteIcons = {
  "K": white_king,
  "Q": white_queen,
  "B": white_bishop,
  "R": white_rook,
  "N": white_knight,
  "P": white_pawn,
}

const blackIcons = {
  "K": black_king,
  "Q": black_queen,
  "B": black_bishop,
  "R": black_rook,
  "N": black_knight,
  "P": black_pawn,
}

const Piece = ({ piece, position }) => {
  const [row, col] = position;
  const { color, type, state } = piece;

  // Get Intercalated Color for Board Squares
  const background =
    state == "active" ? (
      "piece-active"
    ) : (
      (row + col) % 2 == 0 ? "piece-brown" : "piece-biege"
    );

  // Get correct icon or null if its not a piece
  const icon =
    color && type ? (
      (color == "W" ? whiteIcons : blackIcons)[type]
    ) : (
      null
    );

  let eventMap = {
    blocked: () => null,
    default: "selectPiece",
    active: "movePiece"
  }

  return (
    <div className={`piece ${background}`} onClick={() => eventMap[state](row, col)}>
      {icon ? <img src={icon} /> : null}
    </div>
  )
};

export default Piece;
