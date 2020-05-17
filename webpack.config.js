/* Custom webpack config (NOT Create-React-App!) used to allow for organized client/server file structure */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* Define source and distribution paths for webpack bundle */
const SOURCE_PATH = path.join(__dirname, 'src/client');
const DIST_PATH = path.join(__dirname, 'dist');

/* Allowing env to be passed as parameter makes custom npm commands able to define dev/prod environments */
module.exports = env => {
  /* Check development or production */
  const { environment } = env;

  return {
    mode: environment,
    // devtool: 'source-map',
    entry: path.join(SOURCE_PATH, '/index.js'),
    output: {
      path: DIST_PATH,
      filename: 'js/[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          /* Use babel to convert JSX and ES6 to browser compatible JS */
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // these options replace babel.config.js
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true,
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: '> 0.5%, not dead, last 2 versions'
                  }
                ],
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          /* Convert css and scss */
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          /* Load imported images into dist/images/ path */
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
        {
          /* Convert SVGs to be React-importable and MUI compatible (used with Microsoft button in src/client/LoginButton.js) */
          test: /\.svg$/,
          loader: '@svgr/webpack',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    /* Configure webpack dev server for faster development */
    devServer: {
      contentBase: DIST_PATH,
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      open: true,
      /* Configure proxy for same origin requests to server */
      proxy: {
        '*': 'http://[::1]:8080',
        secure: false,
        changeOrigin: true
      },
      overlay: {
        errors: true,
        warnings: true
      }
    },

    plugins: [
      /* Plugin to allow for template HTML and favicon */
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/public/index.html'),
        favicon: path.join(__dirname, '/public/favicon.ico')
      }),
      /* Clean webpack plugin allows for automatic bundle wipes */
      new CleanWebpackPlugin()
    ]
  };
};
