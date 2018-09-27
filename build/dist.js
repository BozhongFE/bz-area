const builds = require('./config').getAllBuilds();
const handle= require('./build');

handle(builds.filter((item) => {
  if (item.temp.match(/dist/)) {
    delete item.temp;
    return item;
  }
}));