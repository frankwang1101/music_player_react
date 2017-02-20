var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: './index.js',

  output: {
    path: './dist/',
    filename: 'bundle.js',
    publicPath: './dist/',
    chunkFilename:"[name].chunk.js"
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?limit=8192&name=[name].[hash:8].[ext]'
      },
      {
        test : /\.(woff|svg|eot|ttf)\??.*$/,
        loader : 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
      }
    ]
  },
 devServer: {
      inline: true,
      port: 8080,
      stats: { colors: true },
       proxy: {
        '/click/get': {
          target: 'http://music.qq.com/',
          pathRewrite: {'^/click/get' : '/'},
          changeOrigin: true
        },
        '/qq_music_get':{
           target: 'http://c.y.qq.com/',
          pathRewrite: {'^/qq_music_get' : '/'},
          changeOrigin: true
        }
      }
    },
    // resolve: {
    //     root: [],
    //     alias: {
    //         'jquery': path.resolve(__dirname, './lib/jquery.1.11.3.min.js')
    //     }
    // },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ]
  
}
