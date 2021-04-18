import { useState, useContext } from 'react';
import { useQuery } from "@apollo/client";
import { useSpring } from '@react-spring/web';

// QUERIES
import GET_LOCAL_BY_NAME from '../apollo/queries/getLocalByName.gql';

// COMPONENTS
import HomeHero from '../components/HomeHero';
import BottomNav from '../components/BottomNav';
import HorizontalPanel from '../components/HorizontalPanel';

import { ColorContext } from '../components/Theme/ColorProvider';
import { useHorizontalScroll } from '../components/Hooks/useSideScroll';

import styled from 'styled-components';


const Home = () => {
  const { data, loading } = useQuery(
    GET_LOCAL_BY_NAME,
    {
      variables: { 
        name: "Test local"
      },
    }
  );

  if (data) {
    console.log(data);
  }

  const [activeSection, setActiveSection] = useState(0);

  const scrollRef = useHorizontalScroll();
  const { height } = useContext(ColorContext);

  return (
    <Wrapper ref={scrollRef}>
      <HeroWrapper>
        <HomeHero />
      </HeroWrapper>

      <HorizontalPanel />
      
      <BottomNav active={activeSection} setActiveSection={setActiveSection} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.base['bg-secondary']};
  height: 100%;
  width: 100vw;
  overflow: auto;
`;

const HeroWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export default Home;
