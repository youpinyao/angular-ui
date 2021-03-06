import moduleName from './name.js';
import $ from 'jquery';
import debounce from 'debounce';
import uuid from 'uuid/v4';
import maTooltipTpl from './maTooltipTpl.html';

angular.module(moduleName)
  .directive('maTooltip', maTooltip);

maTooltip.$inject = ['$timeout', '$compile'];

function maTooltip($timeout, $compile) {
  return {
    restrict: 'A',
    scope: {
      contentScope: '=maScope',
      contentWidth: '@maWidth',
      changeCallback: '&maChangeCallback',
      showMask: '@maShowMask',
    },
    link: function(scope, element, attrs, ctrl) {
      const uid = uuid();
      const el = $(maTooltipTpl);
      const content = el.find('.ma-tooltip-content');
      const defaultDirection = 'tc';

      let isPopconfirm = false;
      let direction = defaultDirection;
      let prevDirection = '';
      let isClickHide = false;

      // 模拟trigger 触发元素
      let triggerElement;

      $('body').append(el);

      $(element).hover(d => {
        updateSize();
        triggerElement = undefined;
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        showTip();
      }, () => {
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        hideTip();
      }).on('mousemove', stopp);

      el.hover(d => {
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        showTip();
      }, () => {
        if (isClickHide) {
          return;
        }
        if (isPopconfirm) {
          return;
        }
        hideTip();
      }).on('mousemove', stopp);

      $('body').on('mousemove', hideTip);

      attrs.$observe('maTooltip', d => {
        content.html(d);
        updateSize();
        $compile(content.contents())(scope.contentScope || scope);
      });
      attrs.$observe('maClickHide', d => {
        if (d == 'true') {
          isClickHide = true;
          // $(element).on('click', stopp);
          el.on('click', stopp);
          $('body').off('mousemove', hideTip);

          $('body').on('click', (e, a) => {
            // a 控制主动trigger 传当前触发元素
            if (a) {
              triggerElement = a;
            }
            if (!a && !($(e.target).parents('.ma-popconfirm').length && $(e.target).parents(
                '.ma-popconfirm').get(0) === element[0])) {
              hideTip(e);
            }
          });
        }
      });
      attrs.$observe('maPopconfirm', d => {
        if (d == 'true') {
          isPopconfirm = true;
          el.addClass('ma-popconfirm-tooltip');
          element.on('click', () => {
            showTip(undefined, triggerElement);

            triggerElement = undefined;
          });
        }
      });
      scope.$on('$destroy', d => {
        el.remove();
        $('body').off('mousemove', hideTip);
        $('body').off('click', hideTip);
      });
      attrs.$observe('maDirection', setDirection);

      scope.$on('tooltip.hide', hideTip);

      setDirection(defaultDirection);

      function updateSize() {
        const customWidth = parseInt(scope.contentWidth, 10);
        el.css({
          width: '',
          height: '',
          maxWidth: '',
        });
        $timeout(() => {
          el.width((customWidth || el.width()) + 1);
          el.height(el.height() + 1);
          if (customWidth) {
            el.css({
              maxWidth: customWidth,
            });
          }
        }, 50);
      }

      function setDirection(d) {
        direction = d || defaultDirection;
        el.attr('data-direction', d || defaultDirection);
        content.attr('data-direction', d || defaultDirection);
        $timeout(() => {
          el.width(el.width() + 1);
          el.height(el.height() + 1);
        });
      }

      function showTip(newDirection, e) {
        $timeout.cancel(scope.hideTimer);
        $timeout.cancel(scope.hidePosTimer);

        const targetElement = e || element;

        const offsetTop = $(targetElement).offset().top;
        const offsetLeft = $(targetElement).offset().left;
        const elHeight = el.outerHeight();
        const elWidth = el.outerWidth();
        const elementHeight = $(targetElement).outerHeight();
        const elementWidth = $(targetElement).outerWidth();

        const boxPadding = 10;

        const ltrt = (((elHeight - (boxPadding * 2)) * 0.15) - (elementHeight / 2)) + 5;
        const lbrb = ((elHeight - (boxPadding * 2)) * 0.85) - (elementHeight / 2) - 5;
        const tlbl = (((elWidth - (boxPadding * 2)) * 0.15) - (elementWidth / 2)) + 5;
        const trbr = ((elWidth - (boxPadding * 2)) * 0.85) - (elementWidth / 2) - 5;

        let top = 0;
        let left = 0;
        let hasNew = false;

        if (prevDirection) {
          direction = prevDirection;
          el.attr('data-direction', direction);
          content.attr('data-direction', direction);
        }

        if (newDirection && typeof newDirection === 'string') {
          prevDirection = direction;
          direction = newDirection;
          hasNew = true;
          el.attr('data-direction', direction);
          content.attr('data-direction', direction);
        }

        switch (direction) {
          case 'tc':
            top = offsetTop - elHeight;
            left = offsetLeft + ((elementWidth - elWidth) / 2);
            break;
          case 'tl':
            top = offsetTop - elHeight;
            left = offsetLeft - boxPadding - tlbl;
            break;
          case 'tr':
            top = offsetTop - elHeight;
            left = offsetLeft - boxPadding - trbr;
            break;
          case 'lc':
            top = offsetTop - ((elHeight - elementHeight) / 2);
            left = offsetLeft - elWidth;
            break;
          case 'lt':
            top = offsetTop - boxPadding - ltrt;
            left = offsetLeft - elWidth;
            break;
          case 'lb':
            top = offsetTop - boxPadding - lbrb;
            left = offsetLeft - elWidth;
            break;
          case 'rc':
            top = offsetTop - ((elHeight - elementHeight) / 2);
            left = offsetLeft + elementWidth;
            break;
          case 'rt':
            top = offsetTop - boxPadding - ltrt;
            left = offsetLeft + elementWidth;
            break;
          case 'rb':
            top = offsetTop - boxPadding - lbrb;
            left = offsetLeft + elementWidth;
            break;
          case 'bc':
            top = offsetTop + elementHeight;
            left = offsetLeft + ((elementWidth - elWidth) / 2);
            break;
          case 'bl':
            top = offsetTop + elementHeight;
            left = offsetLeft - boxPadding - tlbl;
            break;
          case 'br':
            top = offsetTop + elementHeight;
            left = offsetLeft - boxPadding - trbr;
            break;
        }

        el.css({
          top,
          left,
        });

        // $timeout(function() {
        if (!hasNew) {
          checkPositon(e);
        }
        if (!el.hasClass('show')) {
          scope.changeCallback({
            show: true,
          });
        }
        el.addClass('show');
        // }, 10);

        showMask();
      }

      function checkPositon(e) {
        const offsetTop = el.offset().top - $(window).scrollTop();
        const offsetLeft = el.offset().left - $(window).scrollLeft();
        const wh = $(window).height();
        const ww = $(window).width();
        const elHeight = el.outerHeight();
        const elWidth = el.outerWidth();
        const elementHeight = $(element).outerHeight();
        const elementWidth = $(element).outerWidth();

        // console.log(offsetTop, offsetLeft);

        let newDirectionFirst = direction.split('')[0];
        let newDirectionSecond = direction.split('')[1];
        let newDirectionFirstReseted = false;
        let newDirection = '';

        if (offsetTop < 0) {
          newDirectionFirst = 'b';
        } else if (offsetTop + elHeight > wh) {
          newDirectionFirst = 't';
        } else if (offsetLeft < 0) {
          newDirectionFirst = 'r';
        } else if (offsetLeft + elWidth > ww) {
          newDirectionFirst = 'l';
        }

        if (newDirectionFirst == 't' || newDirectionFirst == 'b') {
          if (offsetLeft < 0) {
            newDirectionSecond = 'l';
          } else if (offsetLeft + elWidth > ww) {
            newDirectionSecond = 'r';
          } else if (newDirectionSecond === 't' || newDirectionSecond === 'b') {
            newDirectionSecond = 'c';
          }
        }

        if (newDirectionFirst == 'l' || newDirectionFirst == 'r') {
          if (offsetTop < 0) {
            newDirectionSecond = 't';
          } else if (offsetTop + elHeight > wh) {
            newDirectionSecond = 'b';
          } else if (newDirectionSecond === 'l' || newDirectionSecond === 'r') {
            newDirectionSecond = 'c';
          }
        }

        newDirection = newDirectionFirst + newDirectionSecond;

        if (newDirection !== direction) {
          prevDirection = '';
          showTip(newDirection, e);
        }
      }

      function hideTip() {
        $timeout.cancel(scope.hidePosTimer);
        $timeout.cancel(scope.hideTimer);
        if (el.hasClass('show')) {
          scope.changeCallback({
            show: false,
          });
          scope.hidePosTimer = $timeout(() => {
            el.css({
              left: 0,
              top: 0,
            });
          }, 300);
          scope.hideTimer = $timeout(() => {
            el.removeClass('show');
          }, 10);
        }
        hideMask();
      }

      function stopp(e) {
        e.stopPropagation();
      }
      function showMask() {
        const ifShowMask = scope.showMask == 'true';

        if (ifShowMask) {
          $('body').append(`<div class="ma-tooltip-mask id_${uid}"></div>`);
        }
      }
      function hideMask() {
        const ifShowMask = scope.showMask == 'true';
        if (ifShowMask) {
          $(`.ma-tooltip-mask.id_${uid}`).remove();
        }
      }
    }
  };
}
