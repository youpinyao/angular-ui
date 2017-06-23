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
    url: 'http://inews.gtimg.com/newsapp_match/0/1467611934/0',
    progress: 100,
  }];
}

export default {
  template: require('./index.html'),
  controller,
};
