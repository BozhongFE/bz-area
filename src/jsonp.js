export default (xurl = '', xdata = {}, xmethod = '__c', xcallback = () => {}) => {
  let url = xurl;
  const data = xdata;
  let method = xmethod;
  let callback = xcallback;
  if (url === '' || typeof url !== 'string') {
    /* eslint-disable no-alert */
    alert('url不正确');
    /* eslint-enable no-alert */
    return false;
  }

  url += '?';

  // 处理外部传入的参数
  if (typeof data === 'object') {
    let params = '';
    Object.keys(data).forEach((key) => {
      params += `${key}=${data[key]}&`;
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


  const jsonpScript = document.createElement('script');
  const timestamp = new Date().getTime();
  const generatedFunction = `jsonp${Math.round(timestamp + (Math.random() * 1000001))}`;

  window[generatedFunction] = (json) => {
    callback(json);
    delete window[generatedFunction];
    document.getElementsByTagName('head')[0].removeChild(jsonpScript);
  };

  jsonpScript.setAttribute('src', `${url + method}=${generatedFunction}`);
  jsonpScript.onerror = () => {
    /* eslint-disable no-alert */
    alert('网络异常');
    /* eslint-enable no-alert */
    delete window[generatedFunction];
  };
  document.getElementsByTagName('head')[0].appendChild(jsonpScript);

  window.setTimeout(() => {
    if (typeof window[generatedFunction] === 'function') {
      // replace success with null callback in case the request is just very latent.
      window[generatedFunction] = () => {
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
      // alert('请求超时');
      /* eslint-enable no-alert */

      // set a longer timeout to safely clean up the unused callback.
      window.setTimeout(() => {
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
};
