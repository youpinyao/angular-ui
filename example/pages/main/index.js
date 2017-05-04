const controller = 'mainCtrl';
angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = [];

function mainCtrl() {

}

module.exports = {
  template: require('./index.html'),
  controller,
};
