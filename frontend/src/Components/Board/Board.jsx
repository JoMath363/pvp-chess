import { useState } from "react";
import Piece from "../Piece/Piece";
import "./Board.css";

const template = [
  [
    { color: "B", type: "R", active: false },
    { color: "B", type: "N", active: false },
    { color: "B", type: "B", active: false },
    { color: "B", type: "Q", active: false },
    { color: "B", type: "K", active: false },
    { color: "B", type: "B", active: false },
    { color: "B", type: "N", active: false },
    { color: "B", type: "R", active: false }
  ],
  [
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false },
    { color: "B", type: "P", active: false }
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false }
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false }
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false }
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false }
  ],
  [
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false },
    { color: "W", type: "P", active: false }
  ],
  [
    { color: "W", type: "R", active: false },
    { color: "W", type: "N", active: false },
    { color: "W", type: "B", active: false },
    { color: "W", type: "Q", active: false },
    { color: "W", type: "K", active: false },
    { color: "W", type: "B", active: false },
    { color: "W", type: "N", active: false },
    { color: "W", type: "R", active: false }
  ]
];

const Board = (props) => {
  const [board, setBoard] = useState(template)
  const [selected, setSelected] = useState(null)

  const selectPiece = (row, col) => {
    console.log("selected")

    const newBoard = board;
    let moves = [[5, 3], [4, 3]] // Receber Possiveis Movimentos

    const pieceMoves = [...moves, [row, col]]

    for (const [r, c] of pieceMoves) {
        newBoard[r][c].active = true;
    }

    setBoard(newBoard);
    setSelected([row, col]);
  }

  const movePiece = (row, col) => {
    console.log("moved")

    const piece = board[row][col];
    
    // Emitir movemento
    
    setSelected(null)
  }

  return (
    <div className="board">
      {board.map((row, i) =>
        row.map((piece, j) => {
          return <Piece
            selectPiece={selectPiece}
            movePiece={movePiece}
            selected={selected}
            piece={piece}
            row={i} col={j}
            key={i + j}
          />
        })
      )}
    </div>
  )
};

export default Board;
