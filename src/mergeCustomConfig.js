import { join } from 'path';
import { existsSync } from 'fs';
import isPlainObject from 'is-plain-object';

/**
 * Merge custom config from `webpack.config.js`.
 * @param webpackConfig {Object}
 * @param baseDir {String}
 * @param type {String} production or development
 */
export default function mergeCustomConfig(webpackConfig, baseDir, type) {
  const configPath = join(baseDir, 'webpack.config.js');

  if (!existsSync(configPath)) {
    return webpackConfig;
  }

  const customConfig = require(configPath);

  if (isPlainObject(customConfig)) {
    return customConfig;
  } else if (typeof customConfig === 'function') {
    return customConfig(webpackConfig, type);
  }

  throw new Error('Return of webpack.config.js must be object or function.');
}
