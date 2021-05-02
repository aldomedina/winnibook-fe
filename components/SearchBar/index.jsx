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
  home,
  customClasses,
  placeholder,
  theme = 'base'
}) => {
  return (
    <div
      ref={reference}
      home={home}
      className={`relative w-full h-full bg-black bg-opacity-5 rounded-full transition-colors focus-within:bg-opacity-10 ${customClasses}`}
    >
      <input
        className="flex-1 w-full py-2 h-full bg-transparent pl-4 align-middle focus:outline-none placeholder-current"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <SearchButton buttonIcon={buttonIcon} home={home} className="text-xs" $t={theme}>
        {buttonIcon ? <Icon icon="search" w="16px" /> : 'SEARCH'}
      </SearchButton>
    </div>
  );
};

export default SearchBar;
