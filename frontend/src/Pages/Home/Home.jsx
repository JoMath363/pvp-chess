import "./Home.css"
import Header from "../../Components/Header/Header.jsx";
import Hero from "../../Components/Hero/Hero.jsx";
import About from "../../Components/About/About.jsx";
import Tutorial from "../../Components/Tutorial/Tutorial.jsx";

const Home = (props) => {
  return (
    <>
      <Header />
      <div className="home">
        <Hero/>
        <div className="home-divider"/>
        <About/>
      </div>
    </>
  )
};

export default Home;
