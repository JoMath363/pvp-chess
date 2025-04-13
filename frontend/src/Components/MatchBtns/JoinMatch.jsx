import "./MatchBtns.css";

import white_queen from "../Assets/white_queen_icon.svg";

const JoinMatch = (props) => {
  return (
    <div className="matchbtns">
      <div className="matchbtns-picture">
          <img src={white_queen}/>
      </div>
      <div className="matchbtns-content">
        <h2>Join</h2>
        <hr/>
        <button>Join Match</button>
      </div>
    </div>
  )
};
export default JoinMatch;
