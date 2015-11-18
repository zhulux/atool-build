jest.autoMockOff();

import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
const build = require('../build');

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

describe('lib/build', () => {

  pit('should build', () => {
    const cwd = join(__dirname, 'fixtures/build-normal');
    const outputPath = join(cwd, 'dist');
    process.chdir(cwd);

    return new Promise(resolve => {
      build({
        cwd,
        hash: true,
        debug: true,
        devtool: '',
      }, err => {
        if (err) throw new Error(err);
        assert(outputPath, 'build-normal');
        resolve();
      });
    });
  });
});
