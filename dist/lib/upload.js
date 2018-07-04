webpackJsonp([2,20,22,25,30],{

/***/ "/Las":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("HDDE");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _maMessageTpl = __webpack_require__("F7JF");

var _maMessageTpl2 = _interopRequireDefault(_maMessageTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).factory('$message', messageFactory);

messageFactory.$inject = ['$rootScope', '$q', '$http', '$timeout', '$compile'];

function messageFactory($rootScope, $q, $http, $timeout, $compile) {
  $rootScope.weakTipList = [];

  var messageBox = (0, _jquery2['default'])('.weak-tip');

  if (!messageBox.length) {
    messageBox = (0, _jquery2['default'])(_maMessageTpl2['default']);
    (0, _jquery2['default'])('body').append(messageBox);
    $compile(messageBox)($rootScope);
    $rootScope.$hideMessage = hideMessage;
  }

  function hideMessage(index) {
    var msg = $rootScope.weakTipList[index];

    msg.hide = true;
    $timeout();
    setTimeout(function (msg) {
      msg.remove = true;
      $timeout();
    }, 800, msg);
  }

  return {
    danger: function danger(text) {
      this.show('danger', text);
    },
    success: function success(text) {
      this.show('success', text);
    },
    warning: function warning(text) {
      this.show('warning', text);
    },
    show: function show(type, text) {
      this.clearList();
      if (this.hasSame(type, text)) {
        return;
      }

      var msg = {
        type: type,
        text: text || '空'
      };
      $rootScope.weakTipList.push(msg);

      setTimeout(function (msg) {
        msg.hide = false;
        $timeout();
      }, 50, msg);

      setTimeout(function (msg) {
        msg.hide = true;
        $timeout();
        setTimeout(function (msg) {
          msg.remove = true;
          $timeout();
        }, 350, msg);
      }, 2000, msg);
    },
    clearList: function clearList() {
      var list = [];
      angular.forEach($rootScope.weakTipList, function (d) {
        if (d.remove !== true) {
          list.push(d);
        }
      });
      $rootScope.weakTipList = list;
    },
    hasSame: function hasSame(type, text) {
      var has = false;
      angular.forEach($rootScope.weakTipList, function (d) {
        if (d.text === text && d.type === type) {
          has = true;
        }
      });

      return has;
    }
  };
}

/***/ }),

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

/***/ "4uR7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 angular-file-upload v2.5.0
 https://github.com/nervgh/angular-file-upload
