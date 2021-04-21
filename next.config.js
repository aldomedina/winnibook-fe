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
  }
});