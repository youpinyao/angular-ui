import './index.scss';

const controller = 'selectCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$q', '$timeout'];

function mainCtrl($scope, $q, $timeout) {
  $scope.selectValue = ['6660', '6661', '6662'];
  $scope.disabled = false;

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


  $scope.$watch('selectValue', d => {
    console.log(d);
  });
}

export default {
  template: require('./index.html'),
  controller,
};