*/

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["angular-file-upload"] = factory();else root["angular-file-upload"] = factory();
})(undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/
      var installedModules = {};
      /******/
      /******/ // The require function
      /******/
      function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
          /******/
          exports: {},
          /******/
          id: moduleId,
          /******/
          loaded: false
          /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.loaded = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/
      __webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/
      __webpack_require__.c = installedModules;
      /******/
      /******/ // __webpack_public_path__
      /******/
      __webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/
      return __webpack_require__(0);
      /******/
    }(
    /************************************************************************/
    /******/
    [
    /* 0 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      var _options = __webpack_require__(2);

      var _options2 = _interopRequireDefault(_options);

      var _FileUploader = __webpack_require__(3);

      var _FileUploader2 = _interopRequireDefault(_FileUploader);

      var _FileLikeObject = __webpack_require__(4);

      var _FileLikeObject2 = _interopRequireDefault(_FileLikeObject);

      var _FileItem = __webpack_require__(5);

      var _FileItem2 = _interopRequireDefault(_FileItem);

      var _FileDirective = __webpack_require__(6);

      var _FileDirective2 = _interopRequireDefault(_FileDirective);

      var _FileSelect = __webpack_require__(7);

      var _FileSelect2 = _interopRequireDefault(_FileSelect);

      var _Pipeline = __webpack_require__(8);

      var _Pipeline2 = _interopRequireDefault(_Pipeline);

      var _FileDrop = __webpack_require__(9);

      var _FileDrop2 = _interopRequireDefault(_FileDrop);

      var _FileOver = __webpack_require__(10);

      var _FileOver2 = _interopRequireDefault(_FileOver);

      var _FileSelect3 = __webpack_require__(11);

      var _FileSelect4 = _interopRequireDefault(_FileSelect3);

      var _FileDrop3 = __webpack_require__(12);

      var _FileDrop4 = _interopRequireDefault(_FileDrop3);

      var _FileOver3 = __webpack_require__(13);

      var _FileOver4 = _interopRequireDefault(_FileOver3);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      angular.module(_config2['default'].name, []).value('fileUploaderOptions', _options2['default']).factory('FileUploader', _FileUploader2['default']).factory('FileLikeObject', _FileLikeObject2['default']).factory('FileItem', _FileItem2['default']).factory('FileDirective', _FileDirective2['default']).factory('FileSelect', _FileSelect2['default']).factory('FileDrop', _FileDrop2['default']).factory('FileOver', _FileOver2['default']).factory('Pipeline', _Pipeline2['default']).directive('nvFileSelect', _FileSelect4['default']).directive('nvFileDrop', _FileDrop4['default']).directive('nvFileOver', _FileOver4['default']).run(['FileUploader', 'FileLikeObject', 'FileItem', 'FileDirective', 'FileSelect', 'FileDrop', 'FileOver', 'Pipeline', function (FileUploader, FileLikeObject, FileItem, FileDirective, FileSelect, FileDrop, FileOver, Pipeline) {
        // only for compatibility
        FileUploader.FileLikeObject = FileLikeObject;
        FileUploader.FileItem = FileItem;
        FileUploader.FileDirective = FileDirective;
        FileUploader.FileSelect = FileSelect;
        FileUploader.FileDrop = FileDrop;
        FileUploader.FileOver = FileOver;
        FileUploader.Pipeline = Pipeline;
      }]);

      /***/
    },
    /* 1 */
    /***/
    function (module, exports) {

      module.exports = {
        "name": "angularFileUpload"
      };

      /***/
    },
    /* 2 */
    /***/
    function (module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = {
        url: '/',
        alias: 'file',
        headers: {},
        queue: [],
        progress: 0,
        autoUpload: false,
        removeAfterUpload: false,
        method: 'POST',
        filters: [],
        formData: [],
        queueLimit: Number.MAX_VALUE,
        withCredentials: false,
        disableMultipart: false
      };

      /***/
    },
    /* 3 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }
        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var _angular = angular;
      var bind = _angular.bind;
      var copy = _angular.copy;
      var extend = _angular.extend;
      var forEach = _angular.forEach;
      var isObject = _angular.isObject;
      var isNumber = _angular.isNumber;
      var isDefined = _angular.isDefined;
      var isArray = _angular.isArray;
      var isUndefined = _angular.isUndefined;
      var element = _angular.element;

      function __identity(fileUploaderOptions, $rootScope, $http, $window, $timeout, FileLikeObject, FileItem, Pipeline) {
        var File = $window.File;
        var FormData = $window.FormData;

        var FileUploader = function () {
          /**********************
           * PUBLIC
           **********************/
          /**
           * Creates an instance of FileUploader
           * @param {Object} [options]
           * @constructor
           */

          function FileUploader(options) {
            _classCallCheck(this, FileUploader);

            var settings = copy(fileUploaderOptions);

            extend(this, settings, options, {
              isUploading: false,
              _nextIndex: 0,
              _directives: {
                select: [],
                drop: [],
                over: []
              }
            });

            // add default filters
            this.filters.unshift({
              name: 'queueLimit',
              fn: this._queueLimitFilter
            });
            this.filters.unshift({
              name: 'folder',
              fn: this._folderFilter
            });
          }
          /**
           * Adds items to the queue
           * @param {File|HTMLInputElement|Object|FileList|Array<Object>} files
           * @param {Object} [options]
           * @param {Array<Function>|String} filters
           */

          FileUploader.prototype.addToQueue = function addToQueue(files, options, filters) {
            var _this = this;

            var incomingQueue = this.isArrayLikeObject(files) ? Array.prototype.slice.call(files) : [files];
            var arrayOfFilters = this._getFilters(filters);
            var count = this.queue.length;
            var addedFileItems = [];

            var next = function next() {
              var something = incomingQueue.shift();

              if (isUndefined(something)) {
                return done();
              }

              var fileLikeObject = _this.isFile(something) ? something : new FileLikeObject(something);
              var pipes = _this._convertFiltersToPipes(arrayOfFilters);
              var pipeline = new Pipeline(pipes);
              var onThrown = function onThrown(err) {
                var originalFilter = err.pipe.originalFilter;

                var _err$args = _slicedToArray(err.args, 2);

                var fileLikeObject = _err$args[0];
                var options = _err$args[1];

                _this._onWhenAddingFileFailed(fileLikeObject, originalFilter, options);
                next();
              };
              var onSuccessful = function onSuccessful(fileLikeObject, options) {
                var fileItem = new FileItem(_this, fileLikeObject, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
                next();
              };
              pipeline.onThrown = onThrown;
              pipeline.onSuccessful = onSuccessful;
              pipeline.exec(fileLikeObject, options);
            };

            var done = function done() {
              if (_this.queue.length !== count) {
                _this._onAfterAddingAll(addedFileItems);
                _this.progress = _this._getTotalProgress();
              }

              _this._render();
              if (_this.autoUpload) _this.uploadAll();
            };

            next();
          };
          /**
           * Remove items from the queue. Remove last: index = -1
           * @param {FileItem|Number} value
           */

          FileUploader.prototype.removeFromQueue = function removeFromQueue(value) {
            var index = this.getIndexOfItem(value);
            var item = this.queue[index];
            if (item.isUploading) item.cancel();
            this.queue.splice(index, 1);
            item._destroy();
            this.progress = this._getTotalProgress();
          };
          /**
           * Clears the queue
           */

          FileUploader.prototype.clearQueue = function clearQueue() {
            while (this.queue.length) {
              this.queue[0].remove();
            }
            this.progress = 0;
          };
          /**
           * Uploads a item from the queue
           * @param {FileItem|Number} value
           */

          FileUploader.prototype.uploadItem = function uploadItem(value) {
            var index = this.getIndexOfItem(value);
            var item = this.queue[index];
            var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

            item._prepareToUploading();
            if (this.isUploading) return;

            this._onBeforeUploadItem(item);
            if (item.isCancel) return;

            item.isUploading = true;
            this.isUploading = true;
            this[transport](item);
            this._render();
          };
          /**
           * Cancels uploading of item from the queue
           * @param {FileItem|Number} value
           */

          FileUploader.prototype.cancelItem = function cancelItem(value) {
            var _this2 = this;

            var index = this.getIndexOfItem(value);
            var item = this.queue[index];
            var prop = this.isHTML5 ? '_xhr' : '_form';
            if (!item) return;
            item.isCancel = true;
            if (item.isUploading) {
              // It will call this._onCancelItem() & this._onCompleteItem() asynchronously
              item[prop].abort();
            } else {
              (function () {
                var dummy = [undefined, 0, {}];
                var onNextTick = function onNextTick() {
                  _this2._onCancelItem.apply(_this2, [item].concat(dummy));
                  _this2._onCompleteItem.apply(_this2, [item].concat(dummy));
                };
                $timeout(onNextTick); // Trigger callbacks asynchronously (setImmediate emulation)
              })();
            }
          };
          /**
           * Uploads all not uploaded items of queue
           */

          FileUploader.prototype.uploadAll = function uploadAll() {
            var items = this.getNotUploadedItems().filter(function (item) {
              return !item.isUploading;
            });
            if (!items.length) return;

            forEach(items, function (item) {
              return item._prepareToUploading();
            });
            items[0].upload();
          };
          /**
           * Cancels all uploads
           */

          FileUploader.prototype.cancelAll = function cancelAll() {
            var items = this.getNotUploadedItems();
            forEach(items, function (item) {
              return item.cancel();
            });
          };
          /**
           * Returns "true" if value an instance of File
           * @param {*} value
           * @returns {Boolean}
           * @private
           */

          FileUploader.prototype.isFile = function isFile(value) {
            return this.constructor.isFile(value);
          };
          /**
           * Returns "true" if value an instance of FileLikeObject
           * @param {*} value
           * @returns {Boolean}
           * @private
           */

          FileUploader.prototype.isFileLikeObject = function isFileLikeObject(value) {
            return this.constructor.isFileLikeObject(value);
          };
          /**
           * Returns "true" if value is array like object
           * @param {*} value
           * @returns {Boolean}
           */

          FileUploader.prototype.isArrayLikeObject = function isArrayLikeObject(value) {
            return this.constructor.isArrayLikeObject(value);
          };
          /**
           * Returns a index of item from the queue
           * @param {Item|Number} value
           * @returns {Number}
           */

          FileUploader.prototype.getIndexOfItem = function getIndexOfItem(value) {
            return isNumber(value) ? value : this.queue.indexOf(value);
          };
          /**
           * Returns not uploaded items
           * @returns {Array}
           */

          FileUploader.prototype.getNotUploadedItems = function getNotUploadedItems() {
            return this.queue.filter(function (item) {
              return !item.isUploaded;
            });
          };
          /**
           * Returns items ready for upload
           * @returns {Array}
           */

          FileUploader.prototype.getReadyItems = function getReadyItems() {
            return this.queue.filter(function (item) {
              return item.isReady && !item.isUploading;
            }).sort(function (item1, item2) {
              return item1.index - item2.index;
            });
          };
          /**
           * Destroys instance of FileUploader
           */

          FileUploader.prototype.destroy = function destroy() {
            var _this3 = this;

            forEach(this._directives, function (key) {
              forEach(_this3._directives[key], function (object) {
                object.destroy();
              });
            });
          };
          /**
           * Callback
           * @param {Array} fileItems
           */

          FileUploader.prototype.onAfterAddingAll = function onAfterAddingAll(fileItems) {};
          /**
           * Callback
           * @param {FileItem} fileItem
           */

          FileUploader.prototype.onAfterAddingFile = function onAfterAddingFile(fileItem) {};
          /**
           * Callback
           * @param {File|Object} item
           * @param {Object} filter
           * @param {Object} options
           */

          FileUploader.prototype.onWhenAddingFileFailed = function onWhenAddingFileFailed(item, filter, options) {};
          /**
           * Callback
           * @param {FileItem} fileItem
           */

          FileUploader.prototype.onBeforeUploadItem = function onBeforeUploadItem(fileItem) {};
          /**
           * Callback
           * @param {FileItem} fileItem
           * @param {Number} progress
           */

          FileUploader.prototype.onProgressItem = function onProgressItem(fileItem, progress) {};
          /**
           * Callback
           * @param {Number} progress
           */

          FileUploader.prototype.onProgressAll = function onProgressAll(progress) {};
          /**
           * Callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileUploader.prototype.onSuccessItem = function onSuccessItem(item, response, status, headers) {};
          /**
           * Callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileUploader.prototype.onErrorItem = function onErrorItem(item, response, status, headers) {};
          /**
           * Callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileUploader.prototype.onCancelItem = function onCancelItem(item, response, status, headers) {};
          /**
           * Callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileUploader.prototype.onCompleteItem = function onCompleteItem(item, response, status, headers) {};
          /**
           * Callback
           */

          FileUploader.prototype.onCompleteAll = function onCompleteAll() {};
          /**********************
           * PRIVATE
           **********************/
          /**
           * Returns the total progress
           * @param {Number} [value]
           * @returns {Number}
           * @private
           */

          FileUploader.prototype._getTotalProgress = function _getTotalProgress(value) {
            if (this.removeAfterUpload) return value || 0;

            var notUploaded = this.getNotUploadedItems().length;
            var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
            var ratio = 100 / this.queue.length;
            var current = (value || 0) * ratio / 100;

            return Math.round(uploaded * ratio + current);
          };
          /**
           * Returns array of filters
           * @param {Array<Function>|String} filters
           * @returns {Array<Function>}
           * @private
           */

          FileUploader.prototype._getFilters = function _getFilters(filters) {
            if (!filters) return this.filters;
            if (isArray(filters)) return filters;
            var names = filters.match(/[^\s,]+/g);
            return this.filters.filter(function (filter) {
              return names.indexOf(filter.name) !== -1;
            });
          };
          /**
           * @param {Array<Function>} filters
           * @returns {Array<Function>}
           * @private
           */

          FileUploader.prototype._convertFiltersToPipes = function _convertFiltersToPipes(filters) {
            var _this4 = this;

            return filters.map(function (filter) {
              var fn = bind(_this4, filter.fn);
              fn.isAsync = filter.fn.length === 3;
              fn.originalFilter = filter;
              return fn;
            });
          };
          /**
           * Updates html
           * @private
           */

          FileUploader.prototype._render = function _render() {
            if (!$rootScope.$$phase) $rootScope.$apply();
          };
          /**
           * Returns "true" if item is a file (not folder)
           * @param {File|FileLikeObject} item
           * @returns {Boolean}
           * @private
           */

          FileUploader.prototype._folderFilter = function _folderFilter(item) {
            return !!(item.size || item.type);
          };
          /**
           * Returns "true" if the limit has not been reached
           * @returns {Boolean}
           * @private
           */

          FileUploader.prototype._queueLimitFilter = function _queueLimitFilter() {
            return this.queue.length < this.queueLimit;
          };
          /**
           * Checks whether upload successful
           * @param {Number} status
           * @returns {Boolean}
           * @private
           */

          FileUploader.prototype._isSuccessCode = function _isSuccessCode(status) {
            return status >= 200 && status < 300 || status === 304;
          };
          /**
           * Transforms the server response
           * @param {*} response
           * @param {Object} headers
           * @returns {*}
           * @private
           */

          FileUploader.prototype._transformResponse = function _transformResponse(response, headers) {
            var headersGetter = this._headersGetter(headers);
            forEach($http.defaults.transformResponse, function (transformFn) {
              response = transformFn(response, headersGetter);
            });
            return response;
          };
          /**
           * Parsed response headers
           * @param headers
           * @returns {Object}
           * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js
           * @private
           */

          FileUploader.prototype._parseHeaders = function _parseHeaders(headers) {
            var parsed = {},
                key,
                val,
                i;

            if (!headers) return parsed;

            forEach(headers.split('\n'), function (line) {
              i = line.indexOf(':');
              key = line.slice(0, i).trim().toLowerCase();
              val = line.slice(i + 1).trim();

              if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
              }
            });

            return parsed;
          };
          /**
           * Returns function that returns headers
           * @param {Object} parsedHeaders
           * @returns {Function}
           * @private
           */

          FileUploader.prototype._headersGetter = function _headersGetter(parsedHeaders) {
            return function (name) {
              if (name) {
                return parsedHeaders[name.toLowerCase()] || null;
              }
              return parsedHeaders;
            };
          };
          /**
           * The XMLHttpRequest transport
           * @param {FileItem} item
           * @private
           */

          FileUploader.prototype._xhrTransport = function _xhrTransport(item) {
            var _this5 = this;

            var xhr = item._xhr = new XMLHttpRequest();
            var sendable;

            if (!item.disableMultipart) {
              sendable = new FormData();
              forEach(item.formData, function (obj) {
                forEach(obj, function (value, key) {
                  sendable.append(key, value);
                });
              });

              sendable.append(item.alias, item._file, item.file.name);
            } else {
              sendable = item._file;
            }

            if (typeof item._file.size != 'number') {
              throw new TypeError('The file specified is no longer valid');
            }

            xhr.upload.onprogress = function (event) {
              var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
              _this5._onProgressItem(item, progress);
            };

            xhr.onload = function () {
              var headers = _this5._parseHeaders(xhr.getAllResponseHeaders());
              var response = _this5._transformResponse(xhr.response, headers);
              var gist = _this5._isSuccessCode(xhr.status) ? 'Success' : 'Error';
              var method = '_on' + gist + 'Item';
              _this5[method](item, response, xhr.status, headers);
              _this5._onCompleteItem(item, response, xhr.status, headers);
            };

            xhr.onerror = function () {
              var headers = _this5._parseHeaders(xhr.getAllResponseHeaders());
              var response = _this5._transformResponse(xhr.response, headers);
              _this5._onErrorItem(item, response, xhr.status, headers);
              _this5._onCompleteItem(item, response, xhr.status, headers);
            };

            xhr.onabort = function () {
              var headers = _this5._parseHeaders(xhr.getAllResponseHeaders());
              var response = _this5._transformResponse(xhr.response, headers);
              _this5._onCancelItem(item, response, xhr.status, headers);
              _this5._onCompleteItem(item, response, xhr.status, headers);
            };

            xhr.open(item.method, item.url, true);

            xhr.withCredentials = item.withCredentials;

            forEach(item.headers, function (value, name) {
              xhr.setRequestHeader(name, value);
            });

            xhr.send(sendable);
          };
          /**
           * The IFrame transport
           * @param {FileItem} item
           * @private
           */

          FileUploader.prototype._iframeTransport = function _iframeTransport(item) {
            var _this6 = this;

            var form = element('<form style="display: none;" />');
            var iframe = element('<iframe name="iframeTransport' + Date.now() + '">');
            var input = item._input;

            if (item._form) item._form.replaceWith(input); // remove old form
            item._form = form; // save link to new form

            input.prop('name', item.alias);

            forEach(item.formData, function (obj) {
              forEach(obj, function (value, key) {
                var element_ = element('<input type="hidden" name="' + key + '" />');
                element_.val(value);
                form.append(element_);
              });
            });

            form.prop({
              action: item.url,
              method: 'POST',
              target: iframe.prop('name'),
              enctype: 'multipart/form-data',
              encoding: 'multipart/form-data' // old IE
            });

            iframe.bind('load', function () {
              var html = '';
              var status = 200;

              try {
                // Fix for legacy IE browsers that loads internal error page
                // when failed WS response received. In consequence iframe
                // content access denied error is thrown becouse trying to
                // access cross domain page. When such thing occurs notifying
                // with empty response object. See more info at:
                // http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
                // Note that if non standard 4xx or 5xx error code returned
                // from WS then response content can be accessed without error
                // but 'XHR' status becomes 200. In order to avoid confusion
                // returning response via same 'success' event handler.

                // fixed angular.contents() for iframes
                html = iframe[0].contentDocument.body.innerHTML;
              } catch (e) {
                // in case we run into the access-is-denied error or we have another error on the server side
                // (intentional 500,40... errors), we at least say 'something went wrong' -> 500
                status = 500;
              }

              var xhr = {
                response: html,
                status: status,
                dummy: true
              };
              var headers = {};
              var response = _this6._transformResponse(xhr.response, headers);

              _this6._onSuccessItem(item, response, xhr.status, headers);
              _this6._onCompleteItem(item, response, xhr.status, headers);
            });

            form.abort = function () {
              var xhr = {
                status: 0,
                dummy: true
              };
              var headers = {};
              var response;

              iframe.unbind('load').prop('src', 'javascript:false;');
              form.replaceWith(input);

              _this6._onCancelItem(item, response, xhr.status, headers);
              _this6._onCompleteItem(item, response, xhr.status, headers);
            };

            input.after(form);
            form.append(input).append(iframe);

            form[0].submit();
          };
          /**
           * Inner callback
           * @param {File|Object} item
           * @param {Object} filter
           * @param {Object} options
           * @private
           */

          FileUploader.prototype._onWhenAddingFileFailed = function _onWhenAddingFileFailed(item, filter, options) {
            this.onWhenAddingFileFailed(item, filter, options);
          };
          /**
           * Inner callback
           * @param {FileItem} item
           */

          FileUploader.prototype._onAfterAddingFile = function _onAfterAddingFile(item) {
            this.onAfterAddingFile(item);
          };
          /**
           * Inner callback
           * @param {Array<FileItem>} items
           */

          FileUploader.prototype._onAfterAddingAll = function _onAfterAddingAll(items) {
            this.onAfterAddingAll(items);
          };
          /**
           *  Inner callback
           * @param {FileItem} item
           * @private
           */

          FileUploader.prototype._onBeforeUploadItem = function _onBeforeUploadItem(item) {
            item._onBeforeUpload();
            this.onBeforeUploadItem(item);
          };
          /**
           * Inner callback
           * @param {FileItem} item
           * @param {Number} progress
           * @private
           */

          FileUploader.prototype._onProgressItem = function _onProgressItem(item, progress) {
            var total = this._getTotalProgress(progress);
            this.progress = total;
            item._onProgress(progress);
            this.onProgressItem(item, progress);
            this.onProgressAll(total);
            this._render();
          };
          /**
           * Inner callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileUploader.prototype._onSuccessItem = function _onSuccessItem(item, response, status, headers) {
            item._onSuccess(response, status, headers);
            this.onSuccessItem(item, response, status, headers);
          };
          /**
           * Inner callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileUploader.prototype._onErrorItem = function _onErrorItem(item, response, status, headers) {
            item._onError(response, status, headers);
            this.onErrorItem(item, response, status, headers);
          };
          /**
           * Inner callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileUploader.prototype._onCancelItem = function _onCancelItem(item, response, status, headers) {
            item._onCancel(response, status, headers);
            this.onCancelItem(item, response, status, headers);
          };
          /**
           * Inner callback
           * @param {FileItem} item
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileUploader.prototype._onCompleteItem = function _onCompleteItem(item, response, status, headers) {
            item._onComplete(response, status, headers);
            this.onCompleteItem(item, response, status, headers);

            var nextItem = this.getReadyItems()[0];
            this.isUploading = false;

            if (isDefined(nextItem)) {
              nextItem.upload();
              return;
            }

            this.onCompleteAll();
            this.progress = this._getTotalProgress();
            this._render();
          };
          /**********************
           * STATIC
           **********************/
          /**
           * Returns "true" if value an instance of File
           * @param {*} value
           * @returns {Boolean}
           * @private
           */

          FileUploader.isFile = function isFile(value) {
            return File && value instanceof File;
          };
          /**
           * Returns "true" if value an instance of FileLikeObject
           * @param {*} value
           * @returns {Boolean}
           * @private
           */

          FileUploader.isFileLikeObject = function isFileLikeObject(value) {
            return value instanceof FileLikeObject;
          };
          /**
           * Returns "true" if value is array like object
           * @param {*} value
           * @returns {Boolean}
           */

          FileUploader.isArrayLikeObject = function isArrayLikeObject(value) {
            return isObject(value) && 'length' in value;
          };
          /**
           * Inherits a target (Class_1) by a source (Class_2)
           * @param {Function} target
           * @param {Function} source
           */

          FileUploader.inherit = function inherit(target, source) {
            target.prototype = Object.create(source.prototype);
            target.prototype.constructor = target;
            target.super_ = source;
          };

          return FileUploader;
        }();

        /**********************
         * PUBLIC
         **********************/
        /**
         * Checks a support the html5 uploader
         * @returns {Boolean}
         * @readonly
         */

        FileUploader.prototype.isHTML5 = !!(File && FormData);
        /**********************
         * STATIC
         **********************/
        /**
         * @borrows FileUploader.prototype.isHTML5
         */
        FileUploader.isHTML5 = FileUploader.prototype.isHTML5;

        return FileUploader;
      }

      __identity.$inject = ['fileUploaderOptions', '$rootScope', '$http', '$window', '$timeout', 'FileLikeObject', 'FileItem', 'Pipeline'];

      /***/
    },
    /* 4 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var _angular = angular;
      var copy = _angular.copy;
      var isElement = _angular.isElement;
      var isString = _angular.isString;

      function __identity() {

        return function () {
          /**
           * Creates an instance of FileLikeObject
           * @param {File|HTMLInputElement|Object} fileOrInput
           * @constructor
           */

          function FileLikeObject(fileOrInput) {
            _classCallCheck(this, FileLikeObject);

            var isInput = isElement(fileOrInput);
            var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
            var postfix = isString(fakePathOrObject) ? 'FakePath' : 'Object';
            var method = '_createFrom' + postfix;
            this[method](fakePathOrObject);
          }
          /**
           * Creates file like object from fake path string
           * @param {String} path
           * @private
           */

          FileLikeObject.prototype._createFromFakePath = function _createFromFakePath(path) {
            this.lastModifiedDate = null;
            this.size = null;
            this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
            this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
          };
          /**
           * Creates file like object from object
           * @param {File|FileLikeObject} object
           * @private
           */

          FileLikeObject.prototype._createFromObject = function _createFromObject(object) {
            this.lastModifiedDate = copy(object.lastModifiedDate);
            this.size = object.size;
            this.type = object.type;
            this.name = object.name;
          };

          return FileLikeObject;
        }();
      }

      /***/
    },
    /* 5 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var _angular = angular;
      var copy = _angular.copy;
      var extend = _angular.extend;
      var element = _angular.element;
      var isElement = _angular.isElement;

      function __identity($compile, FileLikeObject) {

        return function () {
          /**
           * Creates an instance of FileItem
           * @param {FileUploader} uploader
           * @param {File|HTMLInputElement|Object} some
           * @param {Object} options
           * @constructor
           */

          function FileItem(uploader, some, options) {
            _classCallCheck(this, FileItem);

            var isInput = isElement(some);
            var input = isInput ? element(some) : uploader.target.clone() || null;
            var file = !isInput ? some : null;

            extend(this, {
              url: uploader.url,
              alias: uploader.alias,
              headers: copy(uploader.headers),
              formData: copy(uploader.formData),
              removeAfterUpload: uploader.removeAfterUpload,
              withCredentials: uploader.withCredentials,
              disableMultipart: uploader.disableMultipart,
              method: uploader.method
            }, options, {
              uploader: uploader,
              file: new FileLikeObject(some),
              isReady: false,
              isUploading: false,
              isUploaded: false,
              isSuccess: false,
              isCancel: false,
              isError: false,
              progress: 0,
              index: null,
              _file: file,
              _input: input
            });

            // if (input) this._replaceNode(input);
          }
          /**********************
           * PUBLIC
           **********************/
          /**
           * Uploads a FileItem
           */

          FileItem.prototype.upload = function upload() {
            try {
              this.uploader.uploadItem(this);
            } catch (e) {
              console.error(e);
              var message = e.name + ':' + e.message;
              this.uploader._onCompleteItem(this, message, e.code, []);
              this.uploader._onErrorItem(this, message, e.code, []);
            }
          };
          /**
           * Cancels uploading of FileItem
           */

          FileItem.prototype.cancel = function cancel() {
            this.uploader.cancelItem(this);
          };
          /**
           * Removes a FileItem
           */

          FileItem.prototype.remove = function remove() {
            this.uploader.removeFromQueue(this);
          };
          /**
           * Callback
           * @private
           */

          FileItem.prototype.onBeforeUpload = function onBeforeUpload() {};
          /**
           * Callback
           * @param {Number} progress
           * @private
           */

          FileItem.prototype.onProgress = function onProgress(progress) {};
          /**
           * Callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileItem.prototype.onSuccess = function onSuccess(response, status, headers) {};
          /**
           * Callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileItem.prototype.onError = function onError(response, status, headers) {};
          /**
           * Callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileItem.prototype.onCancel = function onCancel(response, status, headers) {};
          /**
           * Callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           */

          FileItem.prototype.onComplete = function onComplete(response, status, headers) {};
          /**********************
           * PRIVATE
           **********************/
          /**
           * Inner callback
           */

          FileItem.prototype._onBeforeUpload = function _onBeforeUpload() {
            this.isReady = true;
            this.isUploading = false;
            this.isUploaded = false;
            this.isSuccess = false;
            this.isCancel = false;
            this.isError = false;
            this.progress = 0;
            this.onBeforeUpload();
          };
          /**
           * Inner callback
           * @param {Number} progress
           * @private
           */

          FileItem.prototype._onProgress = function _onProgress(progress) {
            this.progress = progress;
            this.onProgress(progress);
          };
          /**
           * Inner callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileItem.prototype._onSuccess = function _onSuccess(response, status, headers) {
            this.isReady = false;
            this.isUploading = false;
            this.isUploaded = true;
            this.isSuccess = true;
            this.isCancel = false;
            this.isError = false;
            this.progress = 100;
            this.index = null;
            this.onSuccess(response, status, headers);
          };
          /**
           * Inner callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileItem.prototype._onError = function _onError(response, status, headers) {
            this.isReady = false;
            this.isUploading = false;
            this.isUploaded = true;
            this.isSuccess = false;
            this.isCancel = false;
            this.isError = true;
            this.progress = 0;
            this.index = null;
            this.onError(response, status, headers);
          };
          /**
           * Inner callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileItem.prototype._onCancel = function _onCancel(response, status, headers) {
            this.isReady = false;
            this.isUploading = false;
            this.isUploaded = false;
            this.isSuccess = false;
            this.isCancel = true;
            this.isError = false;
            this.progress = 0;
            this.index = null;
            this.onCancel(response, status, headers);
          };
          /**
           * Inner callback
           * @param {*} response
           * @param {Number} status
           * @param {Object} headers
           * @private
           */

          FileItem.prototype._onComplete = function _onComplete(response, status, headers) {
            this.onComplete(response, status, headers);
            if (this.removeAfterUpload) this.remove();
          };
          /**
           * Destroys a FileItem
           */

          FileItem.prototype._destroy = function _destroy() {
            if (this._input) this._input.remove();
            if (this._form) this._form.remove();
            delete this._form;
            delete this._input;
          };
          /**
           * Prepares to uploading
           * @private
           */

          FileItem.prototype._prepareToUploading = function _prepareToUploading() {
            this.index = this.index || ++this.uploader._nextIndex;
            this.isReady = true;
          };
          /**
           * Replaces input element on his clone
           * @param {JQLite|jQuery} input
           * @private
           */

          FileItem.prototype._replaceNode = function _replaceNode(input) {
            var clone = $compile(input.clone())(input.scope());
            clone.prop('value', null); // FF fix
            input.css('display', 'none');
            input.after(clone); // remove jquery dependency
          };

          return FileItem;
        }();
      }

      __identity.$inject = ['$compile', 'FileLikeObject'];

      /***/
    },
    /* 6 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var _angular = angular;
      var extend = _angular.extend;

      function __identity() {
        var FileDirective = function () {
          /**
           * Creates instance of {FileDirective} object
           * @param {Object} options
           * @param {Object} options.uploader
           * @param {HTMLElement} options.element
           * @param {Object} options.events
           * @param {String} options.prop
           * @constructor
           */

          function FileDirective(options) {
            _classCallCheck(this, FileDirective);

            extend(this, options);
            this.uploader._directives[this.prop].push(this);
            this._saveLinks();
            this.bind();
          }
          /**
           * Binds events handles
           */

          FileDirective.prototype.bind = function bind() {
            for (var key in this.events) {
              var prop = this.events[key];
              this.element.bind(key, this[prop]);
            }
          };
          /**
           * Unbinds events handles
           */

          FileDirective.prototype.unbind = function unbind() {
            for (var key in this.events) {
              this.element.unbind(key, this.events[key]);
            }
          };
          /**
           * Destroys directive
           */

          FileDirective.prototype.destroy = function destroy() {
            var index = this.uploader._directives[this.prop].indexOf(this);
            this.uploader._directives[this.prop].splice(index, 1);
            this.unbind();
            // this.element = null;
          };
          /**
           * Saves links to functions
           * @private
           */

          FileDirective.prototype._saveLinks = function _saveLinks() {
            for (var key in this.events) {
              var prop = this.events[key];
              this[prop] = this[prop].bind(this);
            }
          };

          return FileDirective;
        }();

        /**
         * Map of events
         * @type {Object}
         */

        FileDirective.prototype.events = {};

        return FileDirective;
      }

      /***/
    },
    /* 7 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var _angular = angular;
      var extend = _angular.extend;

      function __identity($compile, FileDirective) {

        return function (_FileDirective) {
          _inherits(FileSelect, _FileDirective);

          /**
           * Creates instance of {FileSelect} object
           * @param {Object} options
           * @constructor
           */

          function FileSelect(options) {
            _classCallCheck(this, FileSelect);

            var extendedOptions = extend(options, {
              // Map of events
              events: {
                $destroy: 'destroy',
                change: 'onChange'
              },
              // Name of property inside uploader._directive object
              prop: 'select'
            });

            var _this = _possibleConstructorReturn(this, _FileDirective.call(this, extendedOptions));

            if (!_this.uploader.isHTML5) {
              _this.element.removeAttr('multiple');
            }
            _this.element.prop('value', null); // FF fix
            return _this;
          }
          /**
           * Returns options
           * @return {Object|undefined}
           */

          FileSelect.prototype.getOptions = function getOptions() {};
          /**
           * Returns filters
           * @return {Array<Function>|String|undefined}
           */

          FileSelect.prototype.getFilters = function getFilters() {};
          /**
           * If returns "true" then HTMLInputElement will be cleared
           * @returns {Boolean}
           */

          FileSelect.prototype.isEmptyAfterSelection = function isEmptyAfterSelection() {
            return !!this.element.attr('multiple');
          };
          /**
           * Event handler
           */

          FileSelect.prototype.onChange = function onChange() {
            var files = this.uploader.isHTML5 ? this.element[0].files : this.element[0];
            var options = this.getOptions();
            var filters = this.getFilters();

            if (!this.uploader.isHTML5) this.destroy();
            this.uploader.addToQueue(files, options, filters);
            if (this.isEmptyAfterSelection()) {
              this.element.prop('value', null);
              this.element.replaceWith($compile(this.element.clone())(this.scope)); // IE fix
            }
          };

          return FileSelect;
        }(FileDirective);
      }

      __identity.$inject = ['$compile', 'FileDirective'];

      /***/
    },
    /* 8 */
    /***/
    function (module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        } else {
          return Array.from(arr);
        }
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var _angular = angular;
      var bind = _angular.bind;
      var isUndefined = _angular.isUndefined;

      function __identity($q) {

        return function () {
          /**
           * @param {Array<Function>} pipes
           */

          function Pipeline() {
            var pipes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            _classCallCheck(this, Pipeline);

            this.pipes = pipes;
          }

          Pipeline.prototype.next = function next(args) {
            var pipe = this.pipes.shift();
            if (isUndefined(pipe)) {
              this.onSuccessful.apply(this, _toConsumableArray(args));
              return;
            }
            var err = new Error('The filter has not passed');
            err.pipe = pipe;
            err.args = args;
            if (pipe.isAsync) {
              var deferred = $q.defer();
              var onFulfilled = bind(this, this.next, args);
              var onRejected = bind(this, this.onThrown, err);
              deferred.promise.then(onFulfilled, onRejected);
              pipe.apply(undefined, _toConsumableArray(args).concat([deferred]));
            } else {
              var isDone = Boolean(pipe.apply(undefined, _toConsumableArray(args)));
              if (isDone) {
                this.next(args);
              } else {
                this.onThrown(err);
              }
            }
          };

          Pipeline.prototype.exec = function exec() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            this.next(args);
          };

          Pipeline.prototype.onThrown = function onThrown(err) {};

          Pipeline.prototype.onSuccessful = function onSuccessful() {};

          return Pipeline;
        }();
      }

      __identity.$inject = ['$q'];

      /***/
    },
    /* 9 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var _angular = angular;
      var extend = _angular.extend;
      var forEach = _angular.forEach;

      function __identity(FileDirective) {

        return function (_FileDirective) {
          _inherits(FileDrop, _FileDirective);

          /**
           * Creates instance of {FileDrop} object
           * @param {Object} options
           * @constructor
           */

          function FileDrop(options) {
            _classCallCheck(this, FileDrop);

            var extendedOptions = extend(options, {
              // Map of events
              events: {
                $destroy: 'destroy',
                drop: 'onDrop',
                dragover: 'onDragOver',
                dragleave: 'onDragLeave'
              },
              // Name of property inside uploader._directive object
              prop: 'drop'
            });

            return _possibleConstructorReturn(this, _FileDirective.call(this, extendedOptions));
          }
          /**
           * Returns options
           * @return {Object|undefined}
           */

          FileDrop.prototype.getOptions = function getOptions() {};
          /**
           * Returns filters
           * @return {Array<Function>|String|undefined}
           */

          FileDrop.prototype.getFilters = function getFilters() {};
          /**
           * Event handler
           */

          FileDrop.prototype.onDrop = function onDrop(event) {
            var transfer = this._getTransfer(event);
            if (!transfer) return;
            var options = this.getOptions();
            var filters = this.getFilters();
            this._preventAndStop(event);
            forEach(this.uploader._directives.over, this._removeOverClass, this);
            this.uploader.addToQueue(transfer.files, options, filters);
          };
          /**
           * Event handler
           */

          FileDrop.prototype.onDragOver = function onDragOver(event) {
            var transfer = this._getTransfer(event);
            if (!this._haveFiles(transfer.types)) return;
            transfer.dropEffect = 'copy';
            this._preventAndStop(event);
            forEach(this.uploader._directives.over, this._addOverClass, this);
          };
          /**
           * Event handler
           */

          FileDrop.prototype.onDragLeave = function onDragLeave(event) {
            if (event.currentTarget === this.element[0]) return;
            this._preventAndStop(event);
            forEach(this.uploader._directives.over, this._removeOverClass, this);
          };
          /**
           * Helper
           */

          FileDrop.prototype._getTransfer = function _getTransfer(event) {
            return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
          };
          /**
           * Helper
           */

          FileDrop.prototype._preventAndStop = function _preventAndStop(event) {
            event.preventDefault();
            event.stopPropagation();
          };
          /**
           * Returns "true" if types contains files
           * @param {Object} types
           */

          FileDrop.prototype._haveFiles = function _haveFiles(types) {
            if (!types) return false;
            if (types.indexOf) {
              return types.indexOf('Files') !== -1;
            } else if (types.contains) {
              return types.contains('Files');
            } else {
              return false;
            }
          };
          /**
           * Callback
           */

          FileDrop.prototype._addOverClass = function _addOverClass(item) {
            item.addOverClass();
          };
          /**
           * Callback
           */

          FileDrop.prototype._removeOverClass = function _removeOverClass(item) {
            item.removeOverClass();
          };

          return FileDrop;
        }(FileDirective);
      }

      __identity.$inject = ['FileDirective'];

      /***/
    },
    /* 10 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var _angular = angular;
      var extend = _angular.extend;

      function __identity(FileDirective) {

        return function (_FileDirective) {
          _inherits(FileOver, _FileDirective);

          /**
           * Creates instance of {FileDrop} object
           * @param {Object} options
           * @constructor
           */

          function FileOver(options) {
            _classCallCheck(this, FileOver);

            var extendedOptions = extend(options, {
              // Map of events
              events: {
                $destroy: 'destroy'
              },
              // Name of property inside uploader._directive object
              prop: 'over',
              // Over class
              overClass: 'nv-file-over'
            });

            return _possibleConstructorReturn(this, _FileDirective.call(this, extendedOptions));
          }
          /**
           * Adds over class
           */

          FileOver.prototype.addOverClass = function addOverClass() {
            this.element.addClass(this.getOverClass());
          };
          /**
           * Removes over class
           */

          FileOver.prototype.removeOverClass = function removeOverClass() {
            this.element.removeClass(this.getOverClass());
          };
          /**
           * Returns over class
           * @returns {String}
           */

          FileOver.prototype.getOverClass = function getOverClass() {
            return this.overClass;
          };

          return FileOver;
        }(FileDirective);
      }

      __identity.$inject = ['FileDirective'];

      /***/
    },
    /* 11 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function __identity($parse, FileUploader, FileSelect) {

        return {
          link: function link(scope, element, attributes) {
            var uploader = scope.$eval(attributes.uploader);

            if (!(uploader instanceof FileUploader)) {
              throw new TypeError('"Uploader" must be an instance of FileUploader');
            }

            var object = new FileSelect({
              uploader: uploader,
              element: element,
              scope: scope
            });

            object.getOptions = $parse(attributes.options).bind(object, scope);
            object.getFilters = function () {
              return attributes.filters;
            };
          }
        };
      }

      __identity.$inject = ['$parse', 'FileUploader', 'FileSelect'];

      /***/
    },
    /* 12 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function __identity($parse, FileUploader, FileDrop) {

        return {
          link: function link(scope, element, attributes) {
            var uploader = scope.$eval(attributes.uploader);

            if (!(uploader instanceof FileUploader)) {
              throw new TypeError('"Uploader" must be an instance of FileUploader');
            }

            if (!uploader.isHTML5) return;

            var object = new FileDrop({
              uploader: uploader,
              element: element
            });

            object.getOptions = $parse(attributes.options).bind(object, scope);
            object.getFilters = function () {
              return attributes.filters;
            };
          }
        };
      }

      __identity.$inject = ['$parse', 'FileUploader', 'FileDrop'];

      /***/
    },
    /* 13 */
    /***/
    function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports['default'] = __identity;

      var _config = __webpack_require__(1);

      var _config2 = _interopRequireDefault(_config);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          'default': obj
        };
      }

      function __identity(FileUploader, FileOver) {

        return {
          link: function link(scope, element, attributes) {
            var uploader = scope.$eval(attributes.uploader);

            if (!(uploader instanceof FileUploader)) {
              throw new TypeError('"Uploader" must be an instance of FileUploader');
            }

            var object = new FileOver({
              uploader: uploader,
              element: element
            });

            object.getOverClass = function () {
              return attributes.overClass || object.overClass;
            };
          }
        };
      }

      __identity.$inject = ['FileUploader', 'FileOver'];

      /***/
    }
    /******/
    ])
  );
});;
//# sourceMappingURL=angular-file-upload.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

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

