import 'jest.automockoff';
import { join } from 'path';
import mergeCustomConfig from '../mergeCustomConfig';

describe('lib/mergeCustomConfig', () => {

  it('should not replace if no config', () => {
    const baseDir = join(__dirname, 'fixtures/not-found');
    const customConfigPath = join(baseDir,'webpack.config.js');
    expect(mergeCustomConfig({a:1}, customConfigPath)).toEqual({a:1});
  });

  it('should replace if object', () => {
    const baseDir = join(__dirname, 'fixtures/mergeCustomConfig-object');
    const customConfigPath = join(baseDir,'webpack.config.js');
    expect(mergeCustomConfig({a:1}, customConfigPath)).toEqual({b:2});
  });

  it('should replace if function', () => {
    const baseDir = join(__dirname, 'fixtures/mergeCustomConfig-function');
    const customConfigPath = join(baseDir,'webpack.config.js');
    expect(mergeCustomConfig({a:1}, customConfigPath, 'production')).toEqual({a:'p'});
    expect(mergeCustomConfig({a:1}, customConfigPath, 'development')).toEqual({a:'d'});
  });

  it('should throw error if not object or function', () => {
    const baseDir = join(__dirname, 'fixtures/mergeCustomConfig-error');
    const customConfigPath = join(baseDir,'webpack.config.js');
    expect(() => {
      mergeCustomConfig({a:1}, customConfigPath);
    }).toThrow();
  });
});
