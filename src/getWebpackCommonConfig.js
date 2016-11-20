import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import getBabelCommonConfig from './getBabelCommonConfig';
import getTSCommonConfig from './getTSCommonConfig';
import { existsSync } from 'fs';
import { join } from 'path';
import autoprefixer from 'autoprefixer';

export default function getWebpackCommonConfig(args) {
  const pkgPath = join(args.cwd, 'package.json');
  const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

  const jsFileName = args.hash ? '[name]-[chunkhash].js' : '[name].js';
  const cssFileName = args.hash ? '[name]-[chunkhash].css' : '[name].css';
  const commonName = args.hash ? 'common-[chunkhash].js' : 'common.js';

  const babelQuery = getBabelCommonConfig();
  const tsQuery = getTSCommonConfig();
  tsQuery.declaration = false;

  const emptyBuildins = [
    'child_process',
    'cluster',
    'dgram',
    'dns',
    'fs',
    'module',
    'net',
    'readline',
    'repl',
    'tls',
  ];

  const browser = pkg.browser || {};

  const node = emptyBuildins.reduce((obj, name) => {
    if (!(name in browser)) {
      return { ...obj, ...{ [name]: 'empty' } };
    }
    return obj;
  }, {});


  return {

    babel: babelQuery,
    ts: {
      transpileOnly: true,
      compilerOptions: tsQuery,
    },

    output: {
      path: join(process.cwd(), './dist/'),
      filename: jsFileName,
      chunkFilename: jsFileName,
    },

    devtool: args.devtool,

    resolve: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
      extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    resolveLoader: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
    },

    entry: pkg.entry,

    node,

    module: {
      noParse: [/moment.js/],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: babelQuery,
        },
        {
          test: /\.jsx$/,
          loader: 'babel',
          query: babelQuery,
        },
        {
          test: /\.tsx?$/,
          loaders: ['babel', 'ts'],
        },
        {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&-restructuring&-autoprefixer!' +
            'postcss-loader'
          ),
        },
        {
          test: /\.module\.css$/,
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!' +
            'postcss-loader'
          ),
        },
        {
          test(filePath) {
            return /\.scss$/.test(filePath) && !/\.module\.scss$/.test(filePath);
          },
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&-autoprefixer!' +
            'postcss-loader!' +
            'sass-loader?{"sourceMap":true}'
          ),
        },
        {
          test: /\.module\.scss$/,
          loader: ExtractTextPlugin.extract(
            'css?sourceMap&modules&localIdentName=[name]__[local]--[hash:base64:4]&-autoprefixer!' +
            'postcss-loader!' +
            'sass-loader?{"sourceMap":true}'
          ),
        },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
        { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' },
        { test: /\.json$/, loader: 'json' },
        { test: /\.html?$/, loader: 'file?name=[name].[ext]' },
      ],
    },

    postcss: [
      autoprefixer({
        browsers: ['last 2 versions', 'ie > 10', 'iOS > 9', 'Android >= 5'],
      }),
    ],

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
