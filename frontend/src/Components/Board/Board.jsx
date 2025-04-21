import { useState } from "react";
import Piece from "../Piece/Piece";
import "./Board.css";

const Board = ({ board, socket }) => {
  return (
    <div className="board">
      {
        board.map((row, i) =>
          row.map((piece, j) =>
            <Piece
              piece={piece}
              position={[i, j]}
              socket={socket}
              key={i + j}
            />
          ))
      }
    </div>
  )
};

export default Board;