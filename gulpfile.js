const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect');
const rollup = require('rollup');
const zlib = require('zlib');
const configObj = require('./config');
const builds = configObj.getAllBuilds();
const devBuilds = configObj.getDevBuilds();

function build(builds, isWatch) {
  builds.forEach(async (conf) => {
    try {
      await buildEntry(conf, isWatch);
    } catch(err) {
      console.error(err);
    }
  });
}

async function buildEntry (config, isWatch) {
  const isProd = !/dev\.js$/.test(config.output.file) && !/(\w+\.){2}js$/.test(config.output.file);
  // create a bundle
  const bundle = await rollup.rollup(config);

  // console.log(bundle.imports); // an array of external dependencies
  // console.log(bundle.exports); // an array of names exported by the entry point
  // console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  // const { code, map } = await bundle.generate(config.output);
  // or write the bundle to disk
  const res = await bundle.write(config.output);
  if (!isWatch) {
    if (isProd) {
      const zipped = await gzip(res.code);
      reportResult(config.output.file, res.code, `(gzipped: ${getSize(zipped)})`);
    } else {
      reportResult(config.output.file, res.code);
    }
  }
}

function reportResult (file, code, extra = '') {
  console.log(blue(`${path.relative(process.cwd(), file)} ${getSize(code)} ${extra}`));
}

function gzip (code) {
  return new Promise((resolve, reject) => {
    zlib.gzip(code, (err, zipped) => {
      if (err) return reject(err);
      resolve(zipped);
    });
  });
}

// 输出文件大小
function report () {

}


// 获取生成的文件大小
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}

gulp.task('default', async function () {
  build(builds);
});

gulp.task('build', async function () {
  build(builds);
});

gulp.task('dev-build', async function () {
  console.log(devBuilds);
  build(devBuilds, true);
});

gulp.task('dev', async function () {
  connect.server({
    livereload: true,
    port: 2333
  });
  gulp.watch('./src/**', ['dev-build']);
});