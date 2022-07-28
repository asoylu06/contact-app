function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  className,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
    />
  );
}

export default Input;
