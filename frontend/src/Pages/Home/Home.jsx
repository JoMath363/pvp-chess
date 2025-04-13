import "./Home.css"
import Topbar from "../../Components/Topbar/Topbar.jsx";
import CreateMatch from "../../Components/MatchBtns/CreateMatch.jsx";
import JoinMatch from "../../Components/MatchBtns/JoinMatch.jsx";

const Home = (props) => {
  return (
    <div className="home">
      <Topbar/>
      
      <main className="home-main">
        <CreateMatch/>
        <JoinMatch/>
      </main>
    </div>
  )
};

export default Home;
