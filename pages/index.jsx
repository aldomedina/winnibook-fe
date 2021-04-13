import { useState } from 'react';
import { useSpring } from '@react-spring/web';
import HomeHero from '../components/HomeHero';
import styled from 'styled-components';

import BottomNav from '../components/BottomNav';

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <Wrapper>
      <HomeHero />
      <BottomNav active={activeSection} setActiveSection={setActiveSection} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.base['bg-secondary']};
  width: 100%;
  height: 100%;
`;

export default Home;
