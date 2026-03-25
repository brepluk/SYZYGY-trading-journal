import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Starfield from "../components/Starfield";
import Wrapper from "../wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Something went wrong. Try again.",
    );
    return null;
  }
};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form-page">
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
            <div className="form">
              <h4>Register</h4>
              <FormRow type="text" name="name" />
              <FormRow type="email" name="email" />
              <FormRow type="password" name="password" />
              <button
                type="submit"
                className="btn btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <p className="member-text">
                Already a member?
                <Link to="/login" className="member-link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Form>
    </Wrapper>
  );
};

export default Register;
