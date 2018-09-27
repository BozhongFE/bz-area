export const getType = val => Object.prototype.toString.call(val);
export const isOject = val => getType(val) === '[object Object]';
export const isArray = val => getType(val) === '[object Array]';
export const isString = val => getType(val) === '[object String]';
export const isUndefined = val => getType(val) === '[object Undefined]';
export const isNull = val => getType(val) === '[object Null]';
export const isFunction = val => getType(val) === '[object Function]';
export const isNumber = val => getType(val) === '[object Number]';
export const isEmpty = (val) => {
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
export const queue = (arr, callback) => {
  if (!isEmpty(arr)) {
    let index = -1;
    const next = () => {
      index += 1;
      if (index <= arr.length) {
        if (isFunction(callback)) callback(arr[index], index, next);
      }
    };
    next();
  }
};

// 辅助事件冒泡，找到对应的DOM元素
export const getTarget = (target, excludeClassName, includeClassName) => {
  if (isEmpty(includeClassName)) {
    /* eslint-disable no-console */
    console.warn('includeClassName is empty');
    /* eslint-enable no-console */
    return null;
  }
  const queryTarget = (ele) => {
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

export const getLink = (prefix, productPrefix) => {
  const { host, protocol } = window.location;
  const prodPrefix = productPrefix || prefix;

  if (host.indexOf('bozhong') !== -1) {
    return `${protocol}//${prodPrefix}.bozhong.com`;
  }
  if (host.indexOf('online') !== -1) {
    return `${protocol}//${prefix}.online.seedit.cc`;
  }
  return `${protocol}//${prefix}.office.bzdev.net`;
};
