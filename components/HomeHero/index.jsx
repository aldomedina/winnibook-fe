import { useEffect, useState, useRef, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { Box } from '../Containers';
import { Icon } from '../Icon';
import SearchBar from '../SearchBar';
import SocialIcons from '../SocialIcons';
import { mediaQueries } from '../Theme';
import { H2 } from '../Titles';
import { ColorContext } from '../Theme/ColorProvider';

const HomeHero = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { height } = useContext(ColorContext);
  const searchRef = useRef();
  const { opacity } = useSpring({
    opacity: openSearch ? 0 : 1
  });
  const searchBarProps = useSpring({
    height: openSearch ? height : 40
  });

  useEffect(() => {
    // click outside
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', handleClick);
      return () => window.removeEventListener('mousedown', handleClick);
    }
  }, []);

  const handleClick = e => {
    if (searchRef.current.contains(e.target)) {
      setOpenSearch(true);
      return;
    }
    // outside click
    setOpenSearch(false);
  };

  return (
    <HeroContainer>
      <TitleWrapper style={{ opacity }}>
        <Box mxauto="true">
          <Icon icon="logo-name-outline" w="100%" h="90px" />
        </Box>
        <H2 textCenter="true"> winnipeg's guide of local business </H2>
      </TitleWrapper>
      <SearchWrapper ref={searchRef} style={searchBarProps}>
        <SearchBar home />
      </SearchWrapper>
      <Box style={{ opacity }} mxauto="true">
        <SocialIcons />
      </Box>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  height: calc(100%);
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 51px 5vw;
  ${mediaQueries('md')`
    width: 80vw;
    `}
`;
const SearchWrapper = styled(animated.div)`
  margin-bottom: 2em;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.1);
  ${mediaQueries('md')`
    margin-bottom: 1em;
    `}
`;
const TitleWrapper = styled(animated.div)`
  margin-bottom: 5rem;
  ${mediaQueries('md')`
  margin-bottom: 2rem;      
    `}
`;

export default HomeHero;
