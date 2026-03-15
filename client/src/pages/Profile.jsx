import Wrapper from "../wrappers/Profile";
import LogoutContainer from "../components/LogoutContainer";
import ThemeToggle from "../components/ThemeToggle";

const Profile = () => {
  return (
    <Wrapper>
      <h1>Profile &amp; Settings</h1>

      <div className="settings-card">
        <h2>Account</h2>
        <p className="text-small">Manage your account and preferences.</p>
      </div>

      <div className="settings-card">
        <h2>Appearance</h2>
        <p className="text-small">Choose how FXTech Journal looks.</p>
        <ThemeToggle />
      </div>

      <LogoutContainer />
    </Wrapper>
  );
};

export default Profile;
