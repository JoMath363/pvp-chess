import "./Tutorial.css";

const Tutorial = (props) => {
  return (
    <div className="tutorial">
      <h2>How to Play?</h2>

      <h3>1. Starting a New Game</h3>
      <p>
        To begin, click the "Start Game" button. You’ll get
        a unique link that you can send to a friend. When they
        join using that link, the game will start automatically.
      </p>

      <h3>2. Understanding the Board</h3>
      <p>
        The board has 64 squares in an 8x8 grid. White pieces start
        at the bottom, and black at the top. Each piece has its own
        movement pattern, hover over them to preview moves.
      </p>

      <h3>3. Making a Move</h3>
      <p>
        To make a move, click on a piece to highlight its legal moves,
        then click on a highlighted square. Illegal moves won’t be allowed,
        keeping the game rules enforced automatically.
      </p>

      <h3>4. Winning the Game</h3>
      <p>
        The game ends when one player checkmates the other, resigns,
        or a draw is declared.
        The winner is announced right on the game screen.
      </p>
    </div>
  )
};

export default Tutorial;