var _message = __webpack_require__("WB2H");

var _message2 = _interopRequireDefault(_message);

__webpack_require__("4uR7");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], ['angularFileUpload', _button2['default'], _icons2['default'], _progress2['default'], _message2['default']]).config(function () {}).run(function () {});

__webpack_require__("m196");

exports['default'] = _name2['default'];

/***/ }),

/***/ "8o0r":
/***/ (function(module, exports) {

module.exports = "<div class=\"upload-image-items\">\n  <div class=\"upload-image-item\"\n    ng-class=\"{error: file.error}\"\n    data-id=\"{{file.id}}\"\n    ng-repeat=\"file in ngModel track by $index\">\n\n    <div class=\"image\"\n      ng-if=\"file.url && (isImg(file) || isSnapshot(file))\"\n      ng-style=\"{\n        'background-image': 'url({{file.url}})'\n      }\"></div>\n    <div class=\"image\"\n      ng-if=\"file.url && isVideo(file)\"\n      ng-style=\"{\n        'background-image': 'url({{file.cover_url || getSnapshot(file)}})'\n      }\"\n    >\n    </div>\n    <div class=\"image\"\n      ng-if=\"!file.url && file.id && isImg(file)\"\n      ng-style=\"{\n        'background-image': 'url({{$ctrl.uploadConfig.viewUrl + '?file_id=' + file.id}})'\n      }\"></div>\n\n    <div class=\"image\"\n      ng-if=\"!isImg(file) && !isVideo(file) && !isSnapshot(file)\">\n      <ma-icon ma-type=\"{{getFileIcon(file)}}\"></ma-icon>\n    </div>\n\n    <div class=\"handle-box\"\n      ng-show=\"file.progress === undefined || file.progress === 100\">\n      <div>\n        <ma-icon class=\"close\"\n        ma-type=\"{{isVideo(file) ? 'playcircleo' : 'eyeo'}}\"\n        ma-click=\"viewFile(ngModel, file, $index)\"></ma-icon>\n        <ma-icon class=\"close\"\n          ma-type=\"delete\"\n          ma-click=\"delFile(file, $index)\"\n          ng-show=\"showDelete != 'false' && file.showDelete !== false && (file.progress === undefined || file.progress === 100)\"></ma-icon>\n      </div>\n    </div>\n\n    <ma-progress ma-type=\"circle\"\n      ma-status=\"danger\"\n      ma-size=\"70\"\n      ma-stroke-width=\"5\"\n      ma-percent=\"{{file.progress}}\"\n      ng-show=\"file.progress !== undefined && file.progress !== 100\"></ma-progress>\n  </div>\n\n\n  <div class=\"upload-image-item add\"\n    ng-hide=\"$ctrl.uploadConfig.limit <= ngModel.length\">\n    <div class=\"upload-img-item-add-box\">\n      <div class=\"upload-img-item-add-box-container\">\n        <ma-icon ma-type=\"plus\"></ma-icon>\n        <div>{{$ctrl.uploadConfig.uploadText || '上传照片'}}</div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"upload-image-item add-double\"\n    ng-repeat=\"item in $ctrl.uploadConfig.limitArray track by $index\"\n    ma-click=\"clickInput($event)\"\n    ng-if=\"$index < ($ctrl.uploadConfig.limit - ngModel.length) && $index !== 0\">\n    <div class=\"upload-img-item-add-box\">\n        <div class=\"upload-img-item-add-box-container\">\n          <ma-icon ma-type=\"plus\"></ma-icon>\n          <div>{{$ctrl.uploadConfig.uploadText || '上传照片'}}</div>\n        </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "F7JF":
/***/ (function(module, exports) {

module.exports = "<div class=\"weak-tip\" ng-show=\"$root.weakTipList.length\">\n  <div ng-repeat=\"tip in $root.weakTipList\" ng-if=\"tip.remove !== true\">\n    <div\n    ng-click=\"$root.$hideMessage($index)\"\n    ng-class=\"{'show-in': tip.hide === false, 'weak-tip-success': tip.type == 'success', 'weak-tip-danger': tip.type == 'danger', 'weak-tip-warning': tip.type == 'warning'}\" ng-bind=\"tip.text\"\n    ng-cloak></div>\n  </div>\n</div>\n";

/***/ }),

/***/ "HDDE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = 'meetyou.angular.ui.message';

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

module.exports = "<div\n  class=\"ma-progress {{type}}\"\n  ng-class=\"{\n    success: status === 'success',\n    warning: status === 'warning',\n    danger: status === 'danger',\n  }\"\n  ng-style=\"{\n    width: size + 'px',\n    height: type !== 'line' ? (size + 'px') : '',\n  }\"\n>\n  <svg\n    ng-show=\"type === 'circle'\"\n    width=\"120px\"\n    height=\"120px\"\n    class=\"ma-progress-circle\"\n    viewBox=\"0 0 100 100\">\n    <path\n      class=\"ma-progress-circle-trail\" d=\"M 50,50 m 0,-47\n      a 47,47 0 1 1 0,94\n      a 47,47 0 1 1 0,-94\"\n      stroke-width=\"{{strokeWidth}}\"\n      fill-opacity=\"0\"\n      ng-style=\"{\n        strokeDasharray: '295.31px, 295.31px'\n      }\"\n    >\n    </path>\n    <path\n      class=\"ma-progress-circle-path\"\n      d=\"M 50,50 m 0,-47\n      a 47,47 0 1 1 0,94\n      a 47,47 0 1 1 0,-94\"\n      stroke-linecap=\"round\"\n      stroke-width=\"{{strokeWidth}}\"\n      fill-opacity=\"0\"\n      ng-style=\"{\n        strokeDasharray: (295.31 * (percent / 100)) + 'px, 295.31px'\n      }\"\n      style=\"\"\n    >\n    </path>\n  </svg>\n  <div\n    class=\"ma-progress-line\"\n    ng-show=\"type === 'line'\"\n  >\n    <div\n      class=\"ma-progress-line-trail\"\n      ng-style=\"{\n        height: strokeWidth + 'px',\n        width: size + 'px',\n      }\"\n    >\n      <div\n        class=\"ma-progress-line-path\"\n        ng-style=\"{\n          width: percent + '%'\n        }\"\n      ></div>\n    </div>\n  </div>\n  <div class=\"ma-progress-content\" ng-transclude></div>\n</div>\n";

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
          scope.$event = e;
          $parse(attrs.maClick)(scope);
        }

        $timeout();

        $timeout(function () {
          element.removeClass('ma-click-disabled');
        }, parseInt(attrs.delay, 10) || 50);
      });
    }
  };
}

