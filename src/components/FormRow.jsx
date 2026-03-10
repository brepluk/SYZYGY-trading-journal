const FormRow = ({
  type,
  name,
  labelText,
  value,
  handleChange,
  defaultValue,
}) => {
  const label = labelText || name;
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={handleChange}
        className="form-input"
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};

export default FormRow;
