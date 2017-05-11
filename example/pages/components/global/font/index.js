import './index.scss';

const controller = 'fontCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {

}

export default {
  template: require('./index.html'),
  controller,
};
