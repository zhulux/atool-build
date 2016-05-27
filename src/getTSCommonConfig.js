export default function ts() {
  return {
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    sourceMap: true,
    noExternalResolve: true,
  };
}
