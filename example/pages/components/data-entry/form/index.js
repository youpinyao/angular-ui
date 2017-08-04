import './index.scss';

const controller = 'formCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$injector', '$timeout'];

function mainCtrl($scope, $injector, $timeout) {
  const $validationProvider = $injector.get('$validation');

  $scope.formLayout = 'horizontal';
  $scope.radioValue = 1;
  $scope.checkboxValue = [1, 2];
  $scope.save = submit;
  $scope.reset = reset;
  $scope.submit = submit;

  function reset() {
    console.log($validationProvider.reset($scope.Form));
  }

  function submit() {
    $validationProvider.validate($scope.Form)
      .success(() => {
        console.log('do submit success');
      })
      .error(() => {
        console.log('do submit error');
      });
  }

  $scope.getData = function($searchKey) {
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
    return items;
  };

  $scope.data = $scope.getData('666');

  $scope.treeData = [{
    text: '6666',
    value: '6666',
    sub: [{
      text: '7777',
      value: '7777',
    }, {
      text: '8888',
      value: '8888',
    }, {
      text: '9999',
      value: '9999',
    }]
  }, {
    text: '66661',
    value: '66661',
    sub: [{
      text: '77771',
      value: '77771',
    }, {
      text: '88881',
      value: '88881',
    }, {
      text: '99991',
      value: '99991',
    }]
  }];

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
