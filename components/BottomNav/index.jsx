import React from 'react';
import { Icon } from '../Icon';
import { MovingBar, NavLi, NavUl, NavWrapper } from './BottomNav.styled';
import useWindowSize from '../hooks/WindowSize';
const BottomNav = ({ items, active, setActiveSection }) => {
  const { width } = useWindowSize();
  const barWidth = width / items.length;
  return (
    <NavWrapper>
      <NavUl>
        {items.map((el, i) => (
          <NavLi key={el.id} active={el.id === active}>
            <span onClick={() => setActiveSection(i)}>
              {el.icon ? <Icon icon="search" /> : el.name}
            </span>
          </NavLi>
        ))}
      </NavUl>
      <MovingBar barWidth={barWidth} leftPos={barWidth * active} />
    </NavWrapper>
  );
};

export default BottomNav;
