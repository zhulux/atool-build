import 'jest.automockoff';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import build from '../build';
import assign from 'object-assign';

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
});
