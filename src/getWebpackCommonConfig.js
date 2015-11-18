import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { join } from 'path';

const pkg = require(join(process.cwd(), 'package.json'));

export default function getWebpackCommonConfig(args) {
  const jsFileName = args.hash ? '[name]-[chunkhash].js' : '[name].js';
  const cssFileName = args.hash ? '[name]-[chunkhash].css' : '[name].css';
  const commonName = args.hash ? 'common-[chunkhash].js' : 'common.js';

  return {

    output: {
      path: join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    devtool: 'devtool' in args ? args.devtool : '#source-map',

    resolve: {
      root: join(__dirname, '../node_modules'),
      extensions: ['', '.js', '.jsx'],
    },

    resolveLoader: {
      root: join(__dirname, '../node_modules'),
    },

    entry: pkg.entry,

    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loaders: ['babel?stage=0'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel?stage=0',
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&-restructuring!' +
            'autoprefixer-loader'
          ),
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            'autoprefixer-loader!' +
            `less?{"sourceMap":true,"modifyVars":${JSON.stringify(pkg.theme || {})}`
          ),
        },
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
        {test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000'},
      ],
    },

    externals: {
      jquery: 'window.jQuery',
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common', commonName),
      new ExtractTextPlugin(cssFileName, {
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
  };
}
