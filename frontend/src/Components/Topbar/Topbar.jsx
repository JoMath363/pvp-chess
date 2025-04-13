import "./Topbar.css";

import logo_icon from "../Assets/logo_light_gray.svg";

const Topbar = (props) => {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <img src={logo_icon}/>
        <span>PVP Chess</span>
      </div>

      <div className="topbar-content">
          
      </div>
    </div>
  )
};

export default Topbar;
