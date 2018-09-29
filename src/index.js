import ObjectAssign from 'object-assign';
import 'array.findindex';
import './style.css';
import htmlHandler from './html';
import jsonp from './jsonp';
import Event from './event';
import {
  isFunction,
  isEmpty,
  asyncArray,
  getTarget,
  getLink,
} from './util';

Object.assign = ObjectAssign;

class BzArea {
  constructor(opts) {
    // 参数集合
    this.opts = Object.assign({
      // 详细级别、默认省市区3级
      level: 3,
      timestamp: new Date().getTime(),
      format: data => data.map(item => item.name),
    }, opts);
    // 自定义事件、及触发
    this.event = new Event();
    // 接口数据缓存，减少接口请求
    this.apidata = {};
    this.data = {
      // 省市区导航栏当前选中状态，默认展示第一列（即省列数据）
      tab: 0,
      // 列数据
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
          self.data.tab = index;
          this.render(self);
        }
      }
    }, false);

    // 列表选择省市区
    self.$list.addEventListener('click', (e) => {
      const target = getTarget(e.target, 'bz-area__list', 'bz-area__list__item');
      const parent = getTarget(e.target, 'bz-area__bd', 'bz-area__list');
      if (target && parent) {
        const index = Number(target.dataset.index);
        const listIndex = Number(parent.dataset.index);
        const { list } = self.data;

        // 同一个地区不作处理
        if (!isEmpty(index) && !isEmpty(listIndex) && list[listIndex].select !== index) {
          self.data.tab = listIndex;
          // 设置选中当前地区
          list[listIndex].select = index;
          // 清空选中的下级联动地区、及地区数据
          list.splice(listIndex + 1);
          this.render(self);
          // 限制联动级别数，默认省市区三级，可加第四级街道
          if (listIndex < self.opts.level - 1) {
            self.data.tab = listIndex + 1;
            const nowNav = listIndex + 1;
            BzArea.request(list[listIndex].list[index].id, () => {
              // 部分地区没有下一级数据，需提前回调出去（天津市河东区xx街道，没有第四级数据）
              if (self.data.tab < nowNav) {
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
      self.event.emit('success', self.opts.format(self.data.list.map(item => item.list[item.select])));
      self.hide();
    }, 100);
  }

  static request(id = 0, callback, instance) {
    const self = instance;
    const { tab, list } = self.data;
    // 数据载入，并清除过往数据
    const dataHandler = (data) => {
      list[tab] = {
        id,
        list: self.apidata[id],
      };
      if (data.length === 0) {
        self.data.tab -= 1;
        list.splice(tab);
      }
    };
    if (isEmpty(self.apidata[id])) {
      jsonp(`${getLink('common')}/bbs/common_district.jsonp`, {
        upid: id,
      }, '__c', (data) => {
        if (data.error_code === 0) {
          self.apidata[id] = data.data;
          const lastTab = self.data.tab - 1;
          const lastList = self.data.list[lastTab];
          if (!lastList || lastList.list[lastList.select].id === id) {
            dataHandler(self.apidata[id]);
            this.render(self);
            if (isFunction(callback)) callback();
          }
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
    const navsData = self.data.list.map((item) => {
      if (isEmpty(item.select)) {
        return {
          name: '请选择',
        };
      }
      return {
        name: item.list[item.select].name,
      };
    });
    const nav = htmlHandler.nav({
      tab: self.data.tab,
      navs: navsData,
    });
    self.$nav.innerHTML = nav;
  }

  static renderList(instance) {
    const self = instance;
    const $lists = self.$el.querySelectorAll('.bz-area__list');
    self.data.list.forEach((item, index) => {
      const dom = $lists[index];
      if (dom) {
        dom.style.display = (self.data.tab === index ? 'block' : 'none');
        const id = Number(dom.dataset.id);
        if (isEmpty(id) || id !== item.id) {
          dom.dataset.id = item.id;
          const html = htmlHandler.listItem({
            list: item.list,
          });
          dom.innerHTML = html;
        }
        const domItems = dom.querySelectorAll('.bz-area__list__item');
        for (let i = 0; i < domItems.length; i += 1) {
          const domItem = domItems[i];
          if (domItem.classList.contains('active')) {
            domItem.classList.remove('active');
          }
        }
        if (!isEmpty(item.select) && domItems[item.select]) {
          domItems[item.select].classList.add('active');
        }
      }
    });
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
    // 异步数组
    asyncArray(area, (name, index, next) => {
      let id = 0;
      const lastIndex = index - 1;
      // 还原数据
      if (index === 0) {
        this.data.tab = 0;
        this.data.list = [];
      }
      // 获取当前省市区的id
      if (lastIndex >= 0
        && this.data.list[lastIndex]
        && !isEmpty(this.data.list[lastIndex].select)
        && this.data.list[lastIndex].list[this.data.list[lastIndex].select]) {
        const { id: selectId } = this.data.list[lastIndex].list[this.data.list[lastIndex].select];
        id = selectId;
      }
      // 通过id加载对应数据
      BzArea.request(id, () => {
        if (this.data.list[index]) {
          if (name) {
            const listIndex = this.data.list[index].list.findIndex(item => item.name === name);
            if (listIndex !== -1) {
              this.data.list[index].select = listIndex;
              if (this.data.tab < this.opts.level - 1) {
                this.data.tab += 1;
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

  destroy() {
    this.$el.parentElement.removeChild(this.$el);
  }
}

export default BzArea;
