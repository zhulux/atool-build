import { join } from 'path';
import shelljs from 'shelljs';
import webpack from 'webpack';
import assign from 'object-assign';
import printResult from './printResult';
import mergeCustomConfig from './mergeCustomConfig';
import commonConfig from './webpack.common.config';

export default function(args) {
  const cwd = process.cwd();
  const webpackConfig = mergeCustomConfig(commonConfig, cwd, 'production');

  // Config if not debug
  if (!args.debug) {
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          ascii_only: true
        }
      }),
    ]);
  }

  // Config outputPath.
  if (args.outputPath) {
    webpackConfig.output.path = args.outputPath;
  }

  // Clean output dir first.
  shelljs.rm('-rf', join(cwd, webpackConfig.output.path));

  // Run compiler.
  var compiler = webpack(webpackConfig);
  if (args.watch) {
    compiler.watch(args.watch || 200, doneHandler);
  } else {
    compiler.run(doneHandler);
  }
};

function doneHandler(err, stats) {
  printResult(stats);
  console.log(stats.toString());
  if (err) {
    console.error(err);
  }
}
