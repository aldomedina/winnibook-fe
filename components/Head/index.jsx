import Head from 'next/head';
import { useContext } from 'react';
import { ColorContext } from '../Theme';
import theme from '../Theme/colors';
const CustomHead = ({ title, description }) => {
  const { colorTheme } = useContext(ColorContext);
  const color = colorTheme ? theme.colors[colorTheme].bg : theme.colors['base'].bg;
  return (
    <Head>
      <meta name="theme-color" content={color} />
      <meta charSet="UTF-8" />
      <title>{title ? `${title} | Winnibook` : 'Winnibook'}</title>
      <meta name="description" content={description || ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />

      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
    </Head>
  );
};

export default CustomHead;
