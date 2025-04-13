import "./MenuBtns.css";

import white_queen from "../Assets/white_queen_icon.svg";
import { useState } from "react";

const JoinMatch = (props) => {
  const [code, setCode] = useState("");

  const joinMatch = () => {
    // To implement :)
  }

  return (
    <div className="menubtns">
      <div className="menubtns-picture">
        <img src={white_queen} />
      </div>
      <div className="menubtns-content">
        <div className="menubtns-line">
          <h2>Join</h2>

          <div className="menubtns-inputfield">
            <input type="text" placeholder="Match Code" 
            onChange={(e) => setCode(e.target.value)}/>
            <button onClick={joinMatch}>Join Match</button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
};
export default JoinMatch;
