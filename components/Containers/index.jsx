import { animated } from '@react-spring/web';
import styled from 'styled-components';

export const Box = styled(animated.div)`
  margin: ${({ m, mxauto }) => (mxauto ? '0 auto' : m ? m : '')};
  margin-bottom: ${({ mb }) => mb};
  margin-top: ${({ mt }) => mt};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  display: ${({ display }) => display};
`;
