import Loader from "../Animations/Loader/Loader";
import Locked from "../Animations/Locked/Locked";
import "./PopUp.css";

const PopUp = ({ type }) => {
  const popUpTypes = {
    full: <Full />,
    waiting: <Waiting />
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

      <h2>Match Already Full</h2>
      <p>This match is no longer available. <br /> You can create your own match instead!</p>
      <a href="/">Return to Home</a>
    </div>
  )
};

const Waiting = (props) => {
  return (
    <div className="popup-box">
      <Loader />

      <h2>Waiting for Opponent...</h2>
      <p>Share the match link with a friend to start playing!</p>

      <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
        Copy Match Link
      </button>
    </div>
  )
};
export default PopUp;
