import { existsSync } from 'fs';
import isPlainObject from 'is-plain-object';

/**
 * Merge custom config from `webpack.config.js`.
 * @param webpackConfig {Object}
 * @param customConfigPath {String}
 */
export default function mergeCustomConfig(webpackConfig, customConfigPath) {
  const configPath = customConfigPath;

  if (!existsSync(configPath)) {
    return webpackConfig;
  }

  const customConfig = require(configPath);

  if (isPlainObject(customConfig)) {
    return customConfig;
  } else if (typeof customConfig === 'function') {
    return customConfig(webpackConfig);
  }

  throw new Error('Return of webpack.config.js must be object or function.');
}
