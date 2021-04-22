import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { animated } from 'react-spring';
import HorizontalPanel from '../components/HorizontalPanel';
import HomeHero from '../components/HomeHero';
// QUERIES
import GET_LOCAL_BY_NAME from '../apollo/queries/getLocalByName.gql';
import { useHorizontalScroll } from '../components/Hooks/useSideScroll';
import HomeFooter from '../components/HomeFooter';
import useWindowSize from '../components/Hooks/useWindowSize';

const Home = () => {
  const { data, loading } = useQuery(GET_LOCAL_BY_NAME, {
    variables: {
      name: 'Test local'
    }
  });
  if (data) {
    console.log(data);
  }

  const { height } = useWindowSize();
  const target = useHorizontalScroll();
  return (
    <div className="overflow-hidden">
      <Wrapper ref={target} h={height}>
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
  height: ${({ h }) => `${h}px`};
  width: 100vw;
  overflow: auto;
  z-index: -1;
  -ms-overflow-style: none;
  scrollbar-color: #103b40 rgba(0, 0, 0, 0.15); /* thumb and track color */
  scrollbar-width: thin; /* IE and Edge */
  ::-webkit-scrollbar {
    /* border: none; */
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
