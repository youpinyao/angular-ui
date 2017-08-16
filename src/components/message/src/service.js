import moduleName from './name.js';
import $ from 'jquery';
import maMessageTpl from './maMessageTpl.html';

angular.module(moduleName)
  .factory('$message', messageFactory);

messageFactory.$inject = ['$rootScope', '$q', '$http', '$timeout', '$compile'];

function messageFactory($rootScope, $q, $http, $timeout, $compile) {
  $rootScope.weakTipList = [];

  let messageBox = $('.weak-tip');

  if (!messageBox.length) {
    messageBox = $(maMessageTpl);
    $('body').append(messageBox);
    $compile(messageBox)($rootScope);
    $rootScope.$hideMessage = hideMessage;
  }

  function hideMessage(index) {
    const msg = $rootScope.weakTipList[index];

    msg.hide = true;
    $timeout();
    setTimeout(function(msg) {
      msg.remove = true;
      $timeout();
    }, 800, msg);
  }

  return {
    danger(text) {
      this.show('danger', text);
    },
    success(text) {
      this.show('success', text);
    },
    warning(text) {
      this.show('warning', text);
    },
    show(type, text) {
      this.clearList();
      if (this.hasSame(type, text)) {
        return;
      }

      var msg = {
        type: type,
        text: text || '空'
      };
      $rootScope.weakTipList.push(msg);

      setTimeout(function(msg) {
        msg.hide = false;
        $timeout();
      }, 50, msg);

      setTimeout(function(msg) {
        msg.hide = true;
        $timeout();
        setTimeout(function(msg) {
          msg.remove = true;
          $timeout();
        }, 800, msg);
      }, 2000, msg);
    },
    clearList() {
      let list = [];
      angular.forEach($rootScope.weakTipList, d => {
        if (d.remove !== true) {
          list.push(d);
        }
      });
      $rootScope.weakTipList = list;
    },
    hasSame(type, text) {
      let has = false;
      angular.forEach($rootScope.weakTipList, d => {
        if (d.text === text && d.type === type) {
          has = true;
        }
      });

      return has;
    }
  };
}
