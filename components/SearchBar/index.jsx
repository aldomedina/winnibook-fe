import styled from 'styled-components';
import { Icon } from '../Icon';

const Bar = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ home }) => (home ? 'transparent' : 'rgba(0, 0, 0, 0.1)')};
  border-radius: 20px;
  height: 40px;
  transition: background-color 0.2s ease;
  &:focus-within {
    background-color: ${({ home }) => (home ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.13)')};
  }
`;

const SInput = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 38px;
  background: transparent;
  border: none;
  padding-left: 1em;
  vertical-align: center;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  height: 36px;
  ${({ buttonIcon }) => !buttonIcon && 'padding: 0 1.3em;'}
  border-radius: 19px;
  border: none;
  background-color: ${({ theme, active, home }) =>
    home
      ? theme.colors.base['bg-secondary']
      : active
      ? theme.colors[active].primary
      : theme.colors.base['bg-primary']};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const SearchBar = ({ buttonIcon, home, onFocus, onBlur, open }) => {
  return (
    <Bar home={home}>
      <SInput type="text" />
      <SearchButton home={home}>{buttonIcon ? <Icon icon="search" /> : 'SEARCH'} </SearchButton>
    </Bar>
  );
};

export default SearchBar;
