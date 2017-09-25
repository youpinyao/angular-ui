import './index.scss';
import icons from '../../../../../src/scss/icons.js';

import $ from 'jquery';
import Clipboard from 'clipboard';

const controller = 'iconCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
  $scope.codeText = require('./code.html');
  $scope.icons = $.extend(true, [], icons);

  $scope.icons.forEach((icon, i) => {
    $scope.icons[i] = {
      text: icon,
      status: '',
    };
  });

  const clipboard = new Clipboard('.general-icon-page .icon-item', {
    text: function (trigger) {
      return $(trigger).find('> div > div').html();
    }
  });

  clipboard.on('success', function (e) {
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);

    $scope.icons.forEach(icon => {
      if (icon.text === e.text) {
        icon.status = 'Copied!';
        $timeout();
        $timeout(() => {
          icon.status = '';
        }, 600);
      }
    });
  });

  clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });

  $scope.$on('$destroy', () => {
    clipboard.destroy();
  });
}

export default {
  template: require('./index.html'),
  controller,
};
