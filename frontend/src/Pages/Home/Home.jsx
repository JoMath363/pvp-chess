import "./Home.css"
import Topbar from "../../Components/Topbar/Topbar.jsx";
/* import CreateMatch from "../../Components/MenuBtns/CreateMatch.jsx";
import JoinMatch from "../../Components/MenuBtns/JoinMatch.jsx";
import Settings from "../../Components/MenuBtns/Settings.jsx"; */

const Home = (props) => {
  return (
    <>
      <Topbar />
      <div className="home">
        {/* <main className="home-main">
          <CreateMatch />
          <JoinMatch />
          <Settings />
        </main> */}
      </div>
    </>
  )
};

export default Home;
