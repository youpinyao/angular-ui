webpackJsonp([5,21,22,27],{

/***/ "/cD4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("qSUM");

exports['default'] = _name2['default'];

/***/ }),

/***/ "5d4z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("N6Gv");

var _name2 = _interopRequireDefault(_name);

var _button = __webpack_require__("lkey");

var _button2 = _interopRequireDefault(_button);

var _icons = __webpack_require__("/cD4");

var _icons2 = _interopRequireDefault(_icons);

var _progress = __webpack_require__("bl4z");

var _progress2 = _interopRequireDefault(_progress);

__webpack_require__("v2oE");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], ['angularFileUpload', _button2['default'], _icons2['default'], _progress2['default']]).config(function () {}).run(function () {});

__webpack_require__("m196");

exports['default'] = _name2['default'];

/***/ }),

/***/ "8o0r":
/***/ (function(module, exports) {

module.exports = "<div class=\"upload-image-items\">\n  <div class=\"upload-image-item\"\n    ng-class=\"{error: file.error}\"\n    data-id=\"{{file.id}}\"\n    ng-repeat=\"file in ngModel track by file.id\">\n\n    <div class=\"image\"\n      ng-if=\"file.url && isImg(file)\"\n      ng-style=\"{\n        'background-image': 'url({{file.url}})'\n      }\"></div>\n    <div class=\"image\"\n      ng-if=\"!file.url && file.id && isImg(file)\"\n      ng-style=\"{\n        'background-image': 'url({{$ctrl.uploadConfig.viewUrl + '?file_id=' + file.id}})'\n      }\"></div>\n\n    <div class=\"image\"\n      ng-if=\"!isImg(file)\">\n      <ma-icon ma-type=\"{{getFileIcon(file)}}\"></ma-icon>\n    </div>\n\n    <div class=\"handle-box\"\n      ng-show=\"file.progress === undefined || file.progress === 100\">\n      <ma-icon class=\"close\"\n        ma-type=\"eyeo\"\n        ma-click=\"viewFile(ngModel, file, $index)\"></ma-icon>\n      <ma-icon class=\"close\"\n        ma-type=\"delete\"\n        ma-click=\"delFile(file, $index)\"\n        ng-show=\"showDelete != 'false' && file.showDelete !== false && (file.progress === undefined || file.progress === 100)\"></ma-icon>\n    </div>\n\n    <ma-progress ma-type=\"circle\"\n      ma-status=\"danger\"\n      ma-size=\"70\"\n      ma-stroke-width=\"5\"\n      ma-percent=\"{{file.progress}}\"\n      ng-show=\"file.progress !== undefined && file.progress !== 100\"></ma-progress>\n  </div>\n\n  <div class=\"upload-image-item add\"\n    ng-hide=\"$ctrl.uploadConfig.limit <= ngModel.length\">\n    <ma-icon ma-type=\"plus\"></ma-icon>\n    <div>{{$ctrl.uploadConfig.uploadText || '上传照片'}}</div>\n  </div>\n</div>\n";

/***/ }),

/***/ "N6Gv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.upload';

/***/ }),

/***/ "PHaT":
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"ma-progress {{type}}\"\n  ng-class=\"{\n    success: status === 'success',\n    warning: status === 'warning',\n    danger: status === 'danger',\n  }\"\n  ng-style=\"{\n    width: size + 'px',\n    height: size + 'px',\n  }\"\n>\n  <svg\n    ng-show=\"type === 'circle'\"\n    width=\"120px\"\n    height=\"120px\"\n    class=\"ma-progress-circle\"\n    viewBox=\"0 0 100 100\">\n    <path\n      class=\"ma-progress-circle-trail\" d=\"M 50,50 m 0,-47\n      a 47,47 0 1 1 0,94\n      a 47,47 0 1 1 0,-94\"\n      stroke-width=\"{{strokeWidth}}\"\n      fill-opacity=\"0\"\n      ng-style=\"{\n        strokeDasharray: '295.31px, 295.31px'\n      }\"\n    >\n    </path>\n    <path\n      class=\"ma-progress-circle-path\"\n      d=\"M 50,50 m 0,-47\n      a 47,47 0 1 1 0,94\n      a 47,47 0 1 1 0,-94\"\n      stroke-linecap=\"round\"\n      stroke-width=\"{{strokeWidth}}\"\n      fill-opacity=\"0\"\n      ng-style=\"{\n        strokeDasharray: (295.31 * (percent / 100)) + 'px, 295.31px'\n      }\"\n      style=\"\"\n    >\n    </path>\n  </svg>\n  <div\n    class=\"ma-progress-line\"\n    ng-show=\"type === 'line'\"\n  >\n    <div\n      class=\"ma-progress-line-trail\"\n      ng-style=\"{\n        height: strokeWidth + 'px',\n        width: size + 'px',\n      }\"\n    >\n      <div\n        class=\"ma-progress-line-path\"\n        ng-style=\"{\n          width: percent + '%'\n        }\"\n      ></div>\n    </div>\n  </div>\n  <div class=\"ma-progress-content\" ng-transclude></div>\n</div>\n";

