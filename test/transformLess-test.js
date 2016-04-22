import { join } from 'path';
import { readFileSync } from 'fs';
import expect from 'expect';
import transformLess from '../src/transformLess';

const cwd = process.cwd();

describe('lib/transformLess', () => {
  const expected = `.b {
  color: red;
}
.a {
  color: '#ccc';
  -webkit-transform: translateX(1);
      -ms-transform: translateX(1);
          transform: translateX(1);
}
.a .foo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
`;

  it('should build normally', () => {
    return transformLess('./test/fixtures/transformLess/a.less', { cwd })
      .then(result => {
        expect(result).toEqual(expected);
      });
  });
});
