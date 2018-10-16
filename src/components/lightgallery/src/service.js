import moduleName from './name.js';
import $ from 'jquery';
import './lib/add-to-vendor/lightgallery.js/lib/js/lightgallery.js';
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

    images = images.map(image => ({
      src: typeof image === 'string' ? image : image.src,
      title: typeof image === 'string' ? '' : image.title,
    }));

    let div = $('<div></div>');
    div.css({
      width: 0,
      height: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    });

    $('body').append(div);

    images.forEach(function({
      src,
      title = '',
    }) {
      if (/.gif/g.test(`${src}`.toLowerCase())) {
        if (/\?/g.test(`${src}`.toLowerCase())) {
          src += `&t=${+new Date()}`;
        } else {
          src += `?t=${+new Date()}`;
        }
      }
      div.append('<div data-sub-html="' + title + '" data-src="' + src + '"></div>');
    });

    this.LightGallery(div[0], $.extend($.extend({}, this.defaultConfig), config));
    this.trigger(div.find('div').eq(0).get(0), 'click');

    div.bind('onBeforeClose', e => {
      div.remove();
    });
  }
}
