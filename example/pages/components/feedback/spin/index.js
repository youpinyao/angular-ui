import './index.scss';

const controller = 'spinCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$message'];

function mainCtrl($scope, $timeout, $interval, $message) {

}

export default {
  template: require('./index.html'),
  controller,
};
