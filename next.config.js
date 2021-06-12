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
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY
  },
  future: {
    webpack5: true
  }
});
