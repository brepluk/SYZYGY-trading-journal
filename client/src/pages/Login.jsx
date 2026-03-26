import {
  Form,
  Link,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { Logo, FormRow } from "../components";
import Wrapper from "../wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { message: "" };
  if (data.password.length < 6) {
    errors.message = "Password must be at least 6 characters long";
    return errors;
  }

  try {
    await customFetch.post("/auth/login", data);
    queryClient.invalidateQueries();
    toast.success("Logged in successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(
      error?.response?.data?.message ?? "Something went wrong. Try again.",
    );
    return null;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const loginDemoUser = async () => {
    const data = {
      email: "dtrump@trump.com",
      password: "donaldtrump",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Something went wrong. Try again.",
      );
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form-page">
        <nav className="nav">
          <Logo className="logo" />
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
            <div className="form">
              <h4>Login</h4>
              <FormRow type="email" name="email" />
              <FormRow type="password" name="password" />
              <button
                type="submit"
                className="btn btn-block form-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
              <button
                type="button"
                className="btn btn-block btn-explore"
                onClick={loginDemoUser}
              >
                Explore the app
              </button>
              <p className="member-text">
                New here?
                <Link to="/register" className="member-link">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Form>
    </Wrapper>
  );
};

export default Login;
