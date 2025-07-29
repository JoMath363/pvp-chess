import { acceptDraw, declineDraw, resignMatch } from "../../Pages/Match/emiters";
import InDraw from "../Animations/Draw/InDraw";
import Flag from "../Animations/Flag/Flag";
import Loader from "../Animations/Loader/Loader";
import Locked from "../Animations/Locked/Locked";
import Loser from "../Animations/Loser/Loser";
import Offer from "../Animations/Offer/Offer";
import Winner from "../Animations/Winner/Winner";
import "./PopUp.css";

const PopUp = ({ type, setPopUp, socket }) => {
  const popUpTypes = {
    match_full: <MatchFull />,
    waiting_opponent: <WaitingOpponent />,
    waiting_connection: <WaitingConnection />,
    win: <Win />,
    lose: <Lose />,
    draw: <Draw />,
    waiting_draw: <WaitingDraw socket={socket}/>,
    recieve_draw: <RecieveDraw setPopUp={setPopUp} socket={socket}/>,
    resign: <Resign setPopUp={setPopUp} socket={socket} />
  }

  return (
    <div className="popup">
      {popUpTypes[type]}
    </div>
  )
};

const MatchFull = (props) => {
  return (
    <div className="popup-box">
      <Locked />

      <div className="popup-content">
        <h2>Match Already Full</h2>
        <p>This match is no longer available. <br /> You can create your own match instead!</p>
        <a className="default" href="/">Return to Home</a>
      </div>
    </div>
  )
};

const WaitingConnection = (props) => {
  return (
    <div className="popup-box">
      <Loader />

      <div className="popup-content">
        <h2>Connecting to Server</h2>
        <p>This can take a minute...</p>
      </div>
    </div>
  )
};

const WaitingOpponent = (props) => {
  return (
    <div className="popup-box">
      <Loader />

      <div className="popup-content">
        <h2>Waiting for Opponent...</h2>
        <p>Share the match link with a friend to start playing!</p>

        <button className="default"  onClick={() => navigator.clipboard.writeText(window.location.href)}>
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
        <p>Well done! Your strategy paid off.</p>
        <a className="default"  href="/">Return to Home</a>
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
        <a className="default" href="/">Return to Home</a>
      </div>
    </div>
  )
};

const Draw = (props) => {
  return (
    <div className="popup-box">
      <InDraw/>

      <div className="popup-content">
        <h2>Draw!</h2>
        <p>The game has ended in a draw.</p>
        <a className="default" href="/">Return to Home</a>
      </div>
    </div>
  )
};

const WaitingDraw = (props) => {
  return (
    <div className="popup-box">
      <Loader/>

      <div className="popup-content">
        <h2>Waiting for Opponent...</h2>
        <p>You’ve offered a draw. Waiting for your <br/> opponent to accept or decline…</p>
      </div>
    </div>
  )
};

const RecieveDraw = ({ socket }) => {
  return (
    <div className="popup-box">
      <Offer/>

      <div className="popup-content">
        <h2>Draw Offer Received</h2>
        <p>Your opponent has offered a draw. <br/> Do you accept?</p>
        <button className="negative" onClick={() => declineDraw(socket)}>Decline</button>
        <button className="positive" onClick={() => acceptDraw(socket)}>Accept</button>
      </div>
    </div>
  )
};

const Resign = ({ setPopUp, socket }) => {
  return (
    <div className="popup-box">
      <Flag />

      <div className="popup-content">
        <h2>Do you Want to Resign?</h2>

        <p>This will end the game and your opponent <br /> will be declared the winner.</p>

        <button className="negative" onClick={() => setPopUp(null)}>Cancel</button>
        <button className="positive" onClick={() => resignMatch(socket)}>Yes, Resign</button>
      </div>
    </div>
  )
};

export default PopUp;
