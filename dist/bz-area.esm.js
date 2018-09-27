function styleInject(css, ref) {
  if ( ref === void 0 ) { ref = {}; }
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".bz-area{display:none;color:#333;font-size:20px;height:70%}.bz-area *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.bz-area .bzicon{display:inline-block;width:1.5em;height:1.5em;font-size:.6em}.bz-area .bzicon-check{position:relative;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.bz-area .bzicon-check:before{left:.4em;top:.6em;width:.1em;height:.6em}.bz-area .bzicon-check:after,.bz-area .bzicon-check:before{position:absolute;content:\"\";box-shadow:inset 0 0 0 1em;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.bz-area .bzicon-check:after{top:.9em;left:.9em;width:1em;height:.1em}.bz-area ul{list-style:none}.bz-area a{text-decoration:none;color:#333}.bz-area--mask{top:0;background:rgba(0,0,0,.6);z-index:1000}.bz-area--mask,.bz-area__container{position:fixed;left:0;right:0;bottom:0}.bz-area__container{z-index:2000;background:#fff;height:70%}.bz-area__hd{position:absolute;top:0;left:0;right:0;z-index:10}.bz-area__tips{position:relative;height:2.25em;line-height:2.25em;border-bottom:.05em solid #e5e5e5;box-sizing:border-box}.bz-area__tips h4{position:relative;display:block;text-align:center;font-weight:400;font-size:.75em;color:#000}.bz-area--close{position:absolute;top:0;right:0;bottom:0;width:2em;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaElEQVRYR8WWzU0DMRBGXyqgE240QQu0ECSQQMAh/IgDSIBAggZSBT1wpSE0kge8lteesddkL1Eie97z5+zYK3b8rHbMJxb4BL6Am8FSd8ABcCicWGANvAOPwNUgiQfgEjgGPlIB+X4CvA6SUPgp8KYLzP0HRkhk4bkEVGxJiVl4SWCp7SjCawK9ElW4RaBVwgS3CsQSt4C8x6XHDPcIxBLSI6RX5B4X3CtQk3DDWwRkjnQygcVJNMFbBVKJvSA16XDWVt5zGmoSwmqC9yQgc8+Ap7DS38PFunId15qAwjeh0D1wDjz/h4DCY2DuN5OLN4ESqEnCI2ABWMZMkrEKeAp7xk6uZHN75ioYipjn1BIwF8rYm+aWBOR2LKdf0+tlTWJOQBqMrKAHrqEUk8gJKLy5u3m2IxUYAS8mEQtch9vOkitPw9DtkM+X9DD6BrYt/dzUc/8GXQBHwH7vaejk5ofX+sAikFKRH72KaCGEmif9AAAAAElFTkSuQmCC) no-repeat;background-position:50%;background-size:36%}.bz-area__nav{position:relative;height:2em;-webkit-tap-highlight-color:rgba(0,0,0,0)}.bz-area__nav span{font-size:.65em;display:block;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bz-area__nav__item{position:relative;margin-left:.5em;padding:0 .1em;float:left;max-width:25%;height:1.9em;line-height:1.9em}.bz-area__nav.nav-level-4 .bz-area__nav__item{max-width:22%}.bz-area__nav__item.active{color:#fa791e}.bz-area__nav__item.active:after{position:absolute;left:0;bottom:-.1em;width:100%;height:.1em;content:\"\";z-index:2;background:#fa791e}.bz-area__nav:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:.05em;border-bottom:.05em solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.bz-area__bd{padding-top:4.25em;height:100%}.bz-area__list{display:none;height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch;-webkit-tap-highlight-color:rgba(0,0,0,0)}.bz-area__list span{font-size:.65em}.bz-area__list__item{position:relative;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;padding-left:1em;line-height:2em}.bz-area__list__item.active{color:#fa791e}.bz-area__list__item.active i{margin-left:.4em}";
styleInject(css);

var htmlHandler = {
  nav: function nav(opts) {
    var html = '';
    opts.navs.forEach(function (item, index) {
      html += "<a data-index=\"" + index + "\" href=\"javascript:;\" class=\"bz-area__nav__item " + (opts.navSelected === index ? 'active' : '') + "\"><span>" + (item.name) + "</span></a>";
    });
    return html;
  },
  list: function list(opts) {
    var html = '';
    opts.list.forEach(function (list, navSelected) {
      html += "<div class=\"bz-area__list\" style=\"display: " + (navSelected === opts.navSelected ? 'block' : 'none') + ";\">";
      list.forEach(function (item, index) {
        html += "<a data-index=\"" + index + "\" data-id=\"" + (item.id) + "\" class=\"bz-area__list__item " + (opts.listSelected[navSelected] === index ? 'active' : '') + "\"><span>" + (item.name) + "</span>" + (opts.listSelected[navSelected] === index ? '<i class="bzicon bzicon-check"></i>' : '') + "</a>";
      });
      html += '</div>';
    });
    return html;
  },
  box: function box(scope) {
    return ("<div class=\"bz-area\" id=\"bz-area-" + (scope.timestamp || new Date().getTime()) + "\">\n  <a class=\"bz-area--mask\" href=\"javascript:;\"></a>\n  <div class=\"bz-area__container\">\n    <div class=\"bz-area__hd\">\n      <div class=\"bz-area__tips\">\n        <h4>" + (scope.title || '') + "</h4>\n        <a class=\"bz-area--close\" href=\"javascript:;\"></a>\n      </div>\n      <div class=\"bz-area__nav nav-level-" + (scope.level) + "\">\n        " + (scope.nav || '') + "\n      </div>\n    </div>\n    <div class=\"bz-area__bd\">\n      " + (scope.list || '') + "\n    </div>\n  </div>\n</div>");
  },
};

function jsonp (xurl, xdata, xmethod, xcallback) {
  if ( xurl === void 0 ) xurl = '';
  if ( xdata === void 0 ) xdata = {};
  if ( xmethod === void 0 ) xmethod = '__c';
  if ( xcallback === void 0 ) xcallback = function () {};

  var url = xurl;
  var data = xdata;
  var method = xmethod;
  var callback = xcallback;
  if (url === '' || typeof url !== 'string') {
    /* eslint-disable no-alert */
    alert('url不正确');
    /* eslint-enable no-alert */
    return false;
  }

  url += '?';

  // 处理外部传入的参数
  if (typeof data === 'object') {
    var params = '';
    Object.keys(data).forEach(function (key) {
      params += key + "=" + (data[key]) + "&";
    });
    if (params !== '') {
      url += params;
    }
    if (typeof method === 'function') {
      callback = method;
      method = '__c';
    }
  } else if (typeof data === 'function') {
    callback = data;
  } else {
    callback = method;
    method = data;
  }


  var jsonpScript = document.createElement('script');
  var timestamp = new Date().getTime();
  var generatedFunction = "jsonp" + (Math.round(timestamp + (Math.random() * 1000001)));

  window[generatedFunction] = function (json) {
    callback(json);
    delete window[generatedFunction];
    document.getElementsByTagName('head')[0].removeChild(jsonpScript);
  };

  jsonpScript.setAttribute('src', ((url + method) + "=" + generatedFunction));
  document.getElementsByTagName('head')[0].appendChild(jsonpScript);

  window.setTimeout(function () {
    if (typeof window[generatedFunction] === 'function') {
      // replace success with null callback in case the request is just very latent.
      window[generatedFunction] = function () {
        try {
          delete window[generatedFunction];
        } catch (e) {
          /* eslint-disable no-console */
          console.error(e);
          /* eslint-enable no-console */
        }
        window[generatedFunction] = null;
      };

      // call the error callback
      /* eslint-disable no-alert */
      alert('请求超时');
      /* eslint-enable no-alert */

      // set a longer timeout to safely clean up the unused callback.
      window.setTimeout(function () {
        if (typeof window[generatedFunction] === 'function') {
          try {
            delete window[generatedFunction];
          } catch (e) {
            /* eslint-disable no-console */
            console.error(e);
            /* eslint-enable no-console */
          }
          window[generatedFunction] = null;
        }
      }, 20000);
    }
  }, 10000);
  return false;
}

var Event = function Event() {
  this.queues = {};
};

Event.prototype.on = function on (type, callback) {
  // 注意内部不要覆盖内置事件
  this[type] = callback;
};

Event.prototype.off = function off (type) {
  if (this[type]) {
    delete this[type];
  }
};

Event.prototype.emit = function emit (type, data) {
  if (this[type]) {
    this[type](data);
  }
};

var getType = function (val) { return Object.prototype.toString.call(val); };
var isOject = function (val) { return getType(val) === '[object Object]'; };
var isArray = function (val) { return getType(val) === '[object Array]'; };
var isString = function (val) { return getType(val) === '[object String]'; };
var isUndefined = function (val) { return getType(val) === '[object Undefined]'; };
var isNull = function (val) { return getType(val) === '[object Null]'; };
var isFunction = function (val) { return getType(val) === '[object Function]'; };
var isNumber = function (val) { return getType(val) === '[object Number]'; };
var isEmpty = function (val) {
  if (isUndefined(val) || isNull(val)) {
    return true;
  }
  if (isArray(val)) {
    return val.length === 0;
  }
  if (isString(val)) {
    return val.length === '';
  }
  if (isNumber(val)) {
    /* eslint no-restricted-globals:0 */
    return isNaN(val);
  }
  if (isOject(val)) {
    return Object.keys(val).length === 0;
  }
  return false;
};

// 普通数组转为自定义异步队列
var queue = function (arr, callback) {
  if (!isEmpty(arr)) {
    var index = -1;
    var next = function () {
      index += 1;
      if (index <= arr.length) {
        if (isFunction(callback)) { callback(arr[index], index, next); }
      }
    };
    next();
  }
};

// 辅助事件冒泡，找到对应的DOM元素
var getTarget = function (target, excludeClassName, includeClassName) {
  if (isEmpty(includeClassName)) {
    /* eslint-disable no-console */
    console.warn('includeClassName is empty');
    /* eslint-enable no-console */
    return null;
  }
  var queryTarget = function (ele) {
    if (!ele || !ele.classList || ele.classList.contains(excludeClassName)) {
      return null;
    }
    if (ele.classList.contains(includeClassName)) {
      return ele;
    }
    return queryTarget(ele.parentElement);
  };
  return queryTarget(target);
};

var getLink = function (prefix, productPrefix) {
  var ref = window.location;
  var host = ref.host;
  var protocol = ref.protocol;
  var prodPrefix = productPrefix || prefix;

  if (host.indexOf('bozhong') !== -1) {
    return (protocol + "//" + prodPrefix + ".bozhong.com");
  }
  if (host.indexOf('online') !== -1) {
    return (protocol + "//" + prefix + ".online.seedit.cc");
  }
  return (protocol + "//" + prefix + ".office.bzdev.net");
};

// import ObjectAssign from 'object-assign';

var BzArea = function BzArea(opts) {
  // 参数集合
  this.opts = Object.assign({
    // 详细级别、默认省市区3级
    level: 3,
    timestamp: new Date().getTime(),
    format: function format(data) {
      return data;
    },
  }, opts);
  // 自定义事件、及触发
  this.event = new Event();
  // 接口数据缓存，减少接口请求
  this.apidata = {};
  this.value = {
    // 省市区导航栏当前选中状态，默认展示第一列（即省列数据）
    navSelected: 0,
    // 列数据选中的索引（索引二维数组）
    listSelected: [],
    // 列数据（二维数组）
    list: [],
  };
  BzArea.init(this);
};

BzArea.init = function init (self) {
  // init dom
  this.initdom(self);
  // init event
  this.addEvent(self);
  // load area data
  this.request(undefined, undefined, self);
};

BzArea.initdom = function initdom (instance) {
  var self = instance;
  var div = document.createElement('div');
  div.innerHTML = htmlHandler.box(self.opts);
  document.body.appendChild(div);
  self.$el = document.querySelector(("#bz-area-" + (self.opts.timestamp)));
  self.$mask = self.$el.querySelector('.bz-area--mask');
  self.$close = self.$el.querySelector('.bz-area--close');
  self.$nav = self.$el.querySelector('.bz-area__nav');
  self.$list = self.$el.querySelector('.bz-area__bd');
};

BzArea.addEvent = function addEvent (instance) {
    var this$1 = this;

  var self = instance;
  self.$mask.onclick = function () {
    self.hide();
  };
  self.$close.onclick = function () {
    self.hide();
  };

  // tab切换省市区
  self.$nav.addEventListener('click', function (e) {
    var target = getTarget(e.target, 'bz-area__nav', 'bz-area__nav__item');
    if (target) {
      var index = Number(target.dataset.index);
      if (!isEmpty(target.dataset.index)) {
        self.value.navSelected = index;
        this$1.render(self);
      }
    }
  }, false);

  // 列表选择省市区
  self.$list.addEventListener('click', function (e) {
    var target = getTarget(e.target, 'bz-area__list', 'bz-area__list__item');
    if (target) {
      var index = Number(target.dataset.index);
      var ref = self.value;
        var navSelected = ref.navSelected;
        var listSelected = ref.listSelected;
        var list = ref.list;

      // 同一个地区不作处理
      if (!isEmpty(index) && listSelected[navSelected] !== index) {
        // 设置选中当前地区
        listSelected[navSelected] = index;
        // 清空选中的下级联动地区、及地区数据
        listSelected.splice(navSelected + 1);
        list.splice(navSelected + 1);
        // 限制联动级别数，默认省市区三级，可加第四级街道
        if (navSelected < self.opts.level - 1) {
          self.value.navSelected += 1;
          var nowNav = self.value.navSelected;
          BzArea.request(list[navSelected][index].id, function () {
            // 部分地区没有下一级数据，需提前回调出去（天津市河东区xx街道，没有第四级数据）
            if (self.value.navSelected < nowNav) {
              BzArea.successCallback(self);
            }
          }, self);
        } else {
          // 成功后回调出去
          this$1.render(self);
          BzArea.successCallback(self);
        }
      }
    }
  }, false);
};

BzArea.successCallback = function successCallback (self) {
  setTimeout(function () {
    self.event.emit('success', self.opts.format(self.value.listSelected.map(function (columnIndex, index) { return self.value.list[index][columnIndex]; })));
    self.hide();
  }, 100);
};

BzArea.request = function request (id, callback, instance) {
    var this$1 = this;
    if ( id === void 0 ) id = 0;

  var self = instance;
  var ref = self.value;
    var navSelected = ref.navSelected;
    var listSelected = ref.listSelected;
    var list = ref.list;
  // 数据载入，并清除过往数据
  var dataHandler = function (data) {
    list[navSelected] = self.apidata[id];
    if (data.length === 0) {
      self.value.navSelected -= 1;
      listSelected.splice(navSelected);
      list.splice(navSelected);
    }
  };
  if (isEmpty(self.apidata[id])) {
    jsonp(((getLink('common')) + "/bbs/common_district.jsonp"), {
      upid: id,
    }, '__c', function (data) {
      if (data.error_code === 0) {
        self.apidata[id] = data.data;
        dataHandler(self.apidata[id]);
        this$1.render(self);
        if (isFunction(callback)) { callback(); }
      }
    });
  } else {
    dataHandler(self.apidata[id]);
    this.render(self);
    if (isFunction(callback)) { callback(); }
  }
};

BzArea.render = function render (self) {
  this.rendernav(self);
  this.renderList(self);
};

BzArea.rendernav = function rendernav (instance) {
  var self = instance;
  var navsData = self.value.list.map(function (item, index) {
    if (isEmpty(self.value.listSelected[index])) {
      return {
        name: '请选择',
      };
    }
    return {
      name: item[self.value.listSelected[index]].name,
    };
  });
  var nav = htmlHandler.nav({
    navSelected: self.value.navSelected,
    navs: navsData,
  });
  self.$nav.innerHTML = nav;
};

BzArea.renderList = function renderList (instance) {
  var self = instance;
  var list = htmlHandler.list({
    navSelected: self.value.navSelected,
    listSelected: self.value.listSelected,
    list: self.value.list,
  });
  self.$list.innerHTML = list;
};

BzArea.prototype.show = function show () {
  this.$el.style.display = 'block';
};

BzArea.prototype.hide = function hide () {
  this.$el.style.display = 'none';
  this.event.emit('hide');
};

BzArea.prototype.on = function on (type, callback) {
  this.event.on(type, callback);
  return this;
};

BzArea.prototype.set = function set (area) {
    var this$1 = this;

  if (area && area.length > 0) {
    // 异步数组
    queue(area, function (name, index, next) {
      var id = 0;
      // 还原数据
      if (index === 0) {
        this$1.value.navSelected = 0;
        this$1.value.listSelected = [];
        this$1.value.list = [];
      }
      // 获取当前省市区的id
      if (index - 1 >= 0
        && !isEmpty(this$1.value.list[index - 1])
        && isNumber(this$1.value.listSelected[index - 1])
        && this$1.value.list[index - 1][this$1.value.listSelected[index - 1]]) {
        var ref = this$1.value.list[index - 1][this$1.value.listSelected[index - 1]];
          var selectId = ref.id;
        id = selectId;
      }
      // 通过id加载对应数据
      BzArea.request(id, function () {
        if (this$1.value.list[index]) {
          if (name) {
            var listIndex = this$1.value.list[index].findIndex(function (item) { return item.name === name; });
            if (listIndex !== -1) {
              this$1.value.listSelected[index] = listIndex;
              if (this$1.value.navSelected < this$1.opts.level - 1) {
                this$1.value.navSelected += 1;
                BzArea.render(this$1);
                next();
              } else {
                BzArea.render(this$1);
              }
            }
          }
        } else {
          /* eslint-disable no-console */
          console.warn(("id:" + id + " 对应的数据不存在"));
          /* eslint-enable no-console */
        }
      }, this$1);
    });
  }
};

BzArea.prototype.destroy = function destroy () {
  this.$el.parentElement.removeChild(this.$el);
};

export default BzArea;
