import "./Topbar.css";
import { FaChessQueen } from "react-icons/fa";

const Topbar = (props) => {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <FaChessQueen className="topbar-logo-icon"/>
        <span>PVP Chess</span>
      </div>

      <div className="topbar-content">

      </div>
    </div>
  )
};

export default Topbar;
