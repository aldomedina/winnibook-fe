import { createContext, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import themeConfig from './colors';
import useWindowSize from '../Hooks/useWindowSize';

export const ColorContext = createContext();

const ColorSchemaProvider = styled(animated.div)`
  height: ${({ h }) => h + 'px'};
  width: 100%;
`;

const ColorProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState('base');
  const { height } = useWindowSize();
  const selectColorTheme = e => setColorTheme(e);
  const colorSchemaProps = useSpring({
    color: themeConfig.colors[colorTheme].primary,
    borderColor: `${themeConfig.colors[colorTheme].primary}`,
    backgroundColor: themeConfig.colors[colorTheme].bg
  });

  return (
    <ColorContext.Provider value={{ colorTheme, selectColorTheme }}>
      <ColorSchemaProvider className="scrollbar-hide" h={height} style={colorSchemaProps}>
        {children}
      </ColorSchemaProvider>
    </ColorContext.Provider>
  );
};

export default ColorProvider;
