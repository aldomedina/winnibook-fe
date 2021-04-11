import { createContext, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { themeConfig } from '.';

export const ColorContext = createContext();

const ColorSchemaProvider = styled(animated.div)`
  height: 100%;
  width: 100%;
`;

const ColorProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState('base');
  const selectColorTheme = e => setColorTheme(e);
  const colorSchemaProps = useSpring({
    color: themeConfig.colors[colorTheme].primary,
    borderColor: themeConfig.colors[colorTheme].primary,
    backgroundColor: themeConfig.colors[colorTheme].bgColor
  });
  return (
    <ColorContext.Provider value={{ colorTheme, selectColorTheme }}>
      <ColorSchemaProvider style={colorSchemaProps}>{children}</ColorSchemaProvider>
    </ColorContext.Provider>
  );
};

export default ColorProvider;
