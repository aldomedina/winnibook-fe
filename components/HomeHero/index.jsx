import { useEffect, useState, useRef, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Icon } from '../Icon';
import SearchBar from '../SearchBar';
import SocialIcons from '../SocialIcons';
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
    <div className="w-80vw md:w-50vw h-full flex flex-col justify-center py-14 px-5 md:px-14">
      <animated.div className="mb-8 md:mb-20" style={{ opacity }}>
        <div className="mx-auto">
          <Icon icon="logo-name-outline" w="100%" h="90px" />
        </div>
        <h2 className="uppercase text-2xl text-center"> winnipeg's guide of local business </h2>
      </animated.div>
      <animated.div
        className="mb-4 md:mb-8 bg-black bg-opacity-10 rounded-20p"
        ref={searchRef}
        style={searchBarProps}
      >
        <SearchBar home />
      </animated.div>
      <animated.div style={{ opacity }} className="mx-auto">
        <SocialIcons />
      </animated.div>
    </div>
  );
};

export default HomeHero;
