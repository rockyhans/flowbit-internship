const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/App.js',
  mode: 'development',
  devServer: { port: 3001 },
  output: { publicPath: 'auto' },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'SupportTicketsApp',
      filename: 'remoteEntry.js',
      exposes: {
        './TicketApp': './src/App'
      },
      shared: ['react', 'react-dom']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
