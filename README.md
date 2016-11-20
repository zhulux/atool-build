# lutool-build
[![Code Climate](https://codeclimate.com/github/zhulux/lutool-build/badges/gpa.svg)](https://codeclimate.com/github/zhulux/lutool-build) [![CircleCI branch](https://img.shields.io/circleci/project/github/zhulux/lutool-build/release.svg)]() [![npm](https://img.shields.io/npm/v/lutool-build.svg)]() [![license](https://img.shields.io/github/license/zhulux/lutool-build.svg)]()

基于 webpack 的构建封装， 在 atool-build 的基础上使用 Sass 替代了 LESS.

----

## 特性

- 基于 webpack 实现
- 支持通过 `webpack.config.js` 进行扩展 webpack 的配置项
- 支持 [stage-0](https://babeljs.io/docs/plugins/preset-stage-0), [es2015](https://babeljs.io/docs/plugins/preset-es2015), react 和 Sass
- 支持 hash 模式的构建, 并生成映射表 `map.json`  
- 支持 typescript

## 安装

```bash
$ npm i lutool-build --save
```

## 使用

```bash
$ lutool-build [options]
```

### 命令行参数

```bash
$ lutool-build -h
  
  Usage: lutool-build [options]
  
  Options:
  
    -h, --help                output usage information
    -v, --version             output the version number
    -o, --output-path <path>  output path
    -w, --watch [delay]       watch file changes and rebuild
    --hash                    build with hash and output map.json
    --publicPath <publicPath> webpack publicPath
    --devtool <devtool>       sourcemap generate method, default is null
    --config <path>           custom config path, default is webpack.config.js
    --no-compress             build without compress 
```

### 配置扩展

如果需要对内置的 webpack 配置进行修改, 可在项目根目录新建 `webpack.config.js` 进行扩展.


让 `webpack.config.js` 输出 `Function`, 比如:

```javascript
var path = require("path");
module.exports = function(webpackConfig) {
  webpackConfig.output.path = path.join(__dirname, './public');
  return webpackConfig;
};
```

参数:

- `webpackConfig` -- 默认配置, 修改后返回新的配置


参考[atool-build 基本使用](http://ant-tool.github.io/atool-build.html)


## FAQ

> 如何在 webpack.config.js 中引用 webpack ? (新增插件需要) 

`var webpack = require('lutool-build/lib/webpack');`

参考[#32](https://github.com/ant-tool/atool-build/issues/32)
