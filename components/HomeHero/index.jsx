import { useEffect, useState, useRef, useContext } from 'react';
import { animated, useSpring, useSpringRef, config, useChain } from 'react-spring';

import { Icon } from '../Icon';
import SearchBar from '../SearchBar';
import SocialIcons from '../SocialIcons';
import useWindowSize from '../Hooks/useWindowSize';

const HomeHero = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const { height } = useWindowSize();
  const searchRef = useRef();

  const removeAnimation = useSpring({
    to: { height: '0%', transform: 'scale(0)' },
    reverse: !openSearch,
    from: { height: '100%', transform: 'scale(1)' }
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
      <animated.div className="mb-8 md:mb-12 flex flex-col justify-end" style={removeAnimation}>
        <div className="mx-auto height-max">
          <img src="/icons/logo-name-outline.svg" />
        </div>
        <h2 className="uppercase text-2xl text-center">winnipeg's guide of local business</h2>
      </animated.div>

      <animated.div
        className="mb-4 md:mb-8 bg-black bg-opacity-10 rounded-20p"
        ref={searchRef}
        style={searchBarProps}
      >
        <SearchBar home />
      </animated.div>
      <animated.div className="mx-auto" style={removeAnimation}>
        <SocialIcons />
      </animated.div>
    </div>
  );
};

export default HomeHero;
