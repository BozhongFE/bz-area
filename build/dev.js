const builds = require('./config').getAllBuilds();
const handle= require('./build');

handle(builds.filter((item) => {
  if (item.temp.match(/dev/)) {
    delete item.temp;
    return item;
  }
}));