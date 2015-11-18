jest.autoMockOff();

import { join } from 'path';
const mergeCustomConfig = require('../mergeCustomConfig');

describe('lib/mergeCustomConfig', () => {

  it('should not replace if no config', () => {
    const baseDir = join(__dirname, 'fixtures/not-found');
    expect(mergeCustomConfig({a:1}, baseDir)).toEqual({a:1});
  });

  it('should replace if object', () => {
    const baseDir = join(__dirname, 'fixtures/mergeCustomConfig-object');
    expect(mergeCustomConfig({a:1}, baseDir)).toEqual({b:2});
  });

  it('should replace if function', () => {
    const baseDir = join(__dirname, 'fixtures/mergeCustomConfig-function');
    expect(mergeCustomConfig({a:1}, baseDir, 'production')).toEqual({a:'p'});
    expect(mergeCustomConfig({a:1}, baseDir, 'development')).toEqual({a:'d'});
  });

  it('should throw error if not object or function', () => {
    const baseDir = join(__dirname, 'fixtures/mergeCustomConfig-error');
    expect(() => {
      mergeCustomConfig({a:1}, baseDir);
    }).toThrow();
  });
});
