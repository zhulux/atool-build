import { join } from 'path';
import { readFileSync } from 'fs';
import expect from 'expect';
import transformSass from '../src/transformSass';

const cwd = process.cwd();

describe('lib/transformSass', () => {
  it('should build normally', () => {
    return transformSass('./test/fixtures/transformSass/a.scss', { cwd })
      .then(result => {
        const expected = readFileSync(join(cwd, './test/expect/transformSass/a.css'), 'utf-8');
        expect(result).toEqual(expected);
      });
  });
});
