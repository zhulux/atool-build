import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import getBabelCommonConfig from './getBabelCommonConfig';
import { join } from 'path';

try {
  require('babel-core-resolve-enhance')({
    dirname: __dirname,
  });
} catch (e) {
  console.error(`[Error] ${e.message}`);
}

export default function getWebpackCommonConfig(args) {
  const pkg = require(join(args.cwd, 'package.json'));

  const jsFileName = args.hash ? '[name]-[chunkhash].js' : '[name].js';
  const cssFileName = args.hash ? '[name]-[chunkhash].css' : '[name].css';
  const commonName = args.hash ? 'common-[chunkhash].js' : 'common.js';

  const babelQuery = getBabelCommonConfig();

  const emptyBuildins = ['child_process', 'cluster', 'dgram', 'dns', 'fs', 'module', 'net', 'readline', 'repl', 'tls'];

  const browser = pkg.browser || {};

  const node = emptyBuildins.reduce((obj, name) => {
    if (!(name in browser)) {
      obj[name] = 'empty';
    }
    return obj;
  }, {});


  return {

    output: {
      path: join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    devtool: args.devtool,

    resolve: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
      extensions: ['', '.js', '.jsx'],
    },

    resolveLoader: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')]
    },

    entry: pkg.entry,

    node,

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: babelQuery,
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
            `less?{"sourceMap":true,"modifyVars":${JSON.stringify(pkg.theme || {})}}`
          ),
        },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
        { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' },
        { test: /\.json$/, loader: 'json' },
      ],
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
