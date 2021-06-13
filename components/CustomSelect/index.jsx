const CustomSelect = ({
  reference,
  onChange,
  options,
  value,
  customClasses,
  placeholder,
  disabled,
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
      <select
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
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      >

        {
          Array.isArray(options) && options.map((item, index) => (
            <option key={index} value={item.value}>{item.name}</option>
          ))
        }

      </select>
    </div>
  );
};

export default CustomSelect;
