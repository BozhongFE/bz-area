const path = require('path');
const fs = require('fs');
const uglify = require('rollup-plugin-uglify').uglify;
const buble = require('rollup-plugin-buble');
// const autoprefixer = require('autoprefixer');
// const resolve = require('rollup-plugin-node-resolve');
// const commonjs = require('rollup-plugin-commonjs');
// const postcss = require('rollup-plugin-postcss');
// const cssnano = require('cssnano');
const config = require('./package.json');

const exists = fs.existsSync;
const name = config.name;
const version = config.version;
let modulePath = process.env.npm_config_bz_mod;
modulePath = path.resolve(__dirname, './dist');

// if (typeof modulePath === 'undefined') {
//   console.log('请先配置模块所在目录');
//   console.log('Example: npm config set bz-mod "D:\\source"');
//   throw new Error('没有配置模块路径');
// } else if (!exists(modulePath)) {
//   throw new Error('模块目录不存在，请检查配置的模块目录是否正确');
// } else {
//   modulePath = path.join(modulePath, name);
//   if (!exists(modulePath)) {
//     fs.mkdirSync(modulePath);
//   }

//   modulePath = path.join(modulePath, version);
//   if (!exists(modulePath)) {
//     fs.mkdirSync(modulePath);
//   }
// }

if (!exists('dist/')) {
  fs.mkdirSync('dist/');
}
if (!exists('cache/')) {
  fs.mkdirSync('cache/');
}

const builds = {
  'dev': {
    input: 'src/index.js',
    format: 'umd',
    moduleName: name,
    output: path.join('cache',name + '-dev.js'),
    plugins: [
      // resolve(),
      // commonjs()
    ]
  },
  'prod-debug': {
    input: 'src/index.js',
    format: 'umd',
    moduleName: name,
    output: path.join(modulePath, name + '-debug.js'),
    plugins: [
      // resolve(),
      // commonjs()
    ]
  },
  'prod': {
    input: 'src/index.js',
    format: 'umd',
    moduleName: name,
    output: path.join(modulePath, name + '.js'),
    plugins: [
      uglify(),
      // resolve(),
      // commonjs()
    ],
  },
};

function getConfig(opts) {
  const theConfig = {
    input: opts.input,
    output: {
      file: opts.output,
      format: opts.format,
      name: opts.moduleName,
      globals: opts.globals,
    },
    external: opts.external,
    plugins: [
      // postcss({
      //   plugins: [
      //     autoprefixer({ browsers: ['iOS >= 8', 'Android >= 4.4', 'not ie <= 8'] }),
      //     cssnano(),
      //   ],
      // }),
      buble(),
    ].concat(opts.plugins || []),
  };
  if (opts.sourceMap) {
    theConfig.sourceMap = opts.sourceMap;
  }

  return theConfig;
}

exports.getAllBuilds = () => Object.keys(builds).map(name => getConfig(builds[name]));
exports.getDevBuilds = () => Object.keys(builds).filter(name => {
  if (name === 'dev') {
    return name;
  }
}).map(name => getConfig(builds[name]));