import styled from 'styled-components';
import { Icon } from '../Icon';

const SearchButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  height: calc(100% - 4px);
  padding: ${({ buttonIcon }) => (buttonIcon ? '0 .5rem' : '0 1.3rem')};
  border-radius: 19px;
  background-color: ${({ theme, active, home }) =>
    home
      ? theme.colors.base['bg-secondary']
      : active
      ? theme.colors[active].primary
      : theme.colors.base['bg-primary']};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const SearchBar = ({ reference, buttonIcon, home, onFocus, onBlur, open, customClasses }) => {
  return (
    <div
      ref={reference}
      home={home}
      className={`relative w-full bg-black bg-opacity-5 rounded-full transition-colors focus-within:bg-opacity-10 ${customClasses}`}
    >
      <input
        className="flex-1 w-full h-9 bg-transparent pl-4 align-middle focus:outline-none "
        type="text"
      />
      <SearchButton buttonIcon={buttonIcon} home={home}>
        {buttonIcon ? <Icon icon="search" w="16px" /> : 'SEARCH'}{' '}
      </SearchButton>
    </div>
  );
};

export default SearchBar;
