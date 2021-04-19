import { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { ColorContext } from '../Theme/ColorProvider';
import { mediaQueries } from '../Theme';

const Panel = styled(animated.div)`
  height: ${({ $panelHeight }) => `${$panelHeight - 100}px`};
`;

const HorizontalPanel = ({ panelPos }) => {
  const { height } = useContext(ColorContext);
  const panelHeight = height;

  return (
    <Panel
      $panelHeight={panelHeight}
      className="relative flex bg-white min-w-100vw rounded-b-20p md:rounded-b-50p mx-80vw md:mx-50vw shadow-xl"
    ></Panel>
  );
};

export default HorizontalPanel;
