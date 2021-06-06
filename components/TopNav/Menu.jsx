import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import SocialIcons from '../SocialIcons';
import items from './items';

const Menu = ({ isOpen, setIsOpen, aboutMenu, openMenu, setOpenMenu, isMobile }) => {
  const slideFadeTransition = useSpring({
    transform: isOpen || !isMobile ? `translateY(0)` : `translateY(-100%)`,
    opacity: isOpen || !isMobile ? 1 : 0,
  });

  const aboutAnimation = useSpring({
    transform: openMenu || isMobile ? `translateY(0)` : `translateY(-100%)`,
    opacity: openMenu || isMobile ? 1 : 0
  });

  return (
    <animated.ul
      className="
        flex 
        flex-col 
        md:flex-row
        md:items-center 

        gap-5 
        md:justify-end 
        
        bg-white 
        md:bg-transparent
        opacity-0
        list-none

        md:static 
        fixed 
        top-0 
        left-0  

        min-w-0 
        w-full 
        h-100vh
        md:h-full 
        md:h-auto 
        md:w-auto 

        p-5 
        py-10 
        md:py-0 
        md:p-1 
        md:pd-0
        mt-0  
      "
      style={slideFadeTransition}
    >
      {items.map((el, i) =>
        !!el.subItems ? (
          <li
            ref={aboutMenu}
            key={i}
            onClick={() => setOpenMenu(true)}
            className="uppercase px-2 text-left md:text-center whitespace-nowrap	md:text-sm relative cursor-pointer"
          >
            <span className="opacity-30 md:opacity-100	">{el.name}</span>
            <animated.ul
              className="
                md:absolute 
                -left-11 
                rounded-lg 
                w-max 
                p-5 
                pt-3 
                top-10
                bg-white
                md:shadow-lg"
              style={aboutAnimation}
            >
              {el.subItems.map((sub, i) => (
                <li key={i} className="uppercase text-left whitespace-nowrap md:text-sm mb-3 ">
                  <Link href={`/${sub.slug}`}>{sub.name}</Link>
                </li>
              ))}
            </animated.ul>
          </li>
        ) : (
          <li
            onClick={() => setIsOpen(false)}
            key={i}
            className={`uppercase px-2 md:text-center whitespace-nowrap	md:text-sm list-none`}
          >
            <Link href={`/${el.slug}`}>{el.name}</Link>
          </li>
        )
      )}
      <div className="absolute bottom-10 right-10 md:static self-end">
        <SocialIcons />
      </div>
    </animated.ul>
  );
};

export default Menu;
