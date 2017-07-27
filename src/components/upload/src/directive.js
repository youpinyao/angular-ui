import moduleName from './name.js';
import $ from 'jquery';
import maUploadTpl from './maUploadTpl.html';
import maUploadImageTpl from './maUploadImageTpl.html';

angular.module(moduleName)
  .directive('maUpload', maUpload)
  .directive('maUploadImage', maUploadImage);

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
  return _maUpload($compile, FileUploader, $message, maUploadTpl, {});
}

function maUploadImage($compile, FileUploader, $message) {
  return _maUpload($compile, FileUploader, $message, maUploadImageTpl, {
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
    let newUploader = new FileUploader(config);

    const allImageAccept =
      'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg';

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

    const fileInput =
      `<input
      type="file"
      nv-file-select=""
      ${multiple}
      ${accept}
      uploader='${uploader}'/>`;

    if ($(element).parents('.ma-button').length) {
      element = $(element).parents('.ma-button');
      element.css({
        position: 'relative',
      });
      appendElement();
    } else if (element.attr('ma-upload-image') !== undefined) {
      element.append(template);
      $(element).find('.upload-image-item.add').append(fileInput);
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
        size: 10 * 1024 * 1000,
        accept: '',
        convertData(data) {

        },
      }, $.extend(true, $.extend(true, {}, defaultConfig), scope.uploadConfig || {}));

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
          if (item.size > config.size) {
            $message.danger('最多只能上传' + (config.size / 1000 / 1024) + 'M的文件');
            return false;
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

          let types = '|jpg|png|jpeg|bmp|gif|svg';
          const type = '|' + item.type.slice(item.type.lastIndexOf('/') +
            1) + '|';

          if (config.accept !== 'image/*' && config.accept !==
            allImageAccept) {
            types = '|' + config.accept.split('image/')[1] + '|';

            // 如果有其他格式就不判断了
            if (/application/g.test(config.accept)) {
              return true;
            }
          }

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
  }
}

maUploadController.$inject = ['$scope', '$lightGallery'];

function maUploadController($scope, $lightGallery) {
  $scope.viewFile = viewFile;
  $scope.delFile = delFile;
  $scope.isImg = isImg;
  $scope.getFileIcon = getFileIcon;

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
