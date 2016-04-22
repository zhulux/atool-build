import less from 'less';
import { readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import postcss from 'postcss';
import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';

function transformLess(lessFile, config = {}) {
  const { cwd = process.cwd() } = config;
  const resolvedLessFile = resolve(cwd, lessFile);

  let data = readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');

  return new Promise((resolve, reject) => {

    // Do less compile
    const lessOpts = {
      paths: [ dirname(resolvedLessFile) ],
      filename: resolvedLessFile,
    };
    less.render(data, lessOpts)
      .then(result => {
        
        // Do postcss compile
        const plugins = [
          rucksack(),
          autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
          }),
        ];
        const source = result.css;
        const postcssOpts = {};

        postcss(plugins).process(source, postcssOpts)
          .then(result => {
            resolve(result.css);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });

  });
}

export default transformLess;
