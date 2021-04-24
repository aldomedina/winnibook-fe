import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import { Icon } from '../Icon';
import useWindowSize from '../Hooks/useWindowSize';
import ThreeDots from '../ThreeDots';
import SearchBar from '../SearchBar';
import SocialIcons from '../SocialIcons';
import items from './items';
import SearchResultsBox from '../SearchResultsBox';

const DropdownMenu = styled(animated.ul)`
  @media (min-width: 768px) {
    box-shadow: 0 10px 8px 0px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.15);
    transition: backdrop-filter 0.3s ease-in;
    backdrop-filter: blur(10px);
  }
`;

const TopNav = ({ showSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { isMobile } = useWindowSize();
  const searchRef = useRef();
  const aboutMenu = useRef();

  const fullMenuAnimation = useSpring({
    transform: isOpen || !isMobile ? `translateY(0)` : `translateY(-100%)`,
    opacity: isOpen || !isMobile ? 1 : 0
  });
  const aboutAnimation = useSpring({
    transform: openMenu || isMobile ? `translateY(0)` : `translateY(-100%)`,
    opacity: openMenu || isMobile ? 1 : 0
  });

  useEffect(() => {
    // click outside
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
    console.log('handleSearchClick', openSearch);
    if (searchRef?.current?.contains(e.target)) {
      setOpenSearch(true);
      return;
    }
    if (aboutMenu?.current?.contains(e.target)) {
      setOpenMenu(true);
      return;
    }

    // outside click
    setOpenSearch(false);
    setOpenMenu(false);
  }, []);

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      setOpenSearch(false);
    }
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 py-2 px-3 md:px-5 flex justify-between items-center w-full z-50">
        <div className="flex flex-1">
          <Link href="/">
            <a className="mr-5">
              <Icon icon="logo" w="30px" h="30px" />
            </a>
          </Link>
          {showSearch && (
            <div ref={searchRef} className="relative md:max-w-40vw w-full">
              <SearchBar buttonIcon={isMobile} />
              <SearchResultsBox openSearch={openSearch} />
            </div>
          )}
        </div>
        <animated.ul
          className="flex-1 flex flex-col md:flex-row min-w-0 gap-5 md:justify-end fixed md:static bg-white md:bg-transparent top-0 left-0 h-full w-full md:h-auto md:w-auto p-5 py-10 md:py-0 md:p-1 md:pd-0"
          style={fullMenuAnimation}
        >
          {items.map((el, i) =>
            !!el.subItems ? (
              <li
                ref={aboutMenu}
                key={i}
                onClick={() => setOpenMenu(true)}
                className="uppercase px-4 text-left md:text-center whitespace-nowrap	md:text-sm relative"
              >
                <span className="opacity-30 md:opacity-100	">{el.name}</span>
                <DropdownMenu
                  className="md:absolute -left-11 rounded-20p w-max p-5 pt-3 top-7"
                  style={aboutAnimation}
                >
                  {el.subItems.map((sub, i) => (
                    <li key={i} className={`uppercase text-left whitespace-nowrap	md:text-sm mb-3`}>
                      <Link href={`/${sub.slug}`}>{sub.name}</Link>
                    </li>
                  ))}
                </DropdownMenu>
              </li>
            ) : (
              <li key={i} className={`uppercase px-4 md:text-center whitespace-nowrap	md:text-sm`}>
                <Link href={`/${el.slug}`}>{el.name}</Link>
              </li>
            )
          )}
          <div className="absolute bottom-10 right-10 md:static self-end">
            <SocialIcons />
          </div>
        </animated.ul>
        <ThreeDots isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
      </div>
    </>
  );
};

export default TopNav;
