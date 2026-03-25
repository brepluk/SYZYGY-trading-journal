const optionKey = (item) =>
  typeof item === "string" ? item : item.value;

const optionValue = (item) =>
  typeof item === "string" ? item : item.value;

const optionLabel = (item) =>
  typeof item === "string" ? item : item.label;

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  value,
  onChange,
}) => {
  const isControlled = value !== undefined;
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        {...(isControlled
          ? { value, onChange }
          : {
              ...(defaultValue !== undefined ? { defaultValue } : {}),
              ...(onChange ? { onChange } : {}),
            })}
      >
        {list.map((item) => {
          const v = optionValue(item);
          return (
            <option key={optionKey(item)} value={v}>
              {optionLabel(item)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
