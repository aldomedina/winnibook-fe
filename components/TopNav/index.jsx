import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';

import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';

import useWindowSize from '../Hooks/useWindowSize';

import { Icon } from '../Icon';
import ThreeDots from '../ThreeDots';
import Menu from './Menu';
import NavSearch from './NavSearch';

const TopNav = ({ showSearch, hasBG, reference }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { colorTheme } = useContext(ColorContext);
  const { isMobile } = useWindowSize();

  const searchRef = useRef();
  const aboutMenu = useRef();

  const BGAnimation = useSpring({
    backdropFilter: 'blur(1px)',
    position: 'sticky',
    top: 0
  });

  useEffect(() => {
    // listen to click outside
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', handleClick);
      window.addEventListener('keydown', escFunction, false);
      return () => {
        window.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', escFunction, false);
      };
    }
  }, []);

  const handleClick = useCallback(e => {
    if (searchRef?.current?.contains(e.target)) {
      setOpenSearch(true);
      return;
    }
    if (aboutMenu?.current?.contains(e.target)) {
      setOpenMenu(true);
      return;
    }

    // handle outside click
    setOpenSearch(false);
    setOpenMenu(false);
  }, []);

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      setOpenSearch(false);
    }
  }, []);

  return (
    <div ref={reference}>
      <animated.div
        style={BGAnimation}
        className={`
          transition-all 
          top-0 
          left-0 
          py-2 
          px-3 
          md:px-5 
          flex 
          justify-between 
          items-center 
          w-full 
          z-50
        `}
      >
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a className="mr-5">
              <Icon icon="logo" w="30px" h="30px" />
            </a>
          </Link>
          {showSearch && (
            <NavSearch
              searchRef={searchRef}
              openSearch={openSearch}
              setOpenSearch={setOpenSearch}
              isMobile={isMobile}
              colorTheme={colorTheme}
            />
          )}
        </div>
        <Menu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          aboutMenu={aboutMenu}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          isMobile={isMobile}
        />
        <ThreeDots isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
      </animated.div>
    </div>
  );
};

export default TopNav;
