jest.autoMockOff();

import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
const build = require('../build');
const assign = require('object-assign');

function assert(actualDir, _expect) {
  const expectDir = join(__dirname, 'expect', _expect);
  const actualFiles = readdirSync(actualDir);
  const expectFiles = readdirSync(expectDir);

  expect(actualFiles.length).toEqual(expectFiles.length);

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
      debug: true,
      devtool: '',
    };

    build(assign({}, defaultConfig, args), err => {
      if (err) throw new Error(err);
      assert(outputPath, fixture);
      resolve();
    });
  });
}

describe('lib/build', () => {

  pit('should build', () => {
    return testBuild({hash:true}, 'build-normal');
  });
});