/***/ }),

/***/ "S1RN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maClick', maClick).directive('maButton', maButton);

maClick.$inject = ['$parse', '$timeout'];

function maClick($parse, $timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs, ctrl) {
      element.bind('click', function (e) {
        if (element.hasClass('ma-click-disabled') || element.hasClass('disabled')) {
          return;
        }
        element.addClass('ma-click-disabled');

        if (attrs.maClick) {
          // if (scope.$odd !== undefined || scope.$even !== undefined ||
          //   scope.$last !== undefined || scope.$index !== undefined ||
          //   scope.$middle !== undefined) {
          //   scope.$event = e;
          //   $parse(attrs.maClick)(scope);
          // } else {
          scope.$event = e;
          $parse(attrs.maClick)(scope);
          // }
        }

        $timeout();

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
      });

      function hasFn(fn, sc) {
        var _hasFn = false;
        angular.each(fn, function (d) {
          if (sc[d]) {
            _hasFn = true;
          } else {
            _hasFn = false;
          }
          sc = sc[d];
        });
        return _hasFn;
      }
    }
  };
}

maButton.$inject = [];

function maButton() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div\n    class="ma-button {{size}} {{type}}"\n    ng-class="{\n      disabled: disabled,\n      flat: flat === \'true\',\n      active: active === \'true\',\n    }"\n    ng-transclude></div>',
    scope: {
      size: '@maSize',
      type: '@maType',
      flat: '@maFlat',
      active: '@maActive',
      disabled: '=ngDisabled'
    },
    replace: true,
    link: function link(scope, element, attrs, ctrl) {}
  };
}

/***/ }),

/***/ "UX8a":
/***/ (function(module, exports) {

module.exports = "<svg\n  class=\"ma-circle\"\n>\n  <circle\n    fill=\"none\"\n  ></circle>\n  <circle\n    fill=\"none\"\n  ></circle>\n</svg>\n";

/***/ }),

/***/ "VICL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.progress';

/***/ }),

/***/ "XMKs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("VICL");

var _name2 = _interopRequireDefault(_name);

var _maProgressTpl = __webpack_require__("PHaT");

var _maProgressTpl2 = _interopRequireDefault(_maProgressTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maProgress', maProgress);

maProgress.$inject = [];

function maProgress() {
  return {
    restrict: 'E',
    scope: {
      size: '@maSize',
      type: '@maType',
      status: '@maStatus',
      percent: '@maPercent',
      strokeWidth: '@maStrokeWidth'
    },
    replace: true,
    transclude: true,
    template: _maProgressTpl2['default'],
    link: function link(scope, element, attrs, ctrl) {
      scope.size = 120;
      scope.type = 'line';
      scope.status = 'success';
      scope.percent = 0;
      scope.strokeWidth = 6;

      updateProgress();

      attrs.$observe('maPercent', function (d) {
        scope.percent = d ? parseInt(d, 10) : 0;
        updateProgress();
      });
      attrs.$observe('maSize', function (d) {
        scope.size = d ? parseInt(d, 10) : 120;
        updateProgress();
      });

      function updateProgress() {
        var svg = (0, _jquery2['default'])(element).find('.ma-progress-circle');

        svg.attr('width', scope.size);
        svg.attr('height', scope.size);
      }
    }
  };
}

/***/ }),

/***/ "Z/eS":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"upload-file-items\">\n  <div class=\"upload-file-item\" ng-class=\"{error: file.error}\" data-id=\"{{file.id}}\" ng-repeat=\"file in ngModel track by file.id\">\n    <ma-progress\n      ma-type=\"circle\"\n      ma-status=\"danger\"\n      ma-size=\"10\"\n      ma-stroke-width=\"10\"\n      ma-percent=\"{{file.progress}}\"\n      ng-show=\"file.progress !== undefined && file.progress !== 100\"\n    ></ma-progress>\n    <ma-icon\n      ng-show=\"file.progress === undefined || file.progress === 100\"\n      ma-type=\"paperclip\"\n    ></ma-icon>\n    <a href=\"javascript:void(0)\" ma-click=\"viewFile(file)\">{{file.name}}</a>\n    <ma-icon\n      class=\"close\"\n      ma-type=\"close\"\n      ma-click=\"delFile(file, $index)\"\n      ng-show=\"showDelete !== 'false' && file.showDelete !== false && (file.progress === undefined || file.progress === 100)\"\n    ></ma-icon>\n    <!--div class=\"upload-item-progress\" ng-if=\"file.progress !== undefined && file.progress !== 100\">\n      <span ng-style=\"{width: file.progress + '%'}\"></span>\n    </div-->\n  </div>\n</div>\n";

