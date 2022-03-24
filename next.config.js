const withImages = require('next-images');
module.exports = withImages({
  webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    });
    return config;
  },
  webpackDevMiddleware: config => {
    return config;
  },
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
  future: {
    webpack5: true
  }
});
