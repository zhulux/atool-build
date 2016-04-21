import modifyBabelPreset from 'modify-babel-preset';
export default modifyBabelPreset('babel-preset-es2015', {
  'babel-plugin-transform-es2015-classes': {
    loose: true,
  },
});
