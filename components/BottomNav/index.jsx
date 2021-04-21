import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { Icon } from '../Icon';
import { mediaQueries } from '../Theme';
import useWindowSize from '../Hooks/useWindowSize';

const BottomNav = ({ active, setActiveSection, items }) => {
  const { width } = useWindowSize();
  const barWidth = Math.floor(width / items.length);
  const animatedBarPos = useSpring({ left: barWidth ? barWidth * active : 0 });

  return (
    <div className="fixed w-full bottom-1 left-0 overflow-x-scroll md:overflow-visible ">
      <ul className="w-max md:w-full px-20vw md:px-0 flex h-8 md:h-12 items-start">
        {items.map((el, i) => (
          <NavItem
            key={el.id}
            i={i}
            active={i === active}
            setActiveSection={setActiveSection}
            {...el}
          />
        ))}
      </ul>
      {/* {barWidth && <MovingBar $barWidth={barWidth} style={animatedBarPos} />} */}
    </div>
  );
};

const NavItem = ({ active, i, setActiveSection, name, icon, id }) => {
  const animatedOpacity = useSpring({ opacity: active ? 1 : 0.3 });
  return (
    <li
      className="flex flex-1 justify-center items-center select-none cursor-pointer min-w-45vw md:min-w-0"
      onClick={() => setActiveSection(i, id)}
      style={animatedOpacity}
    >
      <span
        className={`w-max text-center transition-opacity	 ${
          !active ? 'opacity-30 hover:opacity-50' : ''
        }`}
      >
        {icon ? <Icon icon="search" /> : name}
      </span>
    </li>
  );
};

const MovingBar = styled(animated.div)`
  position: absolute;
  bottom: 0;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.base.primary};
  ${({ $barWidth }) => `
    width: ${$barWidth}px;    
  `};
  ${mediaQueries('md')`
    height: 0;
  `};
`;

export default BottomNav;
