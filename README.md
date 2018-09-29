播种网移动端省市区模块，UI基于em设计

## 命令

```shell
npm run dev
npm run build
npm run build:dist
npm run build:moe
npm run eslint
```

## 使用

### Using require.js
```js
require(['mod/bz-area/0.0.1/bz-area'], function (BzArea) {
  var bzArea = new BzArea({
    title: '所在地区',
    level: 3,
  });
  bzArea.on('success', (data) => {
    console.log(data);
  });
});
```

### Using npm

```bash
npm install https://github.com/BozhongFE/bz-area#v0.0.1
```

```js
import BzArea from 'bz-area';
const bzArea = new BzArea({
  level: 2,
  format: data => data.map(item => item.name), 
});
bzArea.on('success', (data) => {
  console.log(data);
});
```

## 配置参数

### new BzArea(options)

**options**

参数名 | 类型 | 描述
---- | ---- | ----
title | String | 模块顶部标题
level | Number | 地区级别，共4级（省、市、区、街道），默认：3
format | Function | 选完回调success前对数据进行格式化处理，并返回

## 实例方法

### show
显示模块

```js
bzArea.show();
```

### hide
关闭模块

```js
bzArea.hide();
```

### on
添加各个类型回调事件

```js
bzArea.on(type, callback);
```

参数 | 描述
---- | ----
type | 事件类型：success成功回调(可在options.format预先格式化数据))、hide关闭模块回调
callback | 对应的回调事件

### set
设置地区的值

```js
bzArea.set(area);
```

参数 | 描述
---- | ----
area | 设置的地区值(Array)，例如：['广东省', '广州市']

### destroy
销毁实例

```js
bzArea.destroy();
```

## 展示图

<p>
  <img src="screenshot.png" width="400">
</p>
