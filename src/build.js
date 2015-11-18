import { join } from 'path';
import rimraf from 'rimraf';
import webpack from 'webpack';
import printResult from './printResult';
import mergeCustomConfig from './mergeCustomConfig';
import getWebpackCommonConfig from './getWebpackCommonConfig';

const cwd = process.cwd();

function getWebpackConfig(args) {
  const webpackConfig = mergeCustomConfig(getWebpackCommonConfig(args), cwd, 'production');

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

  return webpackConfig;
}

export default function(args) {
  // Get config.
  const webpackConfig = getWebpackConfig(args);

  // Clean output dir first.
  rimraf.sync(webpackConfig.output.path);

  function doneHandler(err, stats) {
    printResult(stats);
    console.log(stats.toString());
    if (err) {
      console.error(err);
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
