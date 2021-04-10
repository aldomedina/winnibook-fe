import styled from 'styled-components';

export const NavWrapper = styled.div`
  height: 55px;
  width: 100%;
`;

export const NavUl = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
`;

export const NavLi = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MovingBar = styled.div`
  position: absolute;
  bottom: 0;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.base.primary};
  ${({ barWidth, leftPos }) => `
    width: ${barWidth}px;
    left: ${leftPos}px;
  `};
`;
