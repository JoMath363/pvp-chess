import { useState } from "react";
import Piece from "../Piece/Piece";
import "./Board.css";
import React from "react";

const Board = ({ board, socket }) => {
  return (
    <div className="board">
      <div className="board-content">
        {board.map((row, i) => (
          <React.Fragment key={i}>
            <div className="rank-label">{8 - i}</div>
            {row.map((piece, j) => (
              <Piece
                key={`${i}-${j}`}
                piece={piece}
                position={[i, j]}
                socket={socket}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="board-bottom">
        <div className="corner" />
        {"abcdefgh".split("").map((file, i) => (
          <div key={`file-bottom-${i}`} className="file-label">{file}</div>
        ))}
      </div>

    </div>
  )
};

export default Board;