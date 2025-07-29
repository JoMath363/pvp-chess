import "./Flag.css";

const Flag = (props) => {
  return (
    <div className="flag">
      <div className="pole"></div>
      <div className="flag-part">
        <div className="top1"></div>
        <div className="bottom1"></div>
      </div>
      <div className="flag-part">
        <div className="top2"></div>
        <div className="bottom2"></div>
      </div>
    </div>
  )
};

export default Flag;
