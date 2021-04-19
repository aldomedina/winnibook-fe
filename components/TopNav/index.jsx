import { useState } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';

import { Icon } from '../Icon';
import useWindowSize from '../Hooks/useWindowSize';
import ThreeDots from '../ThreeDots';
import items from './items';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowSize();
  const animateMenu = useSpring({
    top: width > 768 || (isOpen && height !== NaN) ? 0 : height * -1
  });
  return (
    <div className="fixed top-0 left-0 py-2.5 px-5 flex justify-between items-center w-full z-30">
      <Link href="/">
        <a>
          <Icon icon="logo" w="30px" h="30px" />
        </a>
      </Link>

      <animated.ul
        className="flex flex-col md:flex-row fixed md:static bg-white md:bg-transparent top-0 left-0 h-full w-full md:h-auto md:w-auto p-1 md:pd-0"
        style={animateMenu}
      >
        {items.map((el, i) => (
          <li
            key={i}
            className={`uppercase px-4  ${
              el.mobile ? 'md:hidden font-light' : 'font-medium md:font-normal'
            }`}
          >
            <Link href={`/${items[i].slug}`}>{items[i].name}</Link>
          </li>
        ))}
      </animated.ul>
      <ThreeDots isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default TopNav;
