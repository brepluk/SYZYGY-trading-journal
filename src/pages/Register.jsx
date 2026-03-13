import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Starfield from "../components/Starfield";
import Wrapper from "../wrappers/RegisterAndLoginPage";

const Register = () => {
  return (
    <Wrapper>
      <Starfield />
      <nav className="nav">
        <Logo className="logo" />
        <div className="nav-actions">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      </nav>

      <section className="form-section">
        <div className="form-card">
          <form className="form">
            <h4>Register</h4>
            <FormRow type="text" name="name" defaultValue="Foosh Singh" />
            <FormRow type="email" name="email" defaultValue="foosh@gmail.com" />
            <FormRow type="password" name="password" defaultValue="123456" />
            <button type="submit" className="btn btn-block">
              submit
            </button>
            <p className="member-text">
              Already a member?
              <Link to="/login" className="member-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Wrapper>
  );
};

export default Register;
