const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Entry point for your application
  output: {
    filename: 'bundle.js', // Name of the output file
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  mode: 'production', // Enable production optimizations
  target: 'node', // Target Node.js runtime
  module: {
    rules: [
      {
        test: /\.ts$/, // Process .ts files
        use: 'ts-loader', // Use ts-loader to transpile TypeScript
        exclude: /node_modules/ // Exclude node_modules
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // Resolve .ts and .js files
  },
  optimization: {
    minimize: true, // Minify the output
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true, // Enable compression
          mangle: true // Mangle variable names
        }
      })
    ]
  },
  devtool: 'source-map' // Enable source maps for debugging
};
