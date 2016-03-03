export default () => {
  return {
    cacheDirectory: true,
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports', 'typecheck', 'transform-decorators-legacy'],
  };
};
