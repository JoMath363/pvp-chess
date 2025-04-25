import "./Piece.css";
import { movePiece, selectPiece } from "../../Pages/Match/emiters.js";
import getPieceAssets from "../Extras/getPieceAssets.js";

const Piece = ({ piece, position, socket }) => {
  const [row, col] = position;
  const { color, type, state } = piece;

  // Get Intercalated Color for Board Squares
  const background = (row + col) % 2 == 0 ? "piece-bg1" : "piece-bg2";

  const icon = color && type ? getPieceAssets(color, type) : null;

  const eventMap = {
    blocked: () => null,
    selected: () => null,
    default: selectPiece,
    active: movePiece,
  }

  return (
    <div
      className={`piece ${background} piece-${state}`}
      onClick={() => eventMap[state](socket, position)}
    >
      {icon ? <img src={icon} /> : null}
    </div>
  )
};

export default Piece;
