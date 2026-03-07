import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login"> Already have an account? Login</Link>
    </div>
  );
};
export default Register;
