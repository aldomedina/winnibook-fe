import Tag from '../Tag';
import { animated, useSpring } from 'react-spring';
import { Icon } from '../Icon';
import useWindowSize from '../Hooks/useWindowSize';
const PlaceRowHeader = ({ categories, name, location, onRowHeaderClick, isOpen, reference }) => {
  const { isMobile } = useWindowSize();
  const animatedProp = useSpring({
    width: !isOpen ? '0%' : '10%',
    opacity: isOpen ? 1 : 0
  });
  return (
    <div
      ref={reference}
      className="px-3 md:px-5 py-2 max-w-90vw md:max-w-full flex flex-col md:flex-row md:items-end cursor-pointer"
      onClick={onRowHeaderClick}
    >
      <div className="flex flex-col-reverse md:flex-row ">
        <h3 className="uppercase text-2xl md:text-4xl md:mr-3">{name}</h3>
        {categories && (
          <div className="flex gap-1">
            {categories.map(cat => (
              <Tag key={cat.id} name={cat.name} theme={cat.theme} cat={cat} small />
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 border-b-2 border-dotted opacity-30 hidden md:block" />
      <h4 className="uppercase text-lg font-light md:text-2xl">{location}</h4>
      <animated.div
        style={animatedProp}
        className="absolute right-3 md:static md:flex top-5 items-center justify-center"
        onClick={onRowHeaderClick}
      >
        <Icon icon="x" w="28px" h="28px" />
      </animated.div>
    </div>
  );
};

export default PlaceRowHeader;
