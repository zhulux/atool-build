import 'jest.automockoff';
import { join } from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import build from '../build';
import assign from 'object-assign';

function assert(actualDir, _expect) {
  const expectDir = join(__dirname, 'expect', _expect);
  const actualFiles = glob.sync('**/*', { cwd: actualDir, nodir: true });

  actualFiles.forEach(file => {
    const actualFile = readFileSync(join(actualDir, file), 'utf-8');
    const expectFile = readFileSync(join(expectDir, file), 'utf-8');
    expect(actualFile).toEqual(expectFile);
  });
}

function testBuild(args, fixture) {
  return new Promise(resolve => {
    const cwd = join(__dirname, 'fixtures', fixture);
    const outputPath = join(cwd, 'dist');
    process.chdir(cwd);

    const defaultConfig = {
      cwd,
      compress: false,
    };

    build(assign({}, defaultConfig, args), err => {
      if (err) throw new Error(err);
      assert(outputPath, fixture);
      resolve();
    });
  });
}

describe('lib/build', () => {
  pit('should build normally', () => {
    return testBuild({hash:true}, 'build-normal');
  });
  pit('should support class property', () => {
    return testBuild({}, 'build-class-property');
  });
  pit('should support less', () => {
    return testBuild({}, 'build-less');
  });
  pit('should support add-module-exports', () => {
    return testBuild({}, 'build-add-module-exports');
  });
  pit('should support jsx', () => {
    return testBuild({}, 'build-jsx');
  });
  pit('should support json', () => {
    return testBuild({}, 'build-json');
  });
  pit('should support node builtins', () => {
    return testBuild({}, 'build-node-builtins');
  });
  pit('should support mergeCustomConfig plugins', () => {
    return testBuild({hash:true}, 'build-mergeCustomConfig-plugins');
  });
  pit('should support mergeCustomConfig environment productio', () => {
    return testBuild({}, 'build-mergeCustomConfig-environment-production');
  });
  pit('should support mergeCustomConfig environment development', () => {
    process.env.NODE_ENV = 'development';
    return testBuild({}, 'build-mergeCustomConfig-environment-development');
  });
  pit('should support config', () => {
    return testBuild({config:'webpack.config.path.js'}, 'build-mergeCustomConfig-path');
  });
  pit('should support typescript', () => {
    return testBuild({}, 'build-typescript');
  });
  pit('should support dedupe', () => {
    return testBuild({}, 'build-dedupePlugin-enabled');
  });
  pit('should support hash map', () => {
    return testBuild({hash:true}, 'build-hash-map');
  });
});
