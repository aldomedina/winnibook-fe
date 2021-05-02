import { useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../Theme';

const ThreeDots = ({ handleClick, isOpen }) => {
  const { colorTheme } = useContext(ColorContext);
  return (
    <button className="block relative md:hidden h-10 w-10 z-30" type="button" onClick={handleClick}>
      <Dots open={isOpen} color={colorTheme} />
    </button>
  );
};

const Dots = styled.span`
  position: absolute;
  left: 17px;
  top: 17px;
  display: block;
  width: 5px;
  height: 5px;
  background-color: ${({ theme, color }) => theme.colors[color].primary};
  transition: all 0.1s ease-in-out;
  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 5px;
    height: 5px;
    background-color: ${({ theme, color }) => theme.colors[color].primary};
    transition: all 0.1s ease-in-out;
    ${({ open }) =>
      open &&
      ` 
        left: -12px;
        top: 1px;
        height: 3px;
        width: 30px;
    `}
  }
  &::before {
    transform: translateY(-8px);
    ${({ open }) => open && `transform:rotate(45deg);`}
  }
  &::after {
    transform: translateY(8px);
    ${({ open }) => open && `transform:rotate(-45deg);`}
  }
`;
export default ThreeDots;
