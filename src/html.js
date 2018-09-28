export default {
  nav(opts) {
    let html = '';
    opts.navs.forEach((item, index) => {
      html += `<a data-index="${index}" href="javascript:;" class="bz-area__nav__item ${opts.tab === index ? 'active' : ''}"><span>${item.name}</span></a>`;
    });
    return html;
  },
  listItem({ list }) {
    if (list.length === 0) {
      return '';
    }
    let html = '';
    list.forEach((item, index) => {
      html += `<a data-index="${index}" data-id="${item.id}" class="bz-area__list__item"><span>${item.name}</span><i class="bzicon bzicon-check"></i></a>`;
    });
    return html;
  },
  box(scope) {
    return `<div class="bz-area" id="bz-area-${scope.timestamp || new Date().getTime()}">
  <a class="bz-area--mask" href="javascript:;"></a>
  <div class="bz-area__container">
    <div class="bz-area__hd">
      <div class="bz-area__tips">
        <h4>${scope.title || ''}</h4>
        <a class="bz-area--close" href="javascript:;"></a>
      </div>
      <div class="bz-area__nav nav-level-${scope.level}">
        ${scope.nav || ''}
      </div>
    </div>
    <div class="bz-area__bd">
      <div data-index="0" class="bz-area__list"></div>
      <div data-index="1" class="bz-area__list"></div>
      <div data-index="2" class="bz-area__list"></div>
      <div data-index="3" class="bz-area__list"></div>
    </div>
  </div>
</div>`;
  },
};
