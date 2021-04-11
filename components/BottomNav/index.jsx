import React from 'react';
import { Icon } from '../Icon';
import { MovingBar, NavLi, NavUl, NavWrapper, NavSpan } from './BottomNav.styled';
import useWindowSize from '../Hooks/useWindowSize';
import { useSpring } from '@react-spring/core';

const items = [
  { id: 'search', name: 'search', icon: 'search' },
  { id: 'featured', name: 'Featured business' },
  { id: 'latest', name: 'Latest stories' },
  { id: 'top', name: 'Top search this week' },
  { id: 'map', name: 'Winnimap' }
];

const NavItem = ({ active, i, setActiveSection, name, icon }) => {
  const animatedOpacity = useSpring({ opacity: active ? 1 : 0.3 });

  return (
    <NavLi onClick={() => setActiveSection(i)} style={animatedOpacity}>
      <NavSpan>{icon ? <Icon icon="search" /> : name}</NavSpan>
    </NavLi>
  );
};

const BottomNav = ({ active, setActiveSection }) => {
  const { width } = useWindowSize();
  const barWidth = Math.floor(width / items.length);
  const animatedBarPos = useSpring({ left: barWidth * active });

  return (
    <NavWrapper>
      <NavUl>
        {items.map((el, i) => (
          <NavItem
            key={el.id}
            i={i}
            active={i === active}
            setActiveSection={setActiveSection}
            {...el}
          />
        ))}
      </NavUl>
      {barWidth && <MovingBar barWidth={barWidth} style={animatedBarPos} />}
    </NavWrapper>
  );
};

export default BottomNav;
