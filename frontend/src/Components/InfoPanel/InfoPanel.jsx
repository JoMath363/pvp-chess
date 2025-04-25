import "./InfoPanel.css";

import { FaHandshake, FaFlag } from "react-icons/fa";

const InfoPanel = (props) => {
  return (
    <div className="info-panel">
      <div className="info-panel-player">
        <div className="info-panel-player-stats">
          <p>White (You)</p>
        </div>

        <div className="info-panel-captured">

        </div>
      </div>

      <div className="info-panel-player">
        <div className="info-panel-player-stats">
          <p>Black (Opponent)</p>
        </div>
        <div className="info-panel-captured">

        </div>
      </div>

      <div className="info-panel-buttons">
        <button>
          <FaHandshake className="info-panel-buttons-icon" />
          <span>Offer Draw</span>
        </button>

        <button>
          <FaFlag className="info-panel-buttons-icon" />
          <span>Resign</span>
        </button>
      </div>

      <div className="info-panel-history">
          <p>Move History</p>
      </div>

    </div>
  )
};

export default InfoPanel;
