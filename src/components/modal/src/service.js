import moduleName from './name.js';
import $ from 'jquery';

angular.module(moduleName)
  .factory('$modal', modalFactroy);

modalFactroy.$inject = ['$rootScope', '$compile', '$timeout'];

function modalFactroy($rootScope, $compile, $timeout) {
  const defaultConfig = {
    scope: null, // 作用域 默认 $rootScope
    title: '', // 标题
    template: '', // 主体内容模板
    showClose: true, // 显示关闭按钮
    clickMaskClose: false, // 点击遮罩是否关闭对话框
    okCallback: undefined, // 如果使用默认按钮的保存回调
    cancelCallback: undefined, // 如果使用默认按钮的放弃回调
    buttons: [{
      text: '保存修改',
      type: 'primary',
      size: 'default',
      disabled: false,
      callback($ctrl, config) {
        // 点击回调
        if (typeof config.okCallback === 'function') {
          config.okCallback($ctrl, config);
        }
      },
    }, {
      text: '放弃',
      type: 'default',
      size: 'default',
      disabled: false,
      callback($ctrl, config) {
        // 点击回调
        if (typeof config.okCallback === 'function') {
          config.cancelCallback($ctrl, config);
        }
      },
    }], // 底部按钮
  };

  return {
    open,
    delete: deleteFn,
    confirm: confirmFn,
    alert,
  };

  function alert(config) {
    const content = config.content;

    // 默认按钮
    if (!config.buttons) {
      config.buttons = [{
        text: '关闭',
        type: 'danger',
        size: 'default',
        disabled: false,
        callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.okCallback($ctrl, config);
          }
        },
      }];
    }

    delete config.title;
    config.showClose = false;
    config.isAlert = true;
    config.template = '';

    if (content) {
      config.template += `<div class="ma-alert-content">${content}</div>`;
    }

    open(config);
  }


  function deleteFn(config) {
    // 默认按钮
    if (!config.buttons) {
      config.buttons = [{
        text: '删除',
        type: 'danger',
        size: 'default',
        disabled: false,
        callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.okCallback($ctrl, config);
          }
        },
      }, {
        text: '取消',
        type: 'default',
        size: 'default',
        disabled: false,
        callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.cancelCallback($ctrl, config);
          }
        },
      }];
    }
    confirm(config);
  }

  function confirmFn(config) {
    // 默认按钮
    if (!config.buttons) {
      config.buttons = [{
        text: '确定',
        type: 'primary',
        size: 'default',
        disabled: false,
        callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.okCallback($ctrl, config);
          }
        },
      }, {
        text: '取消',
        type: 'default',
        size: 'default',
        disabled: false,
        callback($ctrl, config) {
          // 点击回调
          if (typeof config.okCallback === 'function') {
            config.cancelCallback($ctrl, config);
          }
        },
      }];
    }
    confirm(config);
  }

  function confirm(config) {
    const title = config.title;
    const content = config.content;

    delete config.title;
    config.showClose = false;
    config.isConfirm = true;
    config.template = '';

    if (title) {
      config.template += `<div class="ma-confirm-title">${title}</div>`;
    }
    if (content) {
      config.template += `<div class="ma-confirm-content">${content}</div>`;
    }

    open(config);
  }

  function open(config) {
    const newConfig = $.extend(true, {}, defaultConfig);
    const scope = config.scope;
    const uuid = 'modal_' + angular.uuid().split('-').join('');
    const maModalEl = $(`<ma-modal ma-config="modals.${uuid}" ma-uuid="${uuid}"></ma-modal>`);

    delete config.scope;
    $.extend(true, newConfig, config || {});

    if (config.buttons) {
      newConfig.buttons = $.extend([], config.buttons);
    }

    newConfig.scope = scope || $rootScope;

    if (newConfig.scope && !newConfig.scope.modals) {
      newConfig.scope.modals = {};
    }
    newConfig.scope.modals[uuid] = newConfig;

    $('body').append(maModalEl);

    $compile(maModalEl)(newConfig.scope);

    $timeout(() => {
      newConfig.show = true;
    }, 50);
  }
}
