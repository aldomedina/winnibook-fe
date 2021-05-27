const InputTextarea = ({ label, id, placeholder, value, onChange, maxLength, error }) => {
  return (
    <div className="mb-5 last:mb-0">
      <label htmlFor={id} className="text-xs font-medium leading-10 ">
        {label}
      </label>
      <br />
      <textarea
        name={id}
        placeholder={placeholder}
        id={id}
        className={`
          w-full 
          bg-glass 
          text-sm 
          px-4 
          py-2 
          rounded 
          border-none
          focus:outline-none 
          focus:ring-2 
          ring-current 
          font-light
          min-h-36
          max-h-60
          placeholder-current 
          placeholder-opacity-50 
          ${
            error ? 'ring-2 ' : ''
          }
        `}
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
      />
      <span className="error-msg mt-2">{error}</span>
    </div>
  );
};

export default InputTextarea;
