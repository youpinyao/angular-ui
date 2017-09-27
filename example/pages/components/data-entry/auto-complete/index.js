import './index.scss';

const controller = 'autoCompleteCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout'];

function mainCtrl($scope, $q, $timeout) {
  $scope.autoCompleteValue = '';

  $scope.codeText = require('./code.html');

  $scope.getData = function ($searchKey, isPromise) {
    if (angular.isNull($searchKey)) {
      return [];
    }
    const count = 6;
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        text: $searchKey + i,
        value: $searchKey + i,
      });
    }

    const deferred = $q.defer();

    $timeout(() => {
      deferred.resolve(items);
    });

    if (isPromise) {
      return deferred.promise;
    }
    return items;
  };

  $scope.data = $scope.getData('666', false);
}

export default {
  template: require('./index.html'),
  controller,
};
