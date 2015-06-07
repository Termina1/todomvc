module.exports = {
  output: {
    publicPath: '/build/',
    filename: "[name].js"
  },

  watch: true,

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?stage=0'
    }]
  }
};
