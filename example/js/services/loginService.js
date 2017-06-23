const name = 'loginService';

angular.module(name, []).service('loginService', loginService);

loginService.$inject = ['$rootScope', '$q', '$timeout'];

function loginService($rootScope, $q, $timeout) {
  $rootScope.logout = logout;
  window.logout = logout;

  return {
    logout
  };
}

function logout() {
  console.log('登出！');
}

export default name;
