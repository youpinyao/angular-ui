import moduleName from './name.js';


angular.module(moduleName)
  .directive('maLightGallery', maLightGallery);

maLightGallery.$inject = ['$lightGallery'];

function maLightGallery($lightGallery) {
  return {
    restrict: 'EA',
    link: link,
    scope: {
      lightGalleryConfig: '@'
    }
  };

  function link(scope, element, attrs, ctrl) {
    $lightGallery.LightGallery(element[0], attrs.lightGalleryConfig || $lightGallery.defaultConfig);
  }
}
