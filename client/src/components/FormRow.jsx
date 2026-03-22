const FormRow = ({
  type,
  name,
  labelText,
  value,
  handleChange,
  defaultValue,
  step,
}) => {
  const label = labelText || name;
  const isControlled = value !== undefined;
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        {...(step !== undefined ? { step } : {})}
        {...(isControlled
          ? { value, onChange: handleChange }
          : defaultValue !== undefined
            ? { defaultValue }
            : {})}
        required
      />
    </div>
  );
};

export default FormRow;
