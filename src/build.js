import { join } from 'path';
import rimraf from 'rimraf';
import webpack from 'webpack';
import mergeCustomConfig from './mergeCustomConfig';
import getWebpackCommonConfig from './getWebpackCommonConfig';

function getWebpackConfig(args) {
  let webpackConfig = getWebpackCommonConfig(args);

  // Config outputPath.
  if (args.outputPath) {
    webpackConfig.output.path = args.outputPath;
  }

  // Config if not debug.
  if (!args.debug) {
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          ascii_only: true,
        },
      }),
    ]);
  } else {
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ]);
  }

  // Output map.json if hash.
  if (args.hash) {
    webpackConfig.output.filename = webpackConfig.output.chunkFilename = '[name]-[chunkhash].js';
    webpackConfig.plugins = (webpackConfig.plugins).concat([
      require('map-json-webpack-plugin')({
        output: join(webpackConfig.output.path, 'map.json'),
      }),
    ]);
  }

  webpackConfig = mergeCustomConfig(webpackConfig, args.cwd, args.debug ? 'development' : 'production');

  return webpackConfig;
}

export default function(args, callback) {
  args.cwd = args.cwd || process.cwd();

  // Get config.
  const webpackConfig = getWebpackConfig(args);

  // Clean output dir first.
  rimraf.sync(webpackConfig.output.path);

  function doneHandler(err, stats) {
    const { errors} = stats.toJson();
    if (errors && errors.length) {
      process.on('exit', function exitHandler() {
        process.exit(1);
      });
    }

    console.log(stats.toString({colors: true}));

    if (err) {
      process.on('exit', function exitHandler() {
        process.exit(1);
      });
      console.error(err);
    }
    if (callback) {
      callback(err);
    }
  }

  // Run compiler.
  const compiler = webpack(webpackConfig);
  if (args.watch) {
    compiler.watch(args.watch || 200, doneHandler);
  } else {
    compiler.run(doneHandler);
  }
}
