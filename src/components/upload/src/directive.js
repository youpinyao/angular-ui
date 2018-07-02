import moduleName from './name.js';
import $ from 'jquery';
import moment from 'moment';
import maUploadTpl from './maUploadTpl.html';
import maUploadImageTpl from './maUploadImageTpl.html';

angular.module(moduleName)
  .directive('maUpload', maUpload)
  .directive('maUploadImage', maUploadImage)
  .directive('maUploadOss', maUploadOss)
  .directive('maUploadImageOss', maUploadImageOss);

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
  return _maUpload($compile, FileUploader, $message, $utils, maUploadTpl, {});
}

function maUploadImage($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, maUploadImageTpl, {
    accept: 'image/*'
  });
}

function maUploadOss($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, maUploadTpl, {});
}

function maUploadImageOss($compile, FileUploader, $message, $utils) {
  return _maUpload($compile, FileUploader, $message, $utils, maUploadImageTpl, {
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
      showDelete: '@maShowDelete',
    },
    controllerAs: '$ctrl',
    controller: maUploadController,
    link: maUploadLink,
  };

  function maUploadLink(scope, element, attrs, ctrl) {
    if (!scope.ngModel) {
      scope.ngModel = [];
    }

    let multiple = '';
    let accept = '';
    let uploader = 'uploader';
    let config = getConfig();

    const allImageAccept =
      'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg';

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

    const fileInput = $(
      `<input
    type="file"
    nv-file-select=""
    ${multiple}
    ${accept}
    uploader='${uploader}'/>`
    );

    config.target = angular.element(fileInput);

    scope.$ctrl.uploadConfig = config;

    const newUploader = new FileUploader(config);

    scope[uploader] = newUploader;
    newUploader.onBeforeUploadItem = onBeforeUploadItem;
    newUploader.onProgressItem = onProgressItem;
    newUploader.onSuccessItem = onSuccessItem;
    newUploader.onErrorItem = onErrorItem;
    newUploader.onCompleteItem = onCompleteItem;
    newUploader.onCancelItem = onCompleteItem;
    newUploader.onWhenAddingFileFailed = onCompleteItem;

    if ($(element).parents('.ma-button').length) {
      element = $(element).parents('.ma-button');
      element.css({
        position: 'relative',
      });
      appendElement();
    } else if (element.attr('ma-upload-image') !== undefined) {
      element.append(template);
      $(element).find('.upload-image-item.add').eq(0).append(fileInput);
    } else {
      appendElement();
    }

    function appendElement() {
      element.append(fileInput);
      $(template).insertAfter(element);
    }

    angular.each(Array.prototype.slice.call(element.contents(), 0, element.contents()
      .length), (el) => {
      if ($(el).attr('ma-upload') === undefined) {
        $compile(el)(scope);
      }
    });

    $compile(element.next().contents())(scope);

    function getConfig() {
      let config = $.extend(true, {
        url: '/upload/index',
        viewUrl: '/upload/download',
        autoUpload: true,
        multiple: false,
        filters: [],
        size: 10 * 1024 * 1024,
        accept: '',
        formData: [],
        convertData(data) {

        },
      }, $.extend(true, $.extend(true, {}, defaultConfig), scope.uploadConfig || {}));

      // 如果有oss配置
      if (config.ossConfig) {
        const ossConfig = config.ossConfig;
        // eslint-disable-next-line
        let key = '${filename}';

        key = `${$utils.uuid()}_${key}`;

        if (ossConfig.dir) {
          key = `${ossConfig.dir}/${key}`;
        }

        config.formData.push({
          key,
          policy: ossConfig.policy,
          success_action_status: 200,
          OSSAccessKeyId: ossConfig.OSSAccessKeyId,
          signature: ossConfig.signature,
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
        fn(item, options) {
          if (scope.ngModel.length >= config.limit) {
            $message.danger('最多只能上传' + config.limit + '个文件');
            return false;
          }
          return true;
        }
      });

      config.filters.push({
        name: 'sizeFilter',
        fn(item, options) {
          const itemName = item.name.toUpperCase();

          if (typeof config.size === 'number' && item.size > config.size) {
            showSizeTip(config.size);
            return false;
          }
          if (typeof config.size === 'object') {
            let hasOver = false;
            angular.each(config.size, (size, type) => {
              type = type.toUpperCase();
              if (type === '*' || itemName.includes(`.${type}`)) {
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
        fn: function(item, options) {
          if (!config.accept) {
            return true;
          }
          if (!config.accept.indexOf('image') === -1) {
            return true;
          }

          let types = '|jpg|png|jpeg|bmp|gif|svg|';
          const type = '|' + item.type.slice(item.type.lastIndexOf('/') +
            1) + '|';

          if (config.accept !== 'image/*' && config.accept !==
            allImageAccept) {
            types = config.accept;
            types = types.replace(/image\//g, '');
            types = types.split(',');
            types = `|${types.join('|')}|`;

            // 如果有其他格式就不判断了
            if (/application/g.test(config.accept)) {
              return true;
            }
          }

          types += types.toUpperCase();

          if (types.indexOf(type) === -1) {
            $message.danger('请选择图片');
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
        progress: fileItem.progress,
      });
    }

    function onProgressItem(fileItem, progress) {
      // console.log('onProgressItem---', '[', fileItem._file.name, ']');

      angular.forEach(scope.ngModel, d => {
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

      angular.forEach(scope.ngModel, d => {
        if (d.file === fileItem._file) {
          d.progress = 100;
          if (response.data) {
            d.id = response.data.file_id;
          } else {
            d.id = $utils.uuid();
          }
          // 如果是oss
          if (config.ossConfig) {
            const formData = fileItem.formData || [];
            const fileConfig = formData.filter(item => item.OSSAccessKeyId)[0];

            d.url =
              `${config.url}/${fileConfig.key.replace(/\${filename}/g, fileItem.file.name)}`;
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

      let newFiles = [];
      angular.forEach(scope.ngModel, d => {
        if (d.file !== fileItem._file) {
          newFiles.push(d);
        }
      });
      scope.ngModel = newFiles;
    }

    function onCompleteItem(fileItem, response, status, headers) {
      $(element).find('input[type="file"]').val('');
    }

    function showSizeTip(size, type) {
      const m = size / 1024 / 1024;
      const mText = (m + '').indexOf('.') !== -1 ? parseFloat(m).toFixed(2) : parseFloat(m);
      const k = size / 1024;

      if (m < 1) {
        $message.danger(`${type || ''}最大只能上传${parseInt(k, 10)}K的文件`);
      } else {
        $message.danger(`${type || ''}最大只能上传${mText}M的文件`);
      }
    }
  }
}

maUploadController.$inject = ['$scope', '$lightGallery', '$element'];

function maUploadController($scope, $lightGallery, $element) {
  $scope.viewFile = viewFile;
  $scope.delFile = delFile;
  $scope.isImg = isImg;
  $scope.isVideo = isVideo;
  $scope.getFileIcon = getFileIcon;
  $scope.clickInput = clickInput;
  $scope.getSnapshot = getSnapshot;

  function getSnapshot(file) {
    let snapshotUrl = '';

    // 转换视频封面图
    if (isVideo(file) && file.url) {
      snapshotUrl = `${file.url}?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast`;
    }
    return snapshotUrl;
  }

  function clickInput($event) {
    $($element).find('input').trigger('click', {
      e: $event,
    });
  }

  function viewFile(files, file, $index) {
    const urls = [];
    let index = false;

    if (!files.length) {
      files = [files];
    }

    angular.each(files, (d, i) => {
      if (d === file) {
        index = urls.length;
      }
      if (isImg(d)) {
        urls.push(d.url || ($scope.uploaderConfig.viewUrl + '?file_id=' +
          d.id));
      }
    });

    if (isImg(file)) {
      $lightGallery.preview(urls, {
        index,
      });
      return;
    }

    window.open(file.url);
  }

  function isVideo(file) {
    file = $.extend(true, {}, file);

    const reg = /\.(mp4)$/g;
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
    file = $.extend(true, {}, file);

    const reg = /\.(gif|png|jpg|jpeg|bmp|svg)$/g;
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
    file = $.extend(true, {}, file);

    const isExcle = /\.(xls|xlsx)$/g;
    const isTxt = /\.(txt)$/g;
    const isPdf = /\.(pdf)$/g;
    const isWord = /\.(doc|docx)$/g;
    const isPpt = /\.(ppt|pptx)$/g;

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
    let newFiles = [];
    angular.forEach($scope.ngModel, (d, k) => {
      if (k !== index) {
        newFiles.push(d);
      }
    });
    $scope.ngModel = newFiles;
  }
}
