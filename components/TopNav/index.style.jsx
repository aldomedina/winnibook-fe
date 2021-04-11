import styled from 'styled-components';
import { mediaQueries } from '../Theme';
import { animated } from 'react-spring';

export const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 30;
`;

export const Menu = styled(animated.ul)`
  display: flex;
  ${mediaQueries('md')`
    flex-direction: column;
    position: fixed;
    background: white;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 1em;
  `};
`;

export const MenuItem = styled(animated.li)`
  text-transform: uppercase;
  padding: 0 2rem;
  border-left: 2px solid;
  border-color: inherit;
  &:first-child {
    border: none;
  }
  ${({ theme }) => mediaQueries('md')`
      border: none;      
      font-weight: 500;
      padding: 0; 
      font-size: ${theme.fontSizes.xl}     
      `}
  ${({ mobile }) =>
    mobile &&
    mediaQueries('md')`        
      font-weight: 300;        
      ` +
      mediaQueries('md', true)`
        display: none`}
`;

export const ThreeDots = styled.div`
  height: 20px;
  width: 20px;
  z-index: 40;
  ${mediaQueries('md', true)`
      display: none
  `}
`;
