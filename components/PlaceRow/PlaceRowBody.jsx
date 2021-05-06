import HorizontalScroll from 'react-scroll-horizontal';
import { animated, useSpring } from 'react-spring';
import useWindowSize from '../Hooks/useWindowSize';
import PlaceDetailsPanel from '../PlaceDetailsPanel';

const PlaceRowBody = ({ isOpen, headerHeight, data, isLoading }) => {
  const { height, isMobile } = useWindowSize();
  const animationProps = useSpring({
    height: !isOpen ? 0 : isMobile ? height - 56 - headerHeight : height - 52 - headerHeight
  });
  return (
    <animated.div style={animationProps} className="overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        {isOpen && isLoading ? (
          <div className="w-full h-full"> loading...</div>
        ) : isOpen && !isLoading && data.name ? (
          <div className="w-full h-full">
            <PlaceDetailsPanel data={data} />
          </div>
        ) : (
          ''
        )}
      </div>
    </animated.div>
  );
};

export default PlaceRowBody;
