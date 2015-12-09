
export default function customConfig(webpackConfig) {
  if (process.env.NODE_ENV === 'production') {
    webpackConfig.a = 'p';
  } else if (process.env.NODE_ENV === 'development') {
    webpackConfig.a = 'd';
  }

  return webpackConfig;
};
