import "./Match.css";
import Topbar from "../../Components/Topbar/Topbar";
import Board from "../../Components/Board/Board";
import InfoPanel from "../../Components/InfoPanel/InfoPanel";
import Chat from "../../Components/Chat/Chat";

const Match = (props) => {
  return (
    <>
      <Topbar />
      <div className="match">
        <main className="match-main">
          <Board />
        </main>

        <aside className="match-aside">
          <InfoPanel />
          <Chat />
        </aside>
      </div>
    </>

  )
};

export default Match;
