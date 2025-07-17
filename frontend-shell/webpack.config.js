const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: { port: 3000 },
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
      name: 'frontend_shell',
      remotes: {
        SupportTicketsApp: 'SupportTicketsApp@http://localhost:3001/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
