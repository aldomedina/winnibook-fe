import { animated, useSpring } from 'react-spring';
import useWindowSize from '../Hooks/useWindowSize';

const PlaceRowBody = ({ isOpen, headerHeight, data, isLoading }) => {
  const { height, isMobile } = useWindowSize();
  const animationProps = useSpring({
    height: !isOpen ? 0 : isMobile ? height - 56 - headerHeight : height - 52 - headerHeight
  });
  return (
    <animated.div style={animationProps} className="overflow-hidden">
      {isOpen && 'Many stuff written over here'}
    </animated.div>
  );
};

export default PlaceRowBody;
