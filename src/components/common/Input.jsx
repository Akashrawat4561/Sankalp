const Input = ({ label, ...rest }) => {
  return (
    <label>
      {label && <span>{label}</span>}
      <input {...rest} />
    </label>
  );
};

export default Input;

