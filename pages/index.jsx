import { useState, useRef } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import BottomNav from '../components/BottomNav';
import HorizontalPanel from '../components/HorizontalPanel';
import HomeHero from '../components/HomeHero';
import { useHorizontalScroll } from '../components/Hooks/useSideScroll';

const bottomNavItems = [
  { id: 'search', name: 'search', icon: 'search' },
  { id: 'featured', name: 'Featured business' },
  { id: 'latest', name: 'Latest stories' },
  { id: 'top', name: 'Top search this week' },
  { id: 'map', name: 'Winnimap' }
];

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [panelPos, setPanelPos] = useState(0);
  const target = useHorizontalScroll();

  return (
    <div className="overflow-hidden">
      <Wrapper ref={target}>
        <div className="fixed top-0 left-0 w-full h-full">
          <HomeHero />
        </div>
        <HorizontalPanel panelPos={panelPos} />
      </Wrapper>
      <BottomNav
        active={activeSection}
        items={bottomNavItems}
        setActiveSection={setActiveSection}
      />
    </div>
  );
};

const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.base['bg-secondary']};
  height: 100vh;
  width: 100vw;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Home;
