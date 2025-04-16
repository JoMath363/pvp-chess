import Piece from "../Piece/Piece";
import "./Board.css";

const board = [
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

  return (
    <div className="board">
      {board.map((row, i) =>
        row.map((piece, j) => {
          return <Piece
            key={i + j}
            piece={piece}
            row={i} col={j}
          />
        })
      )}
    </div>
  )
};

export default Board;
