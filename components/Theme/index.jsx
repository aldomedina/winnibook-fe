import { createContext, useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import { useRouter } from 'next/router';
import { animated, useSpring } from 'react-spring';

import themeConfig from './colors';

const GlobalStyles = createGlobalStyle`
  // html, body, #__next {
  //   height: 100%;
  // }
`;

const ColorParent = styled(animated.div)`
  height: 100%;
`;

export const ColorContext = createContext();

const Theme = ({ children }) => {
  const [colorTheme, setColorTheme] = useState('base');
  const { pathname } = useRouter();

  const colorSchemaProps = useSpring({
    color: themeConfig.colors[colorTheme].primary,
    borderColor: `${themeConfig.colors[colorTheme].primary}`,
    backgroundColor: themeConfig.colors[colorTheme].bg + "E6"
  });

  // useEffect(() => {
  //   setColorTheme('base');
  // }, [pathname]);

  return (
    <ThemeProvider theme={themeConfig}>
      <ColorContext.Provider value={{ colorTheme, setColorTheme }}>
        <GlobalStyles />
        <ColorParent className="scrollbar-hide" style={colorSchemaProps}>
          {children}
        </ColorParent>
      </ColorContext.Provider>
    </ThemeProvider>
  );
};

export default Theme;
