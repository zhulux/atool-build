module.exports = function(webpackConfig, environment) {
  webpackConfig.output.filename = "[name].js";
  webpackConfig.plugins = [];
  return webpackConfig;
}