maButton.$inject = [];

function maButton() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div\n    class="ma-button {{size}} {{type}}"\n    ng-class="{\n      disabled: disabled,\n      flat: flat === \'true\',\n      active: active === \'true\',\n      loading: loading === \'true\',\n    }" ng-transclude></div>',
    scope: {
      size: '@maSize',
      type: '@maType',
      flat: '@maFlat',
      active: '@maActive',
      loading: '@maLoading',
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

/***/ "WB2H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = __webpack_require__("HDDE");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default'], []).config(function () {}).run(function () {});

__webpack_require__("fbZV");
__webpack_require__("/Las");

exports['default'] = _name2['default'];

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

module.exports = "\n<div class=\"upload-file-items\">\n  <div class=\"upload-file-item\" ng-class=\"{error: file.error}\" data-id=\"{{file.id}}\" ng-repeat=\"file in ngModel track by file.id\">\n    <ma-progress\n      ma-type=\"circle\"\n      ma-status=\"danger\"\n      ma-size=\"10\"\n      ma-stroke-width=\"10\"\n      ma-percent=\"{{file.progress}}\"\n      ng-show=\"file.progress !== undefined && file.progress !== 100\"\n    ></ma-progress>\n    <ma-icon\n      ng-show=\"file.progress === undefined || file.progress === 100\"\n      ma-type=\"paperclip\"\n    ></ma-icon>\n    <a href=\"javascript:void(0)\" ma-click=\"viewFile(ngModel, file, $index)\">{{file.name}}</a>\n    <ma-icon\n      class=\"close\"\n      ma-type=\"close\"\n      ma-click=\"delFile(file, $index)\"\n      ng-show=\"showDelete !== 'false' && file.showDelete !== false && (file.progress === undefined || file.progress === 100)\"\n    ></ma-icon>\n    <!--div class=\"upload-item-progress\" ng-if=\"file.progress !== undefined && file.progress !== 100\">\n      <span ng-style=\"{width: file.progress + '%'}\"></span>\n    </div-->\n  </div>\n</div>\n";

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

/***/ "fbZV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _name = __webpack_require__("HDDE");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maMessage', maMessage);

maMessage.$inject = [];

function maMessage() {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs, ctrl) {}
  };
}

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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _name = __webpack_require__("N6Gv");

