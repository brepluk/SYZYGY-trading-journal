import { useContext } from "react";
import { ThemeContext } from "../App";

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const Profile = () => {
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <section className="profile-page">
      <h1>Profile &amp; Settings</h1>

      <div className="settings-card">
        <h2>Appearance</h2>
        <p className="text-small">Choose how FXTech Journal looks.</p>

        <div className="theme-options">
          {THEME_OPTIONS.map((opt) => {
            const isActive = mode === opt.value;
            return (
              <label
                key={opt.value}
                className={`theme-option${isActive ? " theme-option--active" : ""}`}
              >
                <input
                  type="radio"
                  name="theme-mode"
                  value={opt.value}
                  checked={isActive}
                  onChange={() => setMode(opt.value)}
                />
                <span className="theme-option-label">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Profile;

