export default {
  nav(opts) {
    let html = '';
    opts.navs.forEach((item, index) => {
      html += `<a data-index="${index}" href="javascript:;" class="bz-area__nav__item ${opts.navSelected === index ? 'active' : ''}"><span>${item.name}</span></a>`;
    });
    return html;
  },
  list(opts) {
    let html = '';
    opts.list.forEach((list, navSelected) => {
      html += `<div class="bz-area__list" style="display: ${navSelected === opts.navSelected ? 'block' : 'none'};">`;
      list.forEach((item, index) => {
        html += `<a data-index="${index}" data-id="${item.id}" class="bz-area__list__item ${opts.listSelected[navSelected] === index ? 'active' : ''}"><span>${item.name}</span>${opts.listSelected[navSelected] === index ? '<i class="bzicon bzicon-check"></i>' : ''}</a>`;
      });
      html += '</div>';
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
      ${scope.list || ''}
    </div>
  </div>
</div>`;
  },
};
