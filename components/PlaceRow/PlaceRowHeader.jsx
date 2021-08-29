import Tag from '../Tag';
import { animated, useSpring } from 'react-spring';

import { Icon } from '../Icon';

import useWindowSize from '../Hooks/useWindowSize';

const PlaceRowHeader = ({
  categories,
  name,
  city,
  onRowHeaderClick,
  isOpen,
  reference,
  isSingle
}) => {
  const { isMobile } = useWindowSize();
  const animatedProp = useSpring({
    width: !isOpen ? '0%' : '10%',
    opacity: isOpen ? 1 : 0
  });

  return (
    <div
      ref={reference}
      className="
        px-3 
        lg:px-5 
        py-2 

        max-w-full 

        flex 
        flex-col 
        lg:flex-row 
        lg:items-end"
      onClick={onRowHeaderClick}
    >
      <div className="flex flex-col-reverse lg:flex-row ">
        <h3
          className={`uppercase transition-all text-2xl lg:mr-3 ${
            isOpen ? 'lg:text-6xl' : 'lg:text-4xl'
          }`}
        >
          {name}
        </h3>

        {categories && (
          <div className="flex gap-1">
            {categories.map(cat => (
              <Tag
                key={cat.category?.id}
                name={cat.category?.name}
                theme={cat.category?.theme}
                tagInfo={cat.category}
                small
              />
            ))}
          </div>
        )}
      </div>

      {!isOpen && <div className="flex-1 border-b-2 border-dotted opacity-30 hidden lg:block" />}
      {!isOpen && <h4 className="uppercase text-lg font-light lg:text-2xl">{city}</h4>}
    </div>
  );
};

export default PlaceRowHeader;
