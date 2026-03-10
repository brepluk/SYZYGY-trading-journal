import { Link } from "react-router-dom";
import { Logo, FormRow } from "../components";
import Starfield from "../components/Starfield";
import Wrapper from "../wrappers/RegisterAndLoginPage";

const Login = () => {
  return (
    <Wrapper>
      <Starfield />
      <nav className="nav">
        <Link to="/" className="logo">
          <Logo />
        </Link>
        <div className="nav-actions">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/register" className="nav-link nav-link-primary">
            Sign up
          </Link>
        </div>
      </nav>

      <section className="form-section">
        <div className="form-card">
          <form className="form">
            <h4>Login</h4>
            <FormRow
              type="email"
              name="email"
              defaultValuevalue="foosh@gmail.com"
            />
            <FormRow type="password" name="password" defaultValue="123456" />
            <button type="submit" className="btn btn-block">
              login
            </button>
            <p className="member-text">
              New here?
              <Link to="/register" className="member-link">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Wrapper>
  );
};

export default Login;
