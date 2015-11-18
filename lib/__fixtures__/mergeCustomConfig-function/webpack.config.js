
export default function customConfig(webpackConfig, environment) {
  if (environment === 'production') {
    webpackConfig.a = 'p';
  } else if (environment === 'development') {
    webpackConfig.a = 'd';
  }

  return webpackConfig;
};
