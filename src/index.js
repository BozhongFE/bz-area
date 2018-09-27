// import ObjectAssign from 'object-assign';
// Object.assign = ObjectAssign;
import './style.css';
import htmlHandler from './html';
import jsonp from './jsonp';
import Event from './event';
import {
  isNumber,
  isFunction,
  isEmpty,
  queue,
  getTarget,
  getLink,
} from './util';

class BzArea {
  constructor(opts) {
    // 参数集合
    this.opts = Object.assign({
      // 详细级别、默认省市区3级
      level: 3,
      timestamp: new Date().getTime(),
      format(data) {
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
  }

  static init(self) {
    // init dom
    this.initdom(self);
    // init event
    this.addEvent(self);
    // load area data
    this.request(undefined, undefined, self);
  }

  static initdom(instance) {
    const self = instance;
    const div = document.createElement('div');
    div.innerHTML = htmlHandler.box(self.opts);
    document.body.appendChild(div);
    self.$el = document.querySelector(`#bz-area-${self.opts.timestamp}`);
    self.$mask = self.$el.querySelector('.bz-area--mask');
    self.$close = self.$el.querySelector('.bz-area--close');
    self.$nav = self.$el.querySelector('.bz-area__nav');
    self.$list = self.$el.querySelector('.bz-area__bd');
  }

  static addEvent(instance) {
    const self = instance;
    self.$mask.onclick = () => {
      self.hide();
    };
    self.$close.onclick = () => {
      self.hide();
    };

    // tab切换省市区
    self.$nav.addEventListener('click', (e) => {
      const target = getTarget(e.target, 'bz-area__nav', 'bz-area__nav__item');
      if (target) {
        const index = Number(target.dataset.index);
        if (!isEmpty(target.dataset.index)) {
          self.value.navSelected = index;
          this.render(self);
        }
      }
    }, false);

    // 列表选择省市区
    self.$list.addEventListener('click', (e) => {
      const target = getTarget(e.target, 'bz-area__list', 'bz-area__list__item');
      if (target) {
        const index = Number(target.dataset.index);
        const { navSelected, listSelected, list } = self.value;

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
            const nowNav = self.value.navSelected;
            BzArea.request(list[navSelected][index].id, () => {
              // 部分地区没有下一级数据，需提前回调出去（天津市河东区xx街道，没有第四级数据）
              if (self.value.navSelected < nowNav) {
                BzArea.successCallback(self);
              }
            }, self);
          } else {
            // 成功后回调出去
            this.render(self);
            BzArea.successCallback(self);
          }
        }
      }
    }, false);
  }

  static successCallback(self) {
    setTimeout(() => {
      self.event.emit('success', self.opts.format(self.value.listSelected.map((columnIndex, index) => self.value.list[index][columnIndex])));
      self.hide();
    }, 100);
  }

  static request(id = 0, callback, instance) {
    const self = instance;
    const { navSelected, listSelected, list } = self.value;
    // 数据载入，并清除过往数据
    const dataHandler = (data) => {
      list[navSelected] = self.apidata[id];
      if (data.length === 0) {
        self.value.navSelected -= 1;
        listSelected.splice(navSelected);
        list.splice(navSelected);
      }
    };
    if (isEmpty(self.apidata[id])) {
      jsonp(`${getLink('common')}/bbs/common_district.jsonp`, {
        upid: id,
      }, '__c', (data) => {
        if (data.error_code === 0) {
          self.apidata[id] = data.data;
          dataHandler(self.apidata[id]);
          this.render(self);
          if (isFunction(callback)) callback();
        }
      });
    } else {
      dataHandler(self.apidata[id]);
      this.render(self);
      if (isFunction(callback)) callback();
    }
  }

  static render(self) {
    this.rendernav(self);
    this.renderList(self);
  }

  static rendernav(instance) {
    const self = instance;
    const navsData = self.value.list.map((item, index) => {
      if (isEmpty(self.value.listSelected[index])) {
        return {
          name: '请选择',
        };
      }
      return {
        name: item[self.value.listSelected[index]].name,
      };
    });
    const nav = htmlHandler.nav({
      navSelected: self.value.navSelected,
      navs: navsData,
    });
    self.$nav.innerHTML = nav;
  }

  static renderList(instance) {
    const self = instance;
    const list = htmlHandler.list({
      navSelected: self.value.navSelected,
      listSelected: self.value.listSelected,
      list: self.value.list,
    });
    self.$list.innerHTML = list;
  }

  show() {
    this.$el.style.display = 'block';
  }

  hide() {
    this.$el.style.display = 'none';
    this.event.emit('hide');
  }

  on(type, callback) {
    this.event.on(type, callback);
    return this;
  }

  set(area) {
    if (area && area.length > 0) {
      // 异步数组
      queue(area, (name, index, next) => {
        let id = 0;
        // 还原数据
        if (index === 0) {
          this.value.navSelected = 0;
          this.value.listSelected = [];
          this.value.list = [];
        }
        // 获取当前省市区的id
        if (index - 1 >= 0
          && !isEmpty(this.value.list[index - 1])
          && isNumber(this.value.listSelected[index - 1])
          && this.value.list[index - 1][this.value.listSelected[index - 1]]) {
          const { id: selectId } = this.value.list[index - 1][this.value.listSelected[index - 1]];
          id = selectId;
        }
        // 通过id加载对应数据
        BzArea.request(id, () => {
          if (this.value.list[index]) {
            if (name) {
              const listIndex = this.value.list[index].findIndex(item => item.name === name);
              if (listIndex !== -1) {
                this.value.listSelected[index] = listIndex;
                if (this.value.navSelected < this.opts.level - 1) {
                  this.value.navSelected += 1;
                  BzArea.render(this);
                  next();
                } else {
                  BzArea.render(this);
                }
              }
            }
          } else {
            /* eslint-disable no-console */
            console.warn(`id:${id} 对应的数据不存在`);
            /* eslint-enable no-console */
          }
        }, this);
      });
    }
  }

  destroy() {
    this.$el.parentElement.removeChild(this.$el);
  }
}

export default BzArea;
