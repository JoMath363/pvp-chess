import Loader from "../Animations/Loader/Loader";
import Locked from "../Animations/Locked/Locked";
import Loser from "../Animations/Loser/Loser";
import "./PopUp.css";

const PopUp = ({ type }) => {
  const popUpTypes = {
    full: <Full />,
    waiting: <Waiting />,
    win: <Win />,
    lose: <Lose />
  }

  return (
    <div className="popup">
      {popUpTypes[type]}
    </div>
  )
};

const Full = (props) => {
  return (
    <div className="popup-box">
      <Locked />

      <div className="popup-content">
        <h2>Match Already Full</h2>
        <p>This match is no longer available. <br /> You can create your own match instead!</p>
        <a href="/">Return to Home</a>
      </div>
    </div>
  )
};

const Waiting = (props) => {
  return (
    <div className="popup-box">
      <Loader />

      <div className="popup-content">
        <h2>Waiting for Opponent...</h2>
        <p>Share the match link with a friend to start playing!</p>

        <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
          Copy Match Link
        </button>
      </div>
    </div>
  )
};

const Win = (props) => {
  return (
    <div className="popup-box">

      <div className="popup-content">
        <h2>Checkmate! You win!</h2>
        <p>Your strategy paid off — well done!</p>
        <button>Play Again</button>
        <a href="/">Return to Home</a>
      </div>
    </div>
  )
};

const Lose = (props) => {
  return (
    <div className="popup-box">
      <Loser/>

      <div className="popup-content">
        <h2>Checkmate. You lose.</h2>
        <p>The king is cornered. Try a new approach next time.</p>
        <a href="/">Return to Home</a>
        <button>Play Again</button>
      </div>
    </div>
  )
};

export default PopUp;
