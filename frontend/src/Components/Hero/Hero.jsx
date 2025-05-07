import "./Hero.css";

const Hero = (props) => {
  const createMatch = () => {
    const matchId = Math.random().toString(16).slice(2);

    window.location.replace(`http://localhost:5173/match/${matchId}`)
  }

  return (
    <div className="hero">
      <div className="hero-cta">
        <h1>Ready to Play? Invite a Friend!</h1>
        <p>Start a real-time match and enjoy classic chess with someone you know.</p>
        <button onClick={createMatch}>Start Game</button>
      </div>
    </div>
  )
};

export default Hero;
