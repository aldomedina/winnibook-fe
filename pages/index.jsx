import { useState, useRef } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import BottomNav from '../components/BottomNav';
import HorizontalPanel from '../components/HorizontalPanel';
import HomeHero from '../components/HomeHero';
import { useHorizontalScroll } from '../components/Hooks/useSideScroll';
import HomeFooter from '../components/HomeFooter';
import { mediaQueries } from '../components/Theme';

const Home = () => {
  const target = useHorizontalScroll();
  return (
    <div className="overflow-hidden">
      <Wrapper ref={target}>
        <BackContainer className="flex fixed top-0 left-0 w-full">
          <HomeHero />
          <HomeFooter />
        </BackContainer>
        <HorizontalPanel panelRef={target} />
      </Wrapper>
    </div>
  );
};

const BackContainer = styled.div`
  height: calc(100% - 5px);
`;

const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.base['bg-secondary']};
  height: 100vh;
  width: 100vw;
  overflow: auto;
  z-index: -1;
  -ms-overflow-style: none;
  scrollbar-color: #103b40 rgba(0, 0, 0, 0.15); /* thumb and track color */
  scrollbar-width: thin; /* IE and Edge */
  ::-webkit-scrollbar {
    border: none;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.15);
    height: 8px;
    &:hover {
      background: rgba(0, 0, 0, 0.35);
    }
  }
  ::-webkit-scrollbar-thumb {
    background: #103b40;
    height: 8px;
  }
`;

export default Home;
