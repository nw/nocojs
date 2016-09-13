var webpack = require('webpack')
  , path = require('path');

module.exports = {
    context: __dirname,
    entry: {
      frontend: './client/frontend.js',
      common: ['jquery', 'moment']
    },
    output: {
        path: path.join(__dirname, "./public/js/")
      , filename: "[name].js"
    },
    resolve: {
      extensions: ["", ".js"]
    },
    module: {
      noParse: /\.min\.js/
    },
    plugins: [
       new webpack.optimize.CommonsChunkPlugin('common.js', ['common', 'frontend']),
       new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      })
    ]
}
