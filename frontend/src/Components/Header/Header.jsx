import "./Header.css";
import { FaChessQueen } from "react-icons/fa";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-logo">
        <FaChessQueen className="header-logo-icon"/>
        <span>PVP Chess</span>
      </div>

      <div className="header-content">

      </div>
    </div>
  )
};

export default Header;
