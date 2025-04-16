import Piece from "../Piece/Piece";
import "./Board.css";

const board = [
  [
    { color: "B", type: "R" },
    { color: "B", type: "N" },
    { color: "B", type: "B" },
    { color: "B", type: "Q" },
    { color: "B", type: "K" },
    { color: "B", type: "B" },
    { color: "B", type: "N" },
    { color: "B", type: "R" }
  ],
  [
    { color: "B", type: "P" },
    { color: "B", type: "P" },
    { color: "B", type: "P" },
    null,
    { color: "B", type: "P" },
    { color: "B", type: "P" },
    { color: "B", type: "P" },
    { color: "B", type: "P" }
  ],
  [
    null,
    null,
    null,
    { color: "B", type: "P" },
    null,
    null,
    null,
    null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    { color: "W", type: "P" },
    { color: "W", type: "P" },
    { color: "W", type: "P" },
    { color: "W", type: "P" },
    { color: "W", type: "P" },
    { color: "W", type: "P" },
    { color: "W", type: "P" },
    { color: "W", type: "P" }
  ],
  [
    { color: "W", type: "R" },
    { color: "W", type: "N" },
    { color: "W", type: "B" },
    { color: "W", type: "Q" },
    { color: "W", type: "K" },
    { color: "W", type: "B" },
    { color: "W", type: "N" },
    { color: "W", type: "R" }
  ]
]

const Board = (props) => {
  return (
    <div className="board">
      {board.map((row, i) => 
        row.map((piece, j) => <Piece {...piece} key={i + j}/>)
      )}
    </div>
  )
};

export default Board;
