import Topbar from "../../Components/Topbar/Topbar";
import "./Login.css";

import google from "../../Components/Assets/google_logo.svg"

const Login = (props) => {
  return (
    <>
      <Topbar />
      <div className="login">


        <main className="login-main">
          <h1>Login</h1>

          <div className="login-google">
            <img src={google} />
            <span>Login With Google</span>
          </div>

          <div className="login-or">
            <hr />
            <span>OR</span>
          </div>

          <form className="login-form">
            <label>
              <span>Username:</span>
              <input type="text" />
            </label>

            <label>
              <span>Password:</span>
              <input type="password" />
            </label>

            <a href="/login/recover">Forgot Password?</a>

            <button>Login</button>
          </form>

          <p className="login-link">Don't have an account yet? <a href="/signup">Sign Up</a></p>
        </main>
      </div>
    </>
  )
};

export default Login;
