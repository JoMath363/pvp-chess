import "./Home.css"
import Header from "../../Components/Header/Header.jsx";
import Hero from "../../Components/Hero/Hero.jsx";
import About from "../../Components/About/About.jsx";

const Home = (props) => {
  return (
    <>
      <Header />
      <div className="home">
        <Hero/>
        {/* <About/> */}
        <div className="home-divider"></div>
      </div>
    </>
  )
};

export default Home;
