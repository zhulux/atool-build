import sass from 'node-sass';
import path from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import packageImporter from 'node-sass-package-importer';

function transformSass(sassFile, config = {}) {
  const { cwd = process.cwd() } = config;
  const resolvedSassFile = path.resolve(cwd, sassFile);

  const plugins = [
    autoprefixer({
      browsers: ['last 2 versions', 'ie > 10', 'iOS > 9', 'Android >= 5'],
    }),
  ];
  const postcssOpts = {};

  const css = sass.renderSync({
    file: resolvedSassFile,
    importer: packageImporter,
  }).css.toString('utf-8');

  return new Promise((resolve, reject) => {
    postcss(plugins)
      .process(css, postcssOpts)
      .then(r => {
        resolve(r.css);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default transformSass;
