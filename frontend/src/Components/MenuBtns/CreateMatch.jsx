import "./MenuBtns.css";

import white_king from "../Assets/white_king_icon.svg";

const CreateMatch = (props) => {
  const createMatch = () => {
    //to implement :)
  }

  return (
    <div className="menubtns">
      <div className="menubtns-picture">
        <img src={white_king} />
      </div>
      <div className="menubtns-content">
        <div className="menubtns-line">
          <h2>Host</h2>
          <button onClick={createMatch}>Create Match</button>
        </div>
        <hr />
      </div>
    </div>
  )
};

export default CreateMatch;
