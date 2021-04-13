import styled from 'styled-components';
import { animated } from 'react-spring';
import { mediaQueries } from '../Theme';

export const NavWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  ${mediaQueries('md')`
    overflow-x: scroll;
  `};
`;

export const NavUl = styled.ul`
  height: 50px;
  width: 100%;
  display: flex;
  ${mediaQueries('md')` 
     
    overflow-x: scroll;
    padding: 0 30vw;
  `};
`;

export const NavLi = styled(animated.li)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${mediaQueries('md')`
    min-width: 40vw;
  `};
`;

export const NavSpan = styled.span`
  width: max-content;
  text-align: center;
`;

export const MovingBar = styled(animated.div)`
  position: absolute;
  bottom: 0;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.base.primary};
  ${({ barWidth }) => `
    width: ${barWidth}px;    
  `};
  ${mediaQueries('md')`
    height: 0;
  `};
`;
