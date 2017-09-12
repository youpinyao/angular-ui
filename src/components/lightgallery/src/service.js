import moduleName from './name.js';
import $ from 'jquery';
import 'lightgallery.js/lib/js/lightgallery.js';
import './lib/lg-fullscreen';
import './lib/lg-zoom';
import './lib/lg-pager';
import './lib/lg-autoplay';
import './lib/lg-share';

const LightGallery = window.lightGallery;

angular.module(moduleName)
  .factory('$lightGallery', lightGalleryService);


lightGalleryService.$inject = [];

function lightGalleryService() {
  return {
    preview: preview,
    LightGallery: LightGallery,
    trigger: trigger,
    defaultConfig: {
      download: false,
      mousewheel: true,
      share: false,
    }
  };

  function trigger(el, event) {
    if (document.createEvent) {
      var evObj = document.createEvent('MouseEvents');
      evObj.initEvent(event, true, false);
      el.dispatchEvent(evObj);
    } else if (document.createEventObject) {
      el.fireEvent('on' + event);
    }
  }

  function preview(images, config) {
    if (!images) {
      console.warn('请传入图片链接');
      return;
    }
    if (typeof images === 'string') {
      images = [images];
    }

    let div = $('<div></div>');
    div.css({
      width: 0,
      height: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    });

    $('body').append(div);

    images.forEach(function(d) {
      if (/.gif/g.test(`${d}`.toLowerCase())) {
        if (/\?/g.test(`${d}`.toLowerCase())) {
          d += `&t=${+new Date()}`;
        } else {
          d += `?t=${+new Date()}`;
        }
      }
      div.append('<div data-src="' + d + '"></div>');
    });

    this.LightGallery(div[0], $.extend($.extend({}, this.defaultConfig), config));
    this.trigger(div.find('div').eq(0).get(0), 'click');

    div.bind('onBeforeClose', e => {
      div.remove();
    });
  }
}
