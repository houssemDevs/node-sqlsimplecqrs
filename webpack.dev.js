const path = require('path');
const nodeExternals = require('webpack-node-externals');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => ({
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    index: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.dev.json',
          },
        },
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [new tsconfigPathsPlugin()],
  },
  plugins: [new cleanWebpackPlugin()],
});
