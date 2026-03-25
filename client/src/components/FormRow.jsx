const FormRow = ({
  type,
  name,
  labelText,
  value,
  handleChange,
  defaultValue,
  step,
  onChange,
  optional,
  className,
  placeholder,
}) => {
  const label = labelText || name;
  const isControlled = value !== undefined;
  return (
    <div className={className ? `form-row ${className}` : "form-row"}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(step !== undefined ? { step } : {})}
        {...(isControlled
          ? { value, onChange: handleChange }
          : {
              ...(defaultValue !== undefined ? { defaultValue } : {}),
              ...(onChange ? { onChange } : {}),
            })}
        {...(optional ? {} : { required: true })}
      />
    </div>
  );
};

export default FormRow;
