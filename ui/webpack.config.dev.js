var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true, 
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080/assets',
    'bootstrap-sass!./bootstrap.config.js',
    './src/index.js'
  ],
  
  resolve: {
    root: path.join(__dirname, 'src')
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    new ExtractTextPlugin("style.css")
  ],  
  
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },

      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-sass-loader has access to the jQuery object
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" },

      // ToDo: custom path and source map option did not work
      //{ test: /\.scss$/,
      //  loader: "style!css!sass?outputStyle=expanded&sourceMap=true&includePaths[]=" + bootstrapPathStylesheets },

      // Needed for the css-loader when [bootstrap-sass-loader](https://github.com/justin808/bootstrap-sass-loader)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/png" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    
    ]
  }
};