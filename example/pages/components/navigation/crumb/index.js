import './index.scss';

const controller = 'crumbCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
  $scope.codeText = require('./code.html');

  $scope.autoCrumb = '<ma-crumb-auto></ma-crumb-auto>';
}

export default {
  template: require('./index.html'),
  controller,
};