/***/ }),

/***/ "bl4z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("VICL");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("XMKs");

exports['default'] = _name2['default'];

/***/ }),

/***/ "brJl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.icons';

/***/ }),

/***/ "g66R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.button';

/***/ }),

/***/ "lkey":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("g66R");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("S1RN");

exports['default'] = _name2['default'];

/***/ }),

/***/ "m196":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("N6Gv");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maUploadTpl = __webpack_require__("Z/eS");

var _maUploadTpl2 = _interopRequireDefault(_maUploadTpl);

var _maUploadImageTpl = __webpack_require__("8o0r");

var _maUploadImageTpl2 = _interopRequireDefault(_maUploadImageTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maUpload', maUpload).directive('maUploadImage', maUploadImage);

// config
// {
//  url: '/upload/index',
// viewUrl: '/upload/download',
// alias: 'file',
// headers: {},
// queue: [],
// progress: 0,
// autoUpload: true,
// removeAfterUpload: false,
// method: 'POST',
// filters: [],
// formData: [],
// queueLimit: Number.MAX_VALUE,
// withCredentials: false,
// disableMultipart: false

//   非插件额外配置
//   multiple: false
//   limit: Number.MAX_VALUE,
//   size: 10 * 1024 * 1000,
//   accept: '',
//   convert: function(data, response){}, // 上传成功后回调
//   uploadText: '上传照片',
// }

// ngModel data format
// [{
//   id: '',
//   name: '',
//   progress: 100,
//   showDelete: false,
// }, {
//   id: '',
//   name: '',
//   progress: 100, //选填
//   showDelete: false, //选填
// }]

maUpload.$inject = ['$compile', 'FileUploader', '$message'];
maUploadImage.$inject = ['$compile', 'FileUploader', '$message'];

function maUpload($compile, FileUploader, $message) {
  return _maUpload($compile, FileUploader, $message, _maUploadTpl2['default'], {});
}

function maUploadImage($compile, FileUploader, $message) {
  return _maUpload($compile, FileUploader, $message, _maUploadImageTpl2['default'], {
    accept: 'image/*'
  });
}

function _maUpload($compile, FileUploader, $message, template, defaultConfig) {
  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      uploadConfig: '=maUploadConfig',
      showDelete: '@maShowDelete'
    },
    controllerAs: '$ctrl',
    controller: maUploadController,
    link: maUploadLink
  };

  function maUploadLink(scope, element, attrs, ctrl) {
    if (!scope.ngModel) {
      scope.ngModel = [];
    }

    var multiple = '';
    var accept = '';
    var uploader = 'uploader';
    var config = getConfig();
    var newUploader = new FileUploader(config);

    var allImageAccept = 'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg';

    scope.$ctrl.uploadConfig = config;

    scope[uploader] = newUploader;
    newUploader.onBeforeUploadItem = onBeforeUploadItem;
    newUploader.onProgressItem = onProgressItem;
    newUploader.onSuccessItem = onSuccessItem;
    newUploader.onErrorItem = onErrorItem;
    newUploader.onCompleteItem = onCompleteItem;
    newUploader.onCancelItem = onCompleteItem;
    newUploader.onWhenAddingFileFailed = onCompleteItem;

    // 初始化元素
    if (config.multiple) {
      multiple = 'multiple';
    }

    if (config.accept === 'image/*') {
      config.accept = allImageAccept;
    }

    if (config.accept) {
      accept = 'accept=' + config.accept;
    }

    var fileInput = '<input\n      type="file"\n      nv-file-select=""\n      ' + multiple + '\n      ' + accept + '\n      uploader=\'' + uploader + '\'/>';

    if ((0, _jquery2['default'])(element).parents('.ma-button').length) {
      element = (0, _jquery2['default'])(element).parents('.ma-button');
      element.css({
        position: 'relative'
      });
      appendElement();
    } else if (element.attr('ma-upload-image') !== undefined) {
      element.append(template);
      (0, _jquery2['default'])(element).find('.upload-image-item.add').append(fileInput);
    } else {
      appendElement();
    }

    function appendElement() {
      element.append(fileInput);
      (0, _jquery2['default'])(template).insertAfter(element);
    }

    angular.each(Array.prototype.slice.call(element.contents(), 0, element.contents().length), function (el) {
      if ((0, _jquery2['default'])(el).attr('ma-upload') === undefined) {
        $compile(el)(scope);
      }
    });

    $compile(element.next().contents())(scope);

    function getConfig() {
      var config = _jquery2['default'].extend(true, {
        url: '/upload/index',
        viewUrl: '/upload/download',
        autoUpload: true,
        multiple: false,
        filters: [],
        size: 10 * 1024 * 1000,
        accept: '',
        convertData: function convertData(data) {}
      }, _jquery2['default'].extend(defaultConfig, scope.uploadConfig || {}));

      // 初始化 uploader 实例
      if (!config.filters) {
        config.filters = [];
      }

      config.filters.push({
        name: 'limitFilter',
        fn: function fn(item, options) {
          if (scope.ngModel.length >= config.limit) {
            $message.error('最多只能上传' + config.limit + '个文件');
            return false;
          }
          return true;
        }
      });

      config.filters.push({
        name: 'sizeFilter',
        fn: function fn(item, options) {
          if (item.size > config.size) {
            $message.error('最多只能上传' + config.size / 1000 / 1024 + 'M的文件');
            return false;
          }
          return true;
        }
      });

      config.filters.push({
        name: 'imageFilter',
        fn: function fn(item, options) {
          if (!config.accept) {
            return true;
          }
          if (!config.accept.indexOf('image') === -1) {
            return true;
          }

          var types = '|jpg|png|jpeg|bmp|gif|svg';
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';

          if (config.accept !== 'image/*' && config.accept !== allImageAccept) {
            types = '|' + config.accept.split('image/')[1] + '|';
          }

          if (types.indexOf(type) === -1) {
            $message.error('请选择图片');
          }
          return types.indexOf(type) !== -1;
        }
      });

      scope.uploaderConfig = config;

      return config;
    }

    function onBeforeUploadItem(fileItem) {
      // console.log('onBeforeUploadItem---', '[', fileItem._file.name, ']');
      scope.ngModel.push({
        file: fileItem._file,
        name: fileItem._file.name,
        progress: fileItem.progress
      });
    }

    function onProgressItem(fileItem, progress) {
      // console.log('onProgressItem---', '[', fileItem._file.name, ']');

      angular.forEach(scope.ngModel, function (d) {
        if (d.file === fileItem._file) {
          d.progress = fileItem.progress;
          if (d.progress >= 100) {
            d.progress = 99;
          }
        }
      });
    }

    function onSuccessItem(fileItem, response, status, headers) {
      // console.log('onSuccessItem---', '[', fileItem._file.name, ']');

      angular.forEach(scope.ngModel, function (d) {
        if (d.file === fileItem._file) {
          d.progress = 100;
          if (response.data) {
            d.id = response.data.file_id;
          }
          if (config.convert) {
            config.convert(d, response);
          }
        }
      });
    }

    function onErrorItem(fileItem, response, status, headers) {
      // console.log('onErrorItem---', '[', fileItem._file.name, ']');

      if (response.message) {
        $message.error(response.message);
      }

      var newFiles = [];
      angular.forEach(scope.ngModel, function (d) {
        if (d.file !== fileItem._file) {
          newFiles.push(d);
        }
      });
      scope.ngModel = newFiles;
    }

    function onCompleteItem(fileItem, response, status, headers) {
      (0, _jquery2['default'])(element).find('input[type="file"]').val('');
    }
  }
}

