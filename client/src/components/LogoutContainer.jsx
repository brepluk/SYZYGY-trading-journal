import Wrapper from "../wrappers/LogoutContainer";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <div className="settings-card">
        <h2>Log out</h2>
        <p className="text-small">Sign out of your account on this device.</p>
        <button type="button" className="logout-btn" onClick={logoutUser}>
          Log out
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
