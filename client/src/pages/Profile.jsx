import Wrapper from "../wrappers/Profile";
import LogoutContainer from "../components/LogoutContainer";
import ThemeToggle from "../components/ThemeToggle";
import customFetch from "../utils/customFetch";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/users/update-user", data);
    toast.success("Profile updated successfully");
    return redirect("/dashboard/all-trades");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return null;
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, email, password } = user;
  const navigation = useNavigation();
  const isSaving = navigation.state === "saving";

  return (
    <Wrapper>
      <h3>Profile &amp; Settings</h3>

      <div className="settings-card">
        <Form method="post" className="form-page">
          <h2>Profile</h2>
          <p className="text-small">Manage your account and preferences.</p>
          <div className="form-center">
            <FormRow type="text" name="name" defaultValue={name} />
            <FormRow type="email" name="email" defaultValue={email} />
            <button type="submit" className="btn" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>
      <div className="settings-card">
        <h2>Appearance</h2>
        <p className="text-small">Choose how SYZYGY looks.</p>
        <ThemeToggle />
      </div>

      <LogoutContainer />
    </Wrapper>
  );
};

export default Profile;
