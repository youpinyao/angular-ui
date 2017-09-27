import './index.scss';

const controller = 'uploadCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval'];

function mainCtrl($scope, $timeout, $interval) {
  $scope.uploadValue = [{
    id: 1,
    name: '666.jpg',
    url: 'http://inews.gtimg.com/newsapp_match/0/1467611934/0',
    progress: 50,
  }, {
    id: 2,
    name: '666.jpg',
    url: 'http://img1.0515yc.cn/material/news/img/640x/2016/11/20161129104030q4Px.gif',
    progress: 100,
  }, {
    id: 3,
    name: '666.pdf',
    url: 'http://inews.gtimg.com/newsapp_match/0/1467611934/0',
    progress: 100,
  }];

  $scope.uploadConfig = {
    accept: 'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg,application/pdf',
    size: {
      gif: 0.5 * 1024 * 1000,
      png: 0.5 * 1024 * 1000,
      pdf: 5 * 1024 * 1000
    },
  };

  $scope.codeText = require('./code.html');
}

export default {
  template: require('./index.html'),
  controller,
};
