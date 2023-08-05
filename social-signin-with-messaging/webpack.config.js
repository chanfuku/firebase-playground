const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const enviroment = process.env.NODE_ENV;

module.exports = {
  mode: 'production',
  entry: {
    login: './src/js/login.js',
    mypage: './src/js/mypage.js',
    'firebase-messaging-sw': './src/js/firebase-messaging-sw.js',
  },
  output: {
    path: `${__dirname}/public`,
    filename: '[name].js',
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `${__dirname}/src/html`,
          to: `${__dirname}/public`,
        },
        {
          from: `${__dirname}/src/style.css`,
          to: `${__dirname}/public`,
        },
      ],
    }),
    new Dotenv({
      path: `./.env.${enviroment}`,
    }),
  ],

  performance: { hints: false } ,
};
