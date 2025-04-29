import Loader from "../Animations/Loader/Loader";
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
      <h2>This Match is Already Full</h2>
      <a href="/">Go Back To Home</a>
    </div>
  )
};

const Waiting = (props) => {
  return (
    <div className="popup-box">
      <div className="popup-animation">
        <Loader />
      </div>

      <h2>Waiting for Opponent Player...</h2>
    </div>
  )
};
export default PopUp;
