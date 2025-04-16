import Topbar from "../../Components/Topbar/Topbar";
import "./Login.css";

const Signup = (props) => {
  return (
    <>
      <Topbar />
      <div className="login">
        <main className="login-main">
          <h1>Sign Up</h1>

          <form className="login-form">
            <label>
              <span>Username:</span>
              <input type="text" />
            </label>

            <label>
              <span>Email:</span>
              <input type="text" />
            </label>

            <label>
              <span>Password:</span>
              <input type="password" />
            </label>

            <label>
              <span>Confirm Password:</span>
              <input type="password" />
            </label>


            <button>Create Account</button>
          </form>

          <p className="login-link">Already Have an Account? <a href="/login">Login</a></p>
        </main>
      </div>
    </>
  )
};

export default Signup;
