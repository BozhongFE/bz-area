export default class Event {
  constructor() {
    this.queues = {};
  }

  on(type, callback) {
    // 注意内部不要覆盖内置事件
    this[type] = callback;
  }

  off(type) {
    if (this[type]) {
      delete this[type];
    }
  }

  emit(type, data) {
    if (this[type]) {
      this[type](data);
    }
  }
}