maUploadController.$inject = ['$scope', '$lightGallery'];

function maUploadController($scope, $lightGallery) {
  $scope.viewFile = viewFile;
  $scope.delFile = delFile;
  $scope.isImg = isImg;
  $scope.getFileIcon = getFileIcon;

  function viewFile(files, file, $index) {
    var urls = [];

    if (!files.length) {
      files = [files];
    }

    angular.each(files, function (d) {
      if (isImg(d)) {
        urls.push(d.url || $scope.uploaderConfig.viewUrl + '?file_id=' + d.id);
      }
    });

    if (isImg(file)) {
      $lightGallery.preview(urls, {
        index: $index || $index === 0 ? $index : false
      });
      return;
    }

    window.open(file.url);
  }

  function isImg(file) {
    file = angular.extend({}, file);

    var reg = /\.(gif|png|jpg|jpeg|bmp|svg)$/g;
    file.name += '';
    file.url += '';

    file.name = file.name.toLowerCase();
    file.url = file.url.toLowerCase();

    if (reg.test(file.name) || reg.test(file.url)) {
      return true;
    }
    return false;
  }

  function getFileIcon(file) {
    file = angular.extend({}, file);

    var isExcle = /\.(xls|xlsx)$/g;
    var isTxt = /\.(txt)$/g;
    var isPdf = /\.(pdf)$/g;
    var isWord = /\.(doc|docx)$/g;
    var isPpt = /\.(ppt|pptx)$/g;

    file.name += '';
    file.url += '';

    file.name = file.name.toLowerCase();
    file.url = file.url.toLowerCase();

    if (isTxt.test(file.name) || isTxt.test(file.url)) {
      return 'filetext';
    }
    if (isExcle.test(file.name) || isExcle.test(file.url)) {
      return 'exclefile';
    }
    if (isPpt.test(file.name) || isPpt.test(file.url)) {
      return 'pptfile';
    }
    if (isWord.test(file.name) || isWord.test(file.url)) {
      return 'wordfile';
    }
    if (isPdf.test(file.name) || isPdf.test(file.url)) {
      return 'pdffile';
    }
    return 'file';
  }

  function delFile(file, index) {
    var newFiles = [];
    angular.forEach($scope.ngModel, function (d, k) {
      if (k !== index) {
        newFiles.push(d);
      }
    });
    $scope.ngModel = newFiles;
  }
}

