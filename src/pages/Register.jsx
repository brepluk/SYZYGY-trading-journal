import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Starfield from "../components/Starfield";
import Wrapper, {
  Nav,
  Logo as NavLogo,
  NavActions,
  HomeLink,
  LoginNavLink,
  FormSection,
  FormCard,
  MemberText,
  MemberLink,
} from "../wrappers/RegisterAndLoginPage";

const Register = () => {
  return (
    <Wrapper>
      <Starfield />
      <Nav>
        <NavLogo to="/" />
        <NavActions>
          <HomeLink to="/">Home</HomeLink>
          <LoginNavLink to="/login">Login</LoginNavLink>
        </NavActions>
      </Nav>

      <FormSection>
        <FormCard>
          <form className="form">
            <Logo />
            <h4>Register</h4>
            <FormRow type="text" name="name" />
            <FormRow type="email" name="email" />
            <FormRow type="password" name="password" />
            <button type="submit" className="btn btn-block">
              submit
            </button>
            <MemberText>
              Already a member?
              <MemberLink to="/login">Login</MemberLink>
            </MemberText>
          </form>
        </FormCard>
      </FormSection>
    </Wrapper>
  );
};

export default Register;