var _name2 = _interopRequireDefault(_name);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _moment = __webpack_require__("PJh5");

var _moment2 = _interopRequireDefault(_moment);

var _maUploadTpl = __webpack_require__("Z/eS");

var _maUploadTpl2 = _interopRequireDefault(_maUploadTpl);

var _maUploadImageTpl = __webpack_require__("8o0r");

var _maUploadImageTpl2 = _interopRequireDefault(_maUploadImageTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

angular.module(_name2['default']).directive('maUpload', maUpload).directive('maUploadImage', maUploadImage).directive('maUploadOss', maUploadOss).directive('maUploadImageOss', maUploadImageOss);

// config
// {
//  url: '/upload/index',
//  viewUrl: '/upload/download',
//  alias: 'file',
//  headers: {},
//  queue: [],
//  progress: 0,
//  autoUpload: true,
//  removeAfterUpload: false,
//  method: 'POST',
//  filters: [],
//  formData: [],
//  queueLimit: Number.MAX_VALUE,
//  withCredentials: false,
//  disableMultipart: false

//  非插件额外配置
//  multiple: false
//  limit: Number.MAX_VALUE,
//  size: 10 * 1024 * 1024,
//  size: {
//    gif: 10 * 1024 * 1024,
//    png: 10 * 1024 * 1024,
//    jpg: 10 * 1024 * 1024
//  },
//  accept: '',
//  convert: function(data, response){}, // 上传成功后回调
//  uploadText: '上传照片',
//  buttonBaseOnLimit: false,

//  oss配置
//  ossConfig: {
//   OSSAccessKeyId: '',
//   signature: '',
//   policy: '',
//   dir: '',
//  }
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

maUpload.$inject = ['$compile', 'FileUploader', '$message', '$utils'];
maUploadImage.$inject = ['$compile', 'FileUploader', '$message', '$utils'];
maUploadOss.$inject = ['$compile', 'FileUploader', '$message', '$utils'];
maUploadImageOss.$inject = ['$compile', 'FileUploader', '$message', '$utils'];

function maUpload($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, _maUploadTpl2['default'], {});
}

