const InputText = ({ label, id, placeholder, value, onChange, maxLength, error, isEmail }) => {
  return (
    <div className="mb-5 last:mb-0">
      <label htmlFor={id} className="text-xs font-medium leading-10 ">
        {label}
      </label>
      <br />
      <input
        type={isEmail ? 'email' : 'text'}
        name={id}
        placeholder={placeholder}
        id={id}
        className={`w-full bg-glass px-4 py-2 rounded focus:outline-none focus:ring-2 ring-current font-light placeholder-current placeholder-opacity-30 ${
          error ? 'ring-2' : ''
        }`}
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
      />
      <span className="error-msg mt-2">{error}</span>
    </div>
  );
};

export default InputText;
