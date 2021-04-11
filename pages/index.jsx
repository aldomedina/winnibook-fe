import { useState } from 'react';
import styled from 'styled-components';

import BottomNav from '../components/BottomNav';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.base['bg-secondary']};
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  return (
    <Wrapper>
      <BottomNav active={activeSection} setActiveSection={setActiveSection} />
    </Wrapper>
  );
};
export default Home;
