import "./MenuBtns.css";

import white_gear from "../Assets/white_gear.svg";

const Settings = (props) => {
  const changeSettings = () => {
    // To implement :)
  }

  return (
    <div className="menubtns">
      <div className="menubtns-picture">
        <img src={white_gear} />
      </div>
      <div className="menubtns-content">
        <div className="menubtns-line">
          <h2>Settings</h2>
          <button onClick={changeSettings}>Change Settings</button>
        </div>
        <hr />
      </div>
    </div>
  )
};
export default Settings;
