import { resignMatch } from "../../Pages/Match/emiters";
import Flag from "../Animations/Flag/Flag";
import Loader from "../Animations/Loader/Loader";
import Locked from "../Animations/Locked/Locked";
import Loser from "../Animations/Loser/Loser";
import Winner from "../Animations/Winner/Winner";
import "./PopUp.css";

const PopUp = ({ type, setPopUp, socket }) => {
  const popUpTypes = {
    full: <Full />,
    waiting: <Waiting />,
    win: <Win />,
    lose: <Lose />,
    resign: <Resign setPopUp={setPopUp} socket={socket} />
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
      <Winner />

      <div className="popup-content">
        <h2>You win!</h2>
        <p>Your strategy paid off — well done!</p>
        <a href="/">Return to Home</a>
      </div>
    </div>
  )
};

const Lose = (props) => {
  return (
    <div className="popup-box">
      <Loser />

      <div className="popup-content">
        <h2>You lose.</h2>
        <p>Try a new approach next time.</p>
        <a href="/">Return to Home</a>
      </div>
    </div>
  )
};

const Resign = ({ setPopUp, socket }) => {
  return (
    <div className="popup-box">
      <Flag/>

      <div className="popup-content">
        <h2>Do you Want to Resign?</h2>

        <p>This will end the game and your opponent <br/> will be declared the winner.</p>

        <button onClick={() => setPopUp(null)}>Cancel</button>
        <button onClick={() => resignMatch(socket)}>Yes, Resign</button>
      </div>
    </div>
  )
};

export default PopUp;