function maUploadImage($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, _maUploadImageTpl2['default'], {
    accept: 'image/*'
  });
}

function maUploadOss($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, _maUploadTpl2['default'], {});
}

function maUploadImageOss($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, _maUploadImageTpl2['default'], {
    accept: 'image/*'
  });
}

function _maUpload($compile, FileUploader, $message, $utils, template, defaultConfig) {
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

    var allImageAccept = 'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg';

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

    var fileInput = (0, _jquery2['default'])('<input\n    type="file"\n    nv-file-select=""\n    ' + multiple + '\n    ' + accept + '\n    uploader=\'' + uploader + '\'/>');

    config.target = angular.element(fileInput);

    scope.$ctrl.uploadConfig = config;

    var newUploader = new FileUploader(config);

    scope[uploader] = newUploader;
    newUploader.onBeforeUploadItem = onBeforeUploadItem;
    newUploader.onProgressItem = onProgressItem;
    newUploader.onSuccessItem = onSuccessItem;
    newUploader.onErrorItem = onErrorItem;
    newUploader.onCompleteItem = onCompleteItem;
    newUploader.onCancelItem = onCompleteItem;
    newUploader.onWhenAddingFileFailed = onCompleteItem;

    if ((0, _jquery2['default'])(element).parents('.ma-button').length) {
      element = (0, _jquery2['default'])(element).parents('.ma-button');
      element.css({
        position: 'relative'
      });
      appendElement();
    } else if (element.attr('ma-upload-image') !== undefined) {
      element.append(template);
      (0, _jquery2['default'])(element).find('.upload-image-item.add').eq(0).append(fileInput);
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
        size: 10 * 1024 * 1024,
        accept: '',
        formData: [],
        convertData: function convertData(data) {}
      }, _jquery2['default'].extend(true, _jquery2['default'].extend(true, {}, defaultConfig), scope.uploadConfig || {}));

      // 如果有oss配置
      if (config.ossConfig) {
        var ossConfig = config.ossConfig;
        // eslint-disable-next-line
        var key = '${filename}';

        key = $utils.uuid() + '_' + key;

        if (ossConfig.dir) {
          key = ossConfig.dir + '/' + key;
        }

        config.formData.push({
          key: key,
          policy: ossConfig.policy,
          success_action_status: 200,
          OSSAccessKeyId: ossConfig.OSSAccessKeyId,
          signature: ossConfig.signature
        });
      }

      if (config.limit !== Number.MAX_VALUE && config.buttonBaseOnLimit) {
        config.limitArray = new Array(config.limit);
      } else {
        config.limitArray = new Array(1);
      }

      // 初始化 uploader 实例
      if (!config.filters) {
        config.filters = [];
      }

      config.filters.push({
        name: 'limitFilter',
        fn: function fn(item, options) {
          if (scope.ngModel.length >= config.limit) {
            $message.danger('最多只能上传' + config.limit + '个文件');
            return false;
          }
          return true;
        }
      });

      config.filters.push({
        name: 'sizeFilter',
        fn: function fn(item, options) {
          var itemName = item.name.toUpperCase();

          if (typeof config.size === 'number' && item.size > config.size) {
            showSizeTip(config.size);
            return false;
          }
          if (_typeof(config.size) === 'object') {
            var hasOver = false;
            angular.each(config.size, function (size, type) {
              type = type.toUpperCase();
              if (type === '*' || itemName.includes('.' + type)) {
                if (item.size > size && !hasOver) {
                  showSizeTip(size, type);
                  hasOver = true;
                }
              }
            });
            if (hasOver) {
              return false;
            }
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

          var types = '|jpg|png|jpeg|bmp|gif|svg|';
          var type = ('|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|').toLowerCase();

          if (config.accept !== 'image/*' && config.accept !== allImageAccept) {
            types = config.accept.toLowerCase();
            types = types.replace(/image\//g, '');
            types = types.split(',');
            types = '|' + types.join('|') + '|';

            // 如果有其他格式就不判断了
            if (/application/g.test(config.accept)) {
              return true;
            }
            if (/video/g.test(config.accept)) {
              types = config.accept.toLowerCase();
              types = types.replace(/video\//g, '');
              types = types.split(',');
              types = '|' + types.join('|') + '|';
            }
          }
          if (types.indexOf(type) === -1) {
            $message.danger(/video/g.test(config.accept) ? '请选择视频' : '请选择图片');
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
          } else {
            d.id = $utils.uuid();
          }
          // 如果是oss
          if (config.ossConfig) {
            var formData = fileItem.formData || [];
            var fileConfig = formData.filter(function (item) {
              return item.OSSAccessKeyId;
            })[0];

            d.url = config.url + '/' + fileConfig.key.replace(/\${filename}/g, fileItem.file.name);
          }

          if (config.convert) {
            config.convert(d, response, scope.ngModel);
          }
        }
      });
    }

    function onErrorItem(fileItem, response, status, headers) {
      // console.log('onErrorItem---', '[', fileItem._file.name, ']');

      if (response.message) {
        $message.danger(response.message);
      }

      if (typeof response === 'string') {
        $message.danger((0, _jquery2['default'])(response).text());
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

    function showSizeTip(size, type) {
      var m = size / 1024 / 1024;
      var mText = (m + '').indexOf('.') !== -1 ? parseFloat(m).toFixed(2) : parseFloat(m);
      var k = size / 1024;

      if (m < 1) {
        $message.danger((type || '') + '\u6700\u5927\u53EA\u80FD\u4E0A\u4F20' + parseInt(k, 10) + 'K\u7684\u6587\u4EF6');
      } else {
        $message.danger((type || '') + '\u6700\u5927\u53EA\u80FD\u4E0A\u4F20' + mText + 'M\u7684\u6587\u4EF6');
      }
    }
  }
}

maUploadController.$inject = ['$scope', '$lightGallery', '$element'];

function maUploadController($scope, $lightGallery, $element) {
  $scope.viewFile = viewFile;
  $scope.delFile = delFile;
  $scope.isImg = isImg;
  $scope.isSnapshot = isSnapshot;
  $scope.isVideo = isVideo;
  $scope.getFileIcon = getFileIcon;
  $scope.clickInput = clickInput;
  $scope.getSnapshot = getSnapshot;

  function isSnapshot(file) {
    if (file && file.url) {
      return (/x-oss-process=video\/snapshot/g.test(file.url)
      );
    }
    return false;
  }

  function getSnapshot(file) {
    var snapshotUrl = '';

    // 转换视频封面图
    if (isVideo(file) && file.url) {
      snapshotUrl = file.url + '?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast';
    }
    return snapshotUrl;
  }

  function clickInput($event) {
    (0, _jquery2['default'])($element).find('input').trigger('click', {
      e: $event
    });
  }

  function viewFile(files, file, $index) {
    var urls = [];
    var index = false;

    if (!files.length) {
      files = [files];
    }

    angular.each(files, function (d, i) {
      if (d === file) {
        index = urls.length;
      }
      if (isImg(d) || isSnapshot(d)) {
        urls.push(d.url || $scope.uploaderConfig.viewUrl + '?file_id=' + d.id);
      }
    });

    if (isImg(file) || isSnapshot(file)) {
      $lightGallery.preview(urls, {
        index: index
      });
      return;
    }

    window.open(file.url);
  }

  function isVideo(file) {
    file = _jquery2['default'].extend(true, {}, file);

    var reg = /\.(mp4)$/g;
    file.name += '';
    file.url += '';

    file.name = file.name.toLowerCase();
    file.url = file.url.toLowerCase();

    if (reg.test(file.name) || reg.test(file.url)) {
      return true;
    }
    return false;
  }

  function isImg(file) {
    file = _jquery2['default'].extend(true, {}, file);

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
    file = _jquery2['default'].extend(true, {}, file);

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
    transclude: true,
    scope: {
      type: '@maType',
      size: '@maSize'
    },
    template: '\n    <i\n      class="iconfont icon-{{type}}"\n      ng-style="{fontSize: size + \'px\'}"\n      ng-transclude\n    ></i>',
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