const Input = ({
  reference,
  onChange,
  value,
  customClasses,
  placeholder,
  big = false
}) => {
  return (
    <div
      ref={reference}
      className={`
        relative 
        w-full 
        bg-black 
        bg-opacity-5 
        rounded-full 
        transition-colors 
        focus-within:bg-opacity-10 
        ${customClasses}
      `}
    >
      <input
        className={`
          flex-1 
          w-full
          h-full
          py-2  
          ${big ? "md:py-3" : ""}
          ${big ? "pl-6" : "pl-4"}
          align-middle 
          focus:outline-none 
          placeholder-current
          bg-transparent 
          border-none
          ${big ? 'text-xl' : ''}
        `}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
