import { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { ColorContext } from '../Theme/ColorProvider';
import { mediaQueries } from '../Theme';

const PanelWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden; */
`;

const finalHeight = 250;
const scrollBarHeight = 1;

const Wrapper = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: ${({ panelHeight }) => panelHeight + 'px'};
  height: 100vw;
  margin: 0;
  padding-top: ${scrollBarHeight}px;
  background: transparent;
  /* pointer-events: none; */
  overflow-y: auto;
  overflow-x: hidden;
  transform: rotate(-90deg) ${({ panelHeight }) => `translateY(-${panelHeight}px)`};
  transform-origin: right top;
  padding: 0 0 0 100px;

  ::-webkit-scrollbar {
    width: ${scrollBarHeight}px;
    height: ${scrollBarHeight}px;
  }

  ::-webkit-scrollbar-button {
    width: ${scrollBarHeight}px;
    height: ${scrollBarHeight}px;
  }
`;

const Panel = styled(animated.div)`
  position: relative;
  display: flex;
  padding: 5px;
  background: white;
  width: 300vw;
  height: ${({ panelHeight }) => `${panelHeight - 100}px`};
  border-radius: 0 0 50px 50px;
  box-shadow: -1px 3px 19px 1px rgba(0, 0, 0, 0.37);
  margin: 0 50vw;
  ${mediaQueries('md')`
     margin: 0 80vw;
    `}
  ::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }
  ::-webkit-scrollbar-button {
    width: 1px;
    height: 1px;
  }
`;

const HorizontalPanel = () => {
  const { height } = useContext(ColorContext);
  const enterAnimation = useSpring({
    transform: 'translateX(0)',
    opacity: 1,
    from: { transform: 'translateX(80px)', opacity: 0 }
  });

  const panelHeight = height;
  return <Panel style={enterAnimation} panelHeight={panelHeight}></Panel>;
};

export default HorizontalPanel;
