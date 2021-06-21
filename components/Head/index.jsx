import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title ? `${title} | Winnibook` : 'Winnibook'}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
    </Head>
  );
};

export default CustomHead;
