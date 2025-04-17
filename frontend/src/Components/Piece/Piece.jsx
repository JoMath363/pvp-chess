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

const whitePieces = {
  "K": white_king,
  "Q": white_queen,
  "B": white_bishop,
  "R": white_rook,
  "N": white_knight,
  "P": white_pawn,
}

const blackPieces = {
  "K": black_king,
  "Q": black_queen,
  "B": black_bishop,
  "R": black_rook,
  "N": black_knight,
  "P": black_pawn,
}

const Piece = ({ piece, row, col, selectPiece, movePiece, selected }) => {
  const { type, color, active } = piece;

  const getBackground = () => {
    if (active) {
      return "var(--active)";
    }

    if (row % 2 == 0) {
      return col % 2 == 0 ? "var(--biege)" : "var(--brown)";
    } else {
      return col % 2 == 0 ? "var(--brown)" : "var(--biege)";
    }
  }

  const getAction = () => {
    if (!selected && type && color) {
      return selectPiece(row, col);
    }

    if (selected && active) {
      return movePiece(row, col)
    }
  }

  if (!type && !color) {
    return (
      <div className="piece"
        style={{ background: getBackground() }}
        onClick={() => getAction()}
      />
    )
  }

  const pieces = color == "W" ? whitePieces : blackPieces;

  return (
    <div className="piece"
      style={{ background: getBackground() }}
      onClick={() => getAction()}
    >
      <img src={pieces[type]} />
    </div>
  )
};

export default Piece;
