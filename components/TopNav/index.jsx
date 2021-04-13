import { useState } from 'react';
import Link from 'next/link';
import { useTrail, interpolate, useSpring } from 'react-spring';
import { Icon } from '../Icon';
import { NavWrapper, Menu, MenuItem, ThreeDots } from './index.style';
import useWindowSize from '../Hooks/useWindowSize';
const items = [
  { key: 0, slug: 'places', name: 'discover places' },
  { key: 1, slug: 'stories', name: 'see all stories' },
  { key: 2, slug: 'join', name: 'join us' },
  { key: 3, slug: 'about-us', name: 'Who we are', mobile: true },
  { key: 4, slug: 'Terms', name: 'Terms & conditions', mobile: true },
  { key: 5, slug: 'Privacy', name: 'Privacy Policy', mobile: true }
];

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowSize();
  const animateMenu = useSpring({ top: width > 768 || isOpen ? 0 : height * -1 });
  const [trail] = useTrail(items.length, () => ({
    // trail: 1000,
    opacity: 1,
    sc: 0.9,
    y: '0px',
    from: {
      opacity: 0,
      sc: 0.8,
      y: '20px'
    }
  }));

  return (
    <NavWrapper>
      <Link href="/">
        <a>
          <Icon icon="logo" w="30px" h="30px" />
        </a>
      </Link>

      <Menu style={animateMenu}>
        {trail.map(({ sc, y, ...props }, i) => (
          <MenuItem
            key={i}
            style={{
              ...props,
              transform: interpolate([sc, y], (sc, y) => `scale(${sc}) translateY( ${y}) `)
            }}
            mobile={!!items[i].mobile}
          >
            <Link href={`/${items[i].slug}`}>{items[i].name}</Link>
          </MenuItem>
        ))}
      </Menu>
      <ThreeDots className="block md:hidden" type="button" onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {isOpen && (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
          )}
          {!isOpen && (
            <path
              fillRule="evenodd"
              d="M 4 5 h 16 a 1 1 0 0 1 0 3 H 20 a 1 1 0 1 1 0 -3 z m 0 6 h 16 a 1 1 0 0 1 0 3 H 20 a 1 1 0 0 1 0 -3 z m 0 6 h 16 a 1 1 0 0 1 0 3 H 20 a 1 1 0 0 1 0 -3 z"
            />
          )}
        </svg>
      </ThreeDots>
    </NavWrapper>
  );
};

export default TopNav;
