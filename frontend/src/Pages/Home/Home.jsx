import "./Home.css"
import Hero from "../../Components/Hero/Hero.jsx";
import About from "../../Components/About/About.jsx";
import Tutorial from "../../Components/Tutorial/Tutorial.jsx";
import { FaChessQueen } from "react-icons/fa";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Home = (props) => {
  return (
    <>
      <div className="header">
        <div className="header-logo">
          <FaChessQueen className="header-logo-icon" />
          <span>PVP Chess</span>
        </div>
      </div>

      <div className="home">
        <Hero />
        <div className="home-divider" />
        <About />
        <div className="home-divider" />
        <Tutorial />
        <div className="home-footer">
          <span>Web Developer José Mathias:</span>
          <a href="https://github.com/JoMath363"
            target="_blank">
            <FaGithub />
            Github
          </a>
          <a href="https://www.linkedin.com/in/jose-mathias-santos"
            target="_blank">
            <FaLinkedin />
            LinkedIn
          </a>
        </div>
      </div>
    </>
  )
};

export default Home;
