import styled from 'styled-components';
import { Icon } from '../Icon';

const SearchButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  height: calc(100% - 4px);
  padding: ${({ buttonIcon }) => (buttonIcon ? '0 .5rem' : '0 1.3rem')};
  border-radius: 19px;
  background-color: ${({ theme, $t }) => theme.colors[$t].bg};
`;

const SearchBar = ({
  reference,
  onChange,
  value,
  buttonIcon,
  noIcon,
  home,
  customClasses,
  placeholder,
  theme = 'base',
  big = false
}) => {
  return (
    <div
      ref={reference}
      home={home}
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
          ${big ? 'text-xl' : ''}
        `}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {!noIcon && (
        <SearchButton buttonIcon={buttonIcon} home={home} className="text-xs" $t={theme}>
          {buttonIcon ? <Icon icon="search" w="16px" /> : 'SEARCH'}
        </SearchButton>
      )}
    </div>
  );
};

export default SearchBar;