/***/ }),

/***/ "qSUM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("brJl");

var _name2 = _interopRequireDefault(_name);

var _maCircleTpl = __webpack_require__("UX8a");

var _maCircleTpl2 = _interopRequireDefault(_maCircleTpl);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maIcon', maIcon);
// .directive('maCircle', maCircle);

maIcon.$inject = [];

function maIcon() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      type: '@maType',
      size: '@maSize'
    },
    template: '\n    <i\n      class="iconfont icon-{{type}}"\n      ng-style="{fontSize: size + \'px\'}"\n    ></i>',
    link: function link(scope, element, attrs, controllers) {}
  };
}

// maCircle.$inject = [];

// function maCircle() {
//   return {
//     restrict: 'E',
//     replace: true,
//     scope: {
//       size: '@maSize',
//       strokeWidth: '@maStrokeWidth',
//       percent: '@maPercent',
//       backStroke: '@maBackStroke',
//       frontStroke: '@maFrontStoke',
//     },
//     template: maCircleTpl,
//     link: function (scope, element, attrs, controllers) {
//       scope.pi = Math.PI;
//       scope.size = 12;
//       scope.strokeWidth = 1;
//       scope.percent = 0;
//       scope.backStroke = '#FFFFFF';
//       scope.frontStroke = '#FF74B9';
//       updateCircle();

//       attrs.$observe('maSize', d => {
//         scope.size = d ? parseInt(d, 10) : 12;
//         updateCircle();
//       });
//       attrs.$observe('maStrokeWidth', d => {
//         scope.strokeWidth = d ? parseInt(d, 10) : 1;
//         updateCircle();
//       });
//       attrs.$observe('maPercent', d => {
//         scope.percent = d ? parseInt(d, 10) / 100 : 0;
//         updateCircle();
//       });
//       attrs.$observe('maBackStroke', d => {
//         scope.backStroke = d || '#FFFFFF';
//         updateCircle();
//       });
//       attrs.$observe('maFrontStoke', d => {
//         scope.frontStroke = d || '#FF74B9';
//         updateCircle();
//       });

//       function updateCircle() {
//         const circles = $(element).find('circle');
//         const back = circles.eq(0);
//         const front = circles.eq(1);

//         element.attr('width', scope.size);
//         element.attr('height', scope.size);

//         back.attr('cx', scope.size / 2);
//         back.attr('cy', scope.size / 2);
//         back.attr('r', (scope.size / 2) - scope.strokeWidth);
//         back.attr('stroke-width', (scope.size / 2) - scope.strokeWidth);
//         back.attr('stroke', scope.backStroke);

//         front.attr('cx', scope.size / 2);
//         front.attr('cy', scope.size / 2);
//         front.attr('r', (scope.size / 2) - scope.strokeWidth);
//         front.attr('stroke-width', scope.strokeWidth);
//         front.attr('stroke', scope.frontStroke);
//         front.attr('transform', `matrix(0,-1,1,0,0,${scope.size})`);
//         front.attr('stroke-dasharray',
//           `${2 * Math.PI * ((scope.size / 2) - scope.strokeWidth) * scope.percent} ${2 * Math.PI * ((scope.size / 2) - scope.strokeWidth)}`
//         );
//       }
//     }
//   };
// }

/***/ })

},["5d4z"]);
//# sourceMappingURL=upload.js.map