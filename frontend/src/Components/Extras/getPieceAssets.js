import white_king from "../Assets/Pieces/white_king.png"
import white_queen from "../Assets/Pieces/white_queen.png"
import white_bishop from "../Assets/Pieces/white_bishop.png"
import white_rook from "../Assets/Pieces/white_rook.png"
import white_knight from "../Assets/Pieces/white_knight.png"
import white_pawn from "../Assets/Pieces/white_pawn.png"

import black_king from "../Assets/Pieces/black_king.png"
import black_queen from "../Assets/Pieces/black_queen.png"
import black_bishop from "../Assets/Pieces/black_bishop.png"
import black_rook from "../Assets/Pieces/black_rook.png"
import black_knight from "../Assets/Pieces/black_knight.png"
import black_pawn from "../Assets/Pieces/black_pawn.png"

const getPieceIcon = (color, type) => {
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

  return (color == "W" ? whiteIcons : blackIcons)[type];
}

export default getPieceIcon;