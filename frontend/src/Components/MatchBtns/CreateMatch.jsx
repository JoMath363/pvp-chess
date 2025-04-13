import "./MatchBtns.css";

import white_king from "../Assets/white_king_icon.svg";

const CreateMatch = (props) => {
  return (
    <div className="matchbtns">
      <div className="matchbtns-picture">
          <img src={white_king}/>
      </div>
      <div className="matchbtns-content">
        <h2>Host</h2>
        <hr/>
        <button>Create Match</button>
      </div>
    </div>
  )
};

export default CreateMatch;